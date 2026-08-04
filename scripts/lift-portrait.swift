import CoreImage
import Foundation
import Vision

// Subject lifting + face-anchored normalisation.
//
// Two Vision passes per image: VNGenerateForegroundInstanceMaskRequest for the
// cut-out (the same foreground mask Preview's "Copy Subject" uses), and
// VNDetectFaceRectanglesRequest to find the face so every portrait can be
// scaled and positioned to put its face at the same size and height on a
// fixed canvas. That is what makes four photographs shot in four different
// settings sit consistently in a row of identical cards.

let CANVAS_W: CGFloat = 620
let CANVAS_H: CGFloat = 863 // 620 / 0.718, the ProfileCard aspect ratio
let FACE_W_FRACTION: CGFloat = 0.25 // face width as a fraction of canvas width
let FACE_Y_FRACTION: CGFloat = 0.47 // face centre, as a fraction down from top
let FADE_FRACTION: CGFloat = 0.13 // bottom of the SOURCE frame faded to clear

let args = CommandLine.arguments
guard args.count == 3 else {
	FileHandle.standardError.write("usage: lift <input> <output.png>\n".data(using: .utf8)!)
	exit(64)
}

let inURL = URL(fileURLWithPath: args[1])
let outURL = URL(fileURLWithPath: args[2])

do {
	guard let ciImage = CIImage(contentsOf: inURL) else {
		print("ERROR: cannot read \(inURL.path)")
		exit(1)
	}

	let imageW = ciImage.extent.width
	let imageH = ciImage.extent.height

	let handler = VNImageRequestHandler(ciImage: ciImage, options: [:])

	let maskRequest = VNGenerateForegroundInstanceMaskRequest()
	let faceRequest = VNDetectFaceRectanglesRequest()
	try handler.perform([maskRequest, faceRequest])

	guard let maskResult = maskRequest.results?.first else {
		print("ERROR: no foreground subject in \(inURL.lastPathComponent)")
		exit(2)
	}
	guard let face = faceRequest.results?.max(by: {
		$0.boundingBox.width < $1.boundingBox.width
	}) else {
		print("ERROR: no face detected in \(inURL.lastPathComponent)")
		exit(2)
	}

	let buffer = try maskResult.generateMaskedImage(
		ofInstances: maskResult.allInstances,
		from: handler,
		croppedToInstancesExtent: false
	)
	let rawCutout = CIImage(cvPixelBuffer: buffer)

	// Every one of these photographs is a tight head-and-shoulders crop, so the
	// torso is cut off by the edge of the original frame — lift the subject out
	// and that crop line becomes a hard horizontal slice floating on the card.
	// Fading the alpha over the bottom of the SOURCE frame targets exactly that
	// line, per photograph, which a fixed fade in CSS could not do: each
	// subject ends at a different height once they are scaled to a common face
	// size.
	let fadeTop = rawCutout.extent.minY + rawCutout.extent.height * FADE_FRACTION
	guard let gradient = CIFilter(name: "CILinearGradient", parameters: [
		"inputPoint0": CIVector(x: 0, y: rawCutout.extent.minY),
		"inputPoint1": CIVector(x: 0, y: fadeTop),
		"inputColor0": CIColor(red: 0, green: 0, blue: 0, alpha: 0),
		"inputColor1": CIColor(red: 1, green: 1, blue: 1, alpha: 1),
	])?.outputImage?.cropped(to: rawCutout.extent) else {
		print("ERROR: could not build fade gradient")
		exit(3)
	}
	guard let faded = CIFilter(name: "CIBlendWithAlphaMask", parameters: [
		kCIInputImageKey: rawCutout,
		kCIInputBackgroundImageKey: CIImage(color: CIColor(
			red: 0, green: 0, blue: 0, alpha: 0
		)).cropped(to: rawCutout.extent),
		kCIInputMaskImageKey: gradient,
	])?.outputImage else {
		print("ERROR: could not apply fade")
		exit(3)
	}
	let cutout = faded

	// Vision's normalised boundingBox and CIImage both use a bottom-left
	// origin, so this needs no vertical flip.
	let faceW = face.boundingBox.width * imageW
	let faceCX = (face.boundingBox.midX) * imageW
	let faceCY = (face.boundingBox.midY) * imageH

	let scale = (FACE_W_FRACTION * CANVAS_W) / faceW
	let targetCX = CANVAS_W / 2
	let targetCY = CANVAS_H - (FACE_Y_FRACTION * CANVAS_H)

	let transform = CGAffineTransform(scaleX: scale, y: scale)
		.concatenating(CGAffineTransform(
			translationX: targetCX - faceCX * scale,
			y: targetCY - faceCY * scale
		))

	let canvasRect = CGRect(x: 0, y: 0, width: CANVAS_W, height: CANVAS_H)
	// A clear *colour* image, not CIImage.empty() — empty has a null extent, so
	// compositing over it collapses the result to the subject's own bounds and
	// throws away the canvas placement this whole script exists to compute.
	let canvas = CIImage(color: CIColor(red: 0, green: 0, blue: 0, alpha: 0))
		.cropped(to: canvasRect)
	let placed = cutout.transformed(by: transform)
	let composite = placed.composited(over: canvas).cropped(to: canvasRect)

	let ctx = CIContext()
	try ctx.writePNGRepresentation(
		of: composite,
		to: outURL,
		format: .RGBA8,
		colorSpace: CGColorSpace(name: CGColorSpace.sRGB)!
	)
	print(
		"OK: \(inURL.lastPathComponent) scale=\(String(format: "%.2f", scale)) faceW=\(Int(faceW))px"
	)
} catch {
	print("ERROR: \(error)")
	exit(3)
}

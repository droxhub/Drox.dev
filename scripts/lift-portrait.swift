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

// How far horizontal placement moves from the face towards the subject's own
// centre. 0 centres the face, 1 centres the body, 0.5 splits the difference.
//
// It has to be a blend because neither end works alone on a 3/4-turned subject,
// where the face sits well off the body's centre. Measured on the three
// portraits on file, in canvas px from centre:
//
//                     face offset      body offset
//   0 (face)          0 / 0 / 0        +81 / −40 / +26   ← Rahib's shoulder
//                                                          clipped flat at x=0
//   1 (body)          −81 / +40 / −26  0 / 0 / 0         ← 121px face spread
//   0.5              −41 / +20 / −13   +41 / −20 / +13   ← both bounded
//
// So each end fixes one alignment by breaking the other, and the worst case at
// 0.5 is roughly half of either. Nothing clips at 0.5.
let SUBJECT_WEIGHT: CGFloat = 0.5

/// Horizontal centre of everything still opaque after the fade, in the image's
/// own coordinate space. Vision gives a bounding box for the *face* but not for
/// the lifted subject, so the alpha channel is measured directly.
///
/// Sampled at 256px wide rather than full resolution: this is only used to
/// place the subject, where a 2-3px error is invisible, and it keeps a 1024x1536
/// portrait from being rendered to a 6 MB buffer to answer one question.
func alphaCentreX(_ image: CIImage, ctx: CIContext) -> CGFloat? {
	let extent = image.extent
	guard extent.width > 0, extent.height > 0, extent.width.isFinite else { return nil }

	let sampleW = 256
	let scale = CGFloat(sampleW) / extent.width
	let sampleH = max(1, Int((extent.height * scale).rounded()))
	let small = image.transformed(by: CGAffineTransform(scaleX: scale, y: scale))

	var bytes = [UInt8](repeating: 0, count: sampleW * sampleH * 4)
	bytes.withUnsafeMutableBytes { raw in
		ctx.render(
			small,
			toBitmap: raw.baseAddress!,
			rowBytes: sampleW * 4,
			bounds: CGRect(
				x: small.extent.minX, y: small.extent.minY,
				width: CGFloat(sampleW), height: CGFloat(sampleH)
			),
			format: .RGBA8,
			colorSpace: CGColorSpace(name: CGColorSpace.sRGB)!
		)
	}

	// 24/255. The subject lift leaves a faint halo of near-transparent pixels
	// around hair; counting those would widen the box by whatever the halo
	// happens to reach on that photograph.
	var minX = sampleW
	var maxX = -1
	for y in 0..<sampleH {
		for x in 0..<sampleW where bytes[(y * sampleW + x) * 4 + 3] > 24 {
			if x < minX { minX = x }
			if x > maxX { maxX = x }
		}
	}
	guard maxX >= 0 else { return nil }

	let lo = extent.minX + CGFloat(minX) / scale
	let hi = extent.minX + CGFloat(maxX + 1) / scale
	return (lo + hi) / 2
}

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

	let ctx = CIContext()

	// Vision's normalised boundingBox and CIImage both use a bottom-left
	// origin, so this needs no vertical flip.
	let faceW = face.boundingBox.width * imageW
	let faceCX = (face.boundingBox.midX) * imageW
	let faceCY = (face.boundingBox.midY) * imageH

	let scale = (FACE_W_FRACTION * CANVAS_W) / faceW
	let targetCX = CANVAS_W / 2
	let targetCY = CANVAS_H - (FACE_Y_FRACTION * CANVAS_H)

	// Scale and vertical placement are anchored on the face — that is what makes
	// four photographs sit consistently in a row of identical cards.
	//
	// Horizontal placement is a blend of the face and the subject's own centre,
	// because a person standing square is symmetric about their own face but a
	// person at 3/4 is not — see SUBJECT_WEIGHT above for the measurements.
	// Falls back to the face if the alpha scan finds nothing, which would mean
	// the lift produced an empty image.
	let subjectCX = alphaCentreX(cutout, ctx: ctx) ?? faceCX
	let anchorCX = faceCX + (subjectCX - faceCX) * SUBJECT_WEIGHT

	let transform = CGAffineTransform(scaleX: scale, y: scale)
		.concatenating(CGAffineTransform(
			translationX: targetCX - anchorCX * scale,
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

	try ctx.writePNGRepresentation(
		of: composite,
		to: outURL,
		format: .RGBA8,
		colorSpace: CGColorSpace(name: CGColorSpace.sRGB)!
	)
	// `shift` is how far the subject's centre sits from the face, in canvas px —
	// how much of a 3/4 turn this pose has. It is the number to look at if a
	// portrait lands off-centre; SUBJECT_WEIGHT decides how much of it is
	// applied.
	print(
		"OK: \(inURL.lastPathComponent) scale=\(String(format: "%.2f", scale))"
			+ " faceW=\(Int(faceW))px shift=\(Int(((subjectCX - faceCX) * scale).rounded()))px"
	)
} catch {
	print("ERROR: \(error)")
	exit(3)
}

"use client";
import { Avatar, AvatarGroup } from "@heroui/react";

export default function TrustedBy() {
	const ziyadImage = "/founders/ziyad.png";
	const ajnas = "/founders/ajnas.jpg";
	const rahib = "/founders/rahib.jpg";

	return (
		<AvatarGroup isBordered className="mt-4" max={3} total={10}>
			<Avatar src={ziyadImage} />
			<Avatar src={ajnas} />
			<Avatar src={rahib} />
		</AvatarGroup>
	);
}

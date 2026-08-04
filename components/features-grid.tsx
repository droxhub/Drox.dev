"use-client";

import { Card, CardBody, CardHeader, LinkProps } from "@heroui/react";
import { LinkIcon } from "@heroui/shared-icons";
import React, { ReactNode } from "react";
import { tv } from "tailwind-variants";

const styles = tv({
	slots: {
		base: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
		card: "border-transparent bg-white/5 dark:bg-default-400/10 backdrop-blur-lg backdrop-saturate-[1.8]",
		header: "gap-2 pb-0",
		body: "",
		iconWrapper:
			"flex justify-center p-2 rounded-full items-center bg-secondary-100/80 text-pink-500",
		title: "text-base font-semibold",
		description: "font-normal text-base text-default-500",
	},
});

export type FeaturesGridSlots = keyof ReturnType<typeof styles>;

/**
 * The class value the slot functions above actually accept.
 *
 * This prop used to be typed with HeroUI's `SlotsToClasses`, and every single
 * use then needed `as any` — because HeroUI bundles its own copy of
 * tailwind-merge while `tv()` here resolves the one under tailwind-variants.
 * The two `ClassNameValue` types differ only in whether they admit `bigint`, so
 * they're identical at runtime and incompatible to TypeScript. Deriving the
 * type from the local `tv` instance removes the mismatch at its source.
 */
type SlotClass = NonNullable<
	Parameters<ReturnType<typeof styles>["base"]>[0]
>["class"];

export interface Feature extends LinkProps {
	title: string;
	icon: ReactNode;
	description?: string | ReactNode;
}

interface FeaturesGridProps {
	features: Feature[];
	classNames?: Partial<Record<FeaturesGridSlots, SlotClass>>;
}

export const FeaturesGrid: React.FC<FeaturesGridProps> = ({
	features,
	classNames,
	...props
}) => {
	const slots = styles();

	return (
		<div className={slots.base({ class: classNames?.base })} {...props}>
			{features.map((feat: Feature, index: number) => (
				<Card
					key={`${feat.title}_${index}`}
					isBlurred
					className={slots.card({ class: classNames?.card })}
					isPressable={!!feat.href}
				>
					<CardHeader className={slots.header({ class: classNames?.header })}>
						<div
							className={slots.iconWrapper({
								class: classNames?.iconWrapper,
							})}
						>
							{feat.icon}
						</div>
						<p className={slots.title({ class: classNames?.title })}>
							{feat.title}
						</p>
						{feat.isExternal && (
							<LinkIcon className="text-white" height={18} width={18} />
						)}
					</CardHeader>
					{feat.description ? (
						<CardBody className={slots.body({ class: classNames?.body })}>
							<p
								className={slots.description({
									class: classNames?.description,
								})}
							>
								{feat.description}
							</p>
						</CardBody>
					) : null}
				</Card>
			))}
		</div>
	);
};

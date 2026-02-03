import { tv } from "tailwind-variants";

export const titleWrapper = tv({
	base: "flex flex-col gap-2 items-start justify-center w-full",
});

export const title = tv({
	base: "tracking-tight inline font-medium leading-[1.1] pb-1 reflect-title",
	variants: {
		color: {
			violet: "from-[#FF1CF7] to-[#b249f8]",
			yellow: "from-[#FF705B] to-[#FFB457]",
			blue: "from-[#5EA2EF] to-[#0072F5]",
			cyan: "from-[#00b7fa] to-[#01cfea]",
			green: "from-[#6FEE8D] to-[#17c964]",
			pink: "from-[#FF72E1] to-[#F54C7A]",
			foreground: "dark:from-[#FFFFFF] dark:to-[#4B4B4B]",
		},
		size: {
			sm: "text-[28px] md:text-[36px] lg:text-[40px] leading-[1.1]",
			md: "text-[30px] md:text-[40px] lg:text-[44px] leading-[1.1]",
			lg: "text-[33px] md:text-[45px] lg:text-[48px] leading-[1.1]",
			xl: "text-[36px] md:text-[48px] lg:text-[56px] leading-[1.1]",
		},
		fullWidth: {
			true: "w-full block",
		},
	},
	defaultVariants: {
		size: "md",
	},
	compoundVariants: [
		{
			color: [
				"violet",
				"yellow",
				"blue",
				"cyan",
				"green",
				"pink",
				"foreground",
			],
			class: "bg-clip-text text-transparent bg-gradient-to-b",
		},
	],
});

export const subtitle = tv({
	base: "w-full my-2 text-[18px] font-normal text-[var(--reflect-sub)] block max-w-full leading-[1.5]",
	variants: {
		fullWidth: {
			true: "!w-full",
		},
	},
});

export const sectionWrapper = tv({
	base: "relative z-10 flex flex-col gap-2 w-full",
	variants: {
		isBlurred: {
			true: [
				"bg-transparent",
				"dark:bg-transparent",
				"before:bg-background/10",
				"before:content-['']",
				"before:block",
				"before:z-[-1]",
				"before:absolute",
				"before:inset-0",
				"before:backdrop-blur-md",
				"before:backdrop-saturate-200",
			],
		},
	},
});

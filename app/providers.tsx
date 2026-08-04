"use client";

import { HeroUIProvider } from "@heroui/react";
import { MotionConfig } from "motion/react";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import * as React from "react";

export interface ProvidersProps {
	children: React.ReactNode;
	themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
	const router = useRouter();

	return (
		<HeroUIProvider navigate={router.push}>
			{/*
			 * WCAG 2.2 SC 2.3.3. `reducedMotion="user"` makes every `motion`
			 * component on the site honour the OS setting without each one having to
			 * ask: transform and layout animations are dropped, opacity and colour
			 * still cross-fade. That is the right split — a fade carries no motion,
			 * and killing it outright would leave elements that animate in from
			 * `opacity: 0` invisible.
			 *
			 * Twenty-four files import `motion/react` and only eight honoured it by
			 * hand. Doing this centrally is both the complete fix and the one that
			 * cannot rot: a new component gets it by existing, not by remembering.
			 *
			 * It does NOT cover animation outside `motion` — CSS keyframes, raw rAF
			 * loops, video. Those are handled in styles/globals.css, and in the
			 * components that own them (SmoothScroll, prototype-img, specular-edge,
			 * ambient-video, LogoLoop).
			 */}
			<MotionConfig reducedMotion="user">
				<NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
			</MotionConfig>
		</HeroUIProvider>
	);
}

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Builds a `calc(50% ± Npx)` offset with the sign in the operator.
 *
 * The browser rewrites `calc(50% + -361px)` as `calc(50% - 361px)` when it
 * parses an inline style. On a server-rendered element that rewrite makes the
 * value React holds differ from the one it reads back, and hydration fails on
 * every element using it — so the sign has to be emitted the way the browser
 * will store it. Pair with whole-pixel values: the CSS parser also rounds long
 * floats when it re-serialises them.
 */
export function fromCentre(px: number) {
	return px < 0 ? `calc(50% - ${Math.abs(px)}px)` : `calc(50% + ${px}px)`;
}

/**
 * Fired on `window` when the mobile menu opens or closes, with
 * `detail: { open: boolean }`.
 *
 * The navbar's menu and the sticky mobile CTA are both `position: fixed` at
 * `bottom: 0` and are siblings in the layout, not parent and child — so the one
 * that needs to yield can't be told to by props without threading state through
 * the layout. An event keeps each component owning its own visibility.
 */
export const MOBILE_MENU_EVENT = "drox:mobile-menu";

export type MobileMenuEvent = CustomEvent<{ open: boolean }>;

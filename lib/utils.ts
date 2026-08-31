import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
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

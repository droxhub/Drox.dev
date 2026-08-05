import { type ComponentPropsWithoutRef, useId, useMemo } from "react";
import { seededRandom } from "@/lib/seeded-random";

interface FeatureCardProps {
	title: string;
	description: string;
}

export default function FeatureCard({ title, description }: FeatureCardProps) {
	return (
		<div className="relative bg-gradient-to-b from-surface-muted to-surface p-6 rounded-card overflow-hidden border border-hairline/50 transition-transform duration-base hover:scale-[0.98] group">
			<Grid size={20} />
			<p className="text-base font-bold text-white relative z-20 transition-transform duration-base group-hover:scale-105 origin-center inline-block">
				{title}
			</p>
			<p className="text-gray-400 mt-4 text-base font-normal relative z-20 transition-transform duration-base group-hover:scale-105 origin-center inline-block">
				{description}
			</p>
		</div>
	);
}

export const Grid = ({
	pattern,
	size,
}: {
	pattern?: number[][];
	size?: number;
}) => {
	// Seeded, so server and client produce the same squares. This used to render
	// a fixed fallback pattern and then swap it for a random one in an effect,
	// which meant every card re-rendered once after hydration for a purely
	// decorative background. See lib/seeded-random.ts.
	const p = useMemo(() => {
		if (pattern) return pattern;

		const random = seededRandom(0x6c17_d5a1);
		const seen = new Set<string>();
		const patterns: number[][] = [];

		while (patterns.length < 5) {
			const x = Math.floor(random() * 4) + 7;
			const y = Math.floor(random() * 6) + 1;
			const key = `${x}-${y}`;

			if (!seen.has(key)) {
				seen.add(key);
				patterns.push([x, y]);
			}
		}

		return patterns;
	}, [pattern]);

	return (
		<div className="pointer-events-none absolute left-1/2 top-0 -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
			<div className="absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] from-purple-900/20 to-violet-900/20 opacity-100">
				<GridPattern
					className="absolute inset-0 h-full w-full mix-blend-overlay fill-purple-500/10 stroke-purple-500/10"
					height={size ?? 20}
					squares={p}
					width={size ?? 20}
					x="-12"
					y="4"
				/>
			</div>
		</div>
	);
};

interface GridPatternProps extends ComponentPropsWithoutRef<"svg"> {
	width: number;
	height: number;
	x: string | number;
	y: string | number;
	/** `[column, row]` pairs, in pattern-tile units. */
	squares?: number[][];
}

export function GridPattern({
	width,
	height,
	x,
	y,
	squares,
	...props
}: GridPatternProps) {
	const patternId = useId();

	return (
		<svg aria-hidden="true" {...props}>
			<defs>
				<pattern
					height={height}
					id={patternId}
					patternUnits="userSpaceOnUse"
					width={width}
					x={x}
					y={y}
				>
					<path d={`M.5 ${height}V.5H${width}`} fill="none" />
				</pattern>
			</defs>
			<rect
				fill={`url(#${patternId})`}
				height="100%"
				strokeWidth={0}
				width="100%"
			/>
			{squares && (
				<svg className="overflow-visible" x={x} y={y}>
					{squares.map(([column, row]) => (
						<rect
							key={`${column}-${row}`}
							height={height + 1}
							strokeWidth="0"
							width={width + 1}
							x={column * width}
							y={row * height}
						/>
					))}
				</svg>
			)}
		</svg>
	);
}

import React, { useId } from "react";

interface FeatureCardProps {
	title: string;
	description: string;
}

export default function FeatureCard({ title, description }: FeatureCardProps) {
	return (
		<div className="relative bg-gradient-to-b from-[#0E0C1E] to-[#08061D] p-6 rounded-3xl overflow-hidden border border-[#1C1A31]/50 transition-transform duration-300 hover:scale-[0.98] group">
			<Grid size={20} />
			<p className="text-base font-bold text-white relative z-20 transition-transform duration-300 group-hover:scale-105 origin-center inline-block">
				{title}
			</p>
			<p className="text-gray-400 mt-4 text-base font-normal relative z-20 transition-transform duration-300 group-hover:scale-105 origin-center inline-block">
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
	const [p, setP] = React.useState<number[][]>(
		pattern ?? [
			[7, 1],
			[8, 2],
			[9, 3],
			[10, 4],
			[7, 5],
		],
	);

	React.useEffect(() => {
		if (!pattern) {
			// Generate unique random patterns on client side only
			const uniquePatterns = new Set<string>();
			const patterns: number[][] = [];

			while (patterns.length < 5) {
				const x = Math.floor(Math.random() * 4) + 7;
				const y = Math.floor(Math.random() * 6) + 1;
				const key = `${x}-${y}`;

				if (!uniquePatterns.has(key)) {
					uniquePatterns.add(key);
					patterns.push([x, y]);
				}
			}
			setP(patterns);
		}
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

export function GridPattern({ width, height, x, y, squares, ...props }: any) {
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
					{squares.map(([x, y]: any) => (
						<rect
							key={`${x}-${y}`}
							height={height + 1}
							strokeWidth="0"
							width={width + 1}
							x={x * width}
							y={y * height}
						/>
					))}
				</svg>
			)}
		</svg>
	);
}

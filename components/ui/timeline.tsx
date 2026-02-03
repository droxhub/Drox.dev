interface TimelineItem {
	year: string;
	title: string;
	description: string;
}

interface TimelineProps {
	items: TimelineItem[];
}

export default function Timeline({ items }: TimelineProps) {
	return (
		<div className="space-y-6 md:space-y-8 max-w-2xl mx-auto">
			{items.map((item, index) => (
				<div key={index} className="flex gap-4 md:gap-6 items-start">
					<div className="flex flex-col items-center flex-shrink-0">
						<div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-gradient-to-br from-violet-500 to-purple-600" />
						{index < items.length - 1 && (
							<div className="w-0.5 h-full bg-gradient-to-b from-violet-500/50 to-transparent mt-1" />
						)}
					</div>
					<div className="flex-1 pb-6 md:pb-8">
						<div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-3">
							<span className="text-violet-500 font-semibold text-base md:text-lg">
								{item.year}
							</span>
							<h3 className="text-xl md:text-2xl font-bold">{item.title}</h3>
						</div>
						<p className="text-sm md:text-base text-default-600 mt-2">
							{item.description}
						</p>
					</div>
				</div>
			))}
		</div>
	);
}

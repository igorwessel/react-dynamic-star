import React, { useMemo } from "react";
import { useId } from "@/hooks/useId";
import type { IDynamicStarProps, IStar } from "@/types";
import { calcStarPoints, emptyStar, fillStars } from "@/utils";

function DynamicStar({
	rating,
	outlined,
	outlineWidth,
	sharpnessStar = 2.5,
	totalStars = 5,
	width = 100,
	height = 100,
	emptyStarColor = "transparent",
	fullStarColor = "#FFBC00",
}: IDynamicStarProps) {
	const id = useId("star");
	const stars = React.useMemo(
		() =>
			fillStars(
				typeof rating === "string" ? Number.parseFloat(rating) : rating,
				Array(Math.max(totalStars, 0)).fill(0),
			),
		[totalStars, rating],
	);

	const getFullFillColor = (starData: IStar) =>
		starData.raw !== emptyStar ? fullStarColor : emptyStarColor;

	const starPoints = useMemo(() => {
		const centerX = width / 2;
		const centerY = width / 2;
		const innerCircleArms = 5;
		const innerRadius = width / innerCircleArms;
		const innerOuterRadiusRatio = sharpnessStar;
		const outerRadius = innerRadius * innerOuterRadiusRatio;
		return calcStarPoints(
			centerX,
			centerY,
			innerCircleArms,
			innerRadius,
			outerRadius,
		);
	}, [width, sharpnessStar]);

	return (
		<div
			className="dynamic-star-rating"
			style={{
				display: "flex",
				alignItems: "center",
			}}
			aria-label={`${rating} of ${totalStars}`}
		>
			{stars.map((star) => (
				<div
					key={star.id}
					style={{
						display: "flex",
						gap: "5px",
					}}
					className="dynamic-star-container"
				>
					<svg
						className="dynamic-star-svg"
						style={{
							fill: `url(#${id}_gradient${star.raw})`,
							stroke:
								typeof outlined === "string"
									? outlined
									: outlined
										? fullStarColor
										: "none",
							strokeWidth: outlineWidth ?? "unset",
							width,
							height,
						}}
						aria-hidden="true"
					>
						<polygon points={starPoints} fillRule="nonzero" />
						<defs>
							{/* id has to be unique to each star fullness(dynamic offset) - it indicates fullness above */}
							<linearGradient id={`${id}_gradient${star.raw}`}>
								<stop
									id="stop1"
									offset={star.percent}
									stopOpacity="1"
									stopColor={getFullFillColor(star)}
								/>
								<stop
									id="stop2"
									offset={star.percent}
									stopOpacity="0"
									stopColor={getFullFillColor(star)}
								/>
								<stop
									id="stop3"
									offset={star.percent}
									stopOpacity="1"
									stopColor={emptyStarColor}
								/>
								<stop
									id="stop4"
									offset="100%"
									stopOpacity="1"
									stopColor={emptyStarColor}
								/>
							</linearGradient>
						</defs>
					</svg>
				</div>
			))}
		</div>
	);
}

const MemoizedComponent = React.memo(DynamicStar) as typeof DynamicStar;

export { MemoizedComponent as DynamicStar };

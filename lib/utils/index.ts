import type { IStar } from "../types";

const fullStar = 1;
const emptyStar = 0;

const createEmptyStar = (): IStar => ({ raw: emptyStar, percent: "0%" });

const createFullStar = (): IStar => ({ raw: fullStar, percent: "100%" });

const createStarWithPercentageFilled = (
	roundedOneDecimalPoint: number,
): IStar => ({
	raw: roundedOneDecimalPoint,
	percent: `${roundedOneDecimalPoint * 100}%`,
});

function fillStars(rating: number, stars: Array<unknown>) {
	const fullStarsCounter = Math.floor(rating);

	const surplus = Math.round((rating % 1) * 10) / 10;
	const roundedOneDecimalPoint = Math.round(surplus * 10) / 10;

	return stars.map((_, index) => {
		const starCounter = index + 1;
		const star =
			fullStarsCounter >= starCounter
				? createFullStar()
				: rating === index + roundedOneDecimalPoint
					? createStarWithPercentageFilled(roundedOneDecimalPoint)
					: createEmptyStar();

		return {
			...star,
			id: `star_${starCounter}`,
		};
	});
}

const calcStarPoints = (
	centerX: number,
	centerY: number,
	innerCircleArms: number,
	innerRadius: number,
	outerRadius: number,
) => {
	const angle = Math.PI / innerCircleArms;
	const angleOffsetToCenterStar = 60;
	const totalArms = innerCircleArms * 2;
	let points = "";
	for (let i = 0; i < totalArms; i++) {
		const isEvenIndex = i % 2 === 0;
		const r = isEvenIndex ? outerRadius : innerRadius;
		const currX = centerX + Math.cos(i * angle + angleOffsetToCenterStar) * r;
		const currY = centerY + Math.sin(i * angle + angleOffsetToCenterStar) * r;
		points += `${currX},${currY} `;
	}
	return points;
};

export {
	createEmptyStar,
	createFullStar,
	createStarWithPercentageFilled,
	fullStar,
	emptyStar,
	fillStars,
	calcStarPoints,
};

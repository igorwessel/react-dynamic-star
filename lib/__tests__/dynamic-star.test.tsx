import { DynamicStar } from "../main";
import { render } from "@testing-library/react";

describe("Without pass props optional props", () => {
	test("should render five star", () => {
		const { container } = render(<DynamicStar rating={5} />);

		expect(container.querySelectorAll(".dynamic-star-container")).toHaveLength(
			5,
		);
	});

	test("should render five star filled", () => {
		const { container } = render(<DynamicStar rating={5} />);

		const stars = container.querySelectorAll(".dynamic-star-svg");

		for (const star of stars) {
			expect(star).toHaveAttribute(
				"style",
				expect.stringMatching(/url\(#star_\d+_gradient1\)/),
			);
		}
	});

	test("should render 2.5 stars filled, 2 stars filled and third star half-filled", () => {
		const rating = 2.5;
		const { container } = render(<DynamicStar rating={rating} />);

		const stars = container.querySelectorAll(".dynamic-star-svg");

		expect(stars[0]).toHaveAttribute(
			"style",
			expect.stringMatching(/url\(#star_\d+_gradient1\)/),
		);
		expect(stars[1]).toHaveAttribute(
			"style",
			expect.stringMatching(/url\(#star_\d+_gradient1\)/),
		);
		expect(stars[2]).toHaveAttribute(
			"style",
			expect.stringMatching(/url\(#star_\d+_gradient0.5\)/),
		);
		expect(stars[3]).toHaveAttribute(
			"style",
			expect.stringMatching(/url\(#star_\d+_gradient0\)/),
		);
		expect(stars[4]).toHaveAttribute(
			"style",
			expect.stringMatching(/url\(#star_\d+_gradient0\)/),
		);
	});

	test("when rerender with a new rating, should correcty update in screen stars filled", () => {
		const { container, rerender } = render(<DynamicStar rating={0} />);

		const stars = container.querySelectorAll(".dynamic-star-svg");
		for (const star of stars) {
			expect(star).toHaveAttribute(
				"style",
				expect.stringMatching(/url\(#star_\d+_gradient0\)/),
			);
		}

		rerender(<DynamicStar rating={5} />);

		for (const star of stars) {
			expect(star).toHaveAttribute(
				"style",
				expect.stringMatching(/url\(#star_\d+_gradient1\)/),
			);
		}
	});
});

describe("Passing optional props", () => {
	test("should change color for empty and filled star", () => {
		const { container } = render(
			<DynamicStar rating={1} emptyStarColor="white" fullStarColor="black" />,
		);

		const linearGradientsEmpty = container.querySelectorAll(
			"[id='star_5_gradient0'] > stop",
		);

		for (const element of linearGradientsEmpty) {
			expect(element).toHaveAttribute("stop-color", "white");
		}

		const linearGradientsFull = container.querySelectorAll(
			"[id='star_5_gradient1'] > stop",
		);

		expect(linearGradientsFull[0]).toHaveAttribute("stop-color", "black");
		expect(linearGradientsFull[1]).toHaveAttribute("stop-color", "black");
		expect(linearGradientsFull[2]).toHaveAttribute("stop-color", "white");
		expect(linearGradientsFull[3]).toHaveAttribute("stop-color", "white");
	});

	test("should change width and height", () => {
		const { container } = render(
			<DynamicStar rating={1} width={50} height={50} />,
		);

		const stars = container.querySelectorAll(".dynamic-star-svg");

		for (const star of stars) {
			expect(star).toHaveAttribute(
				"style",
				expect.stringMatching(/width: 50px; height: 50px;/),
			);
		}
	});

	test("should render more stars when pass totalStars", () => {
		const { container } = render(<DynamicStar rating={6.5} totalStars={7} />);

		expect(container.querySelectorAll(".dynamic-star-svg")).toHaveLength(7);
	});

	test("should outlined a star when pass outlined", () => {
		const { container } = render(<DynamicStar rating={5} outlined />);

		const stars = container.querySelectorAll(".dynamic-star-svg");
		for (const star of stars) {
			expect(star).toHaveAttribute(
				"style",
				expect.not.stringMatching(/stroke: none/),
			);
		}
	});

	test("should use outlined color, when pass outlined with a color (outlined='black')", () => {
		const { container } = render(<DynamicStar rating={5} outlined="black" />);

		const stars = container.querySelectorAll(".dynamic-star-svg");

		for (const star of stars) {
			expect(star).toHaveAttribute(
				"style",
				expect.stringMatching(/stroke: black/),
			);
		}
	});

	test("should change outline width, when pass outlineWidth", () => {
		const { container } = render(
			<DynamicStar rating={5} outlined="black" outlineWidth={2} />,
		);

		const stars = container.querySelectorAll(".dynamic-star-svg");

		for (const star of stars) {
			expect(star).toHaveAttribute(
				"style",
				expect.stringMatching(/stroke-width: 2/),
			);
		}
	});

	test("when rerender with new totalStars, need to render all stars (removing or adding)", () => {
		const { container, rerender } = render(
			<DynamicStar rating={6.5} totalStars={7} />,
		);

		expect(container.querySelectorAll(".dynamic-star-svg")).toHaveLength(7);

		rerender(<DynamicStar rating={3} totalStars={6} />);

		expect(container.querySelectorAll(".dynamic-star-svg")).toHaveLength(6);

		rerender(<DynamicStar rating={3} totalStars={8} />);

		expect(container.querySelectorAll(".dynamic-star-svg")).toHaveLength(8);
	});
});

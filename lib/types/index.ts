 type IDynamicStarProps = {
  rating: string | number;
  outlined?: string | boolean;
  outlineWidth?: number;
  sharpnessStar?: number;
  totalStars?: number;
  width?: number;
  height?: number;
  emptyStarColor?: string;
  fullStarColor?: string;
};

type IStar = {
  raw: number;
  percent: string;
};

export type { IStar, IDynamicStarProps }

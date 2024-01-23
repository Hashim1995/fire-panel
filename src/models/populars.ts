import { selectOptionPopular } from '@/utils/constants/options';

interface IPopularList {
  id: number;
  isExclusive: boolean;
  isPopularMeal: boolean;
  isPopularMenu: boolean;
  name: string;
  oldPrice: number | null;
  price: number;
}

interface IPopularFilter {
  isExclusive: selectOptionPopular | null | string;
  isPopularMeal: selectOptionPopular | null | string;
  isPopularMenu: selectOptionPopular | null | string;
  name: string;
}

interface IPopularUptade {
  id?: number | null;
  oldPrice: string | number;
}

export type { IPopularList, IPopularFilter, IPopularUptade };

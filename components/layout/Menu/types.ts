export type NavState = {
  mounted: boolean;
  activeIdx: number | null;
};

export type ChevronDownProps = {
  size?: number;
  className?: string;
};

export type UseNavDropdownOptions = {
  initialState?: NavState;
  closeDelay?: number;
  ease?: any;
};

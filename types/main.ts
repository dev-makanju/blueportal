export type buttonVariant = "PRIMARY" | "SECONDARY" | "WITHICONS" | "NO_FILL";

export interface inputProps {
  inputType: string;
  inputName: string;
  holderText: string;
}

export interface progressTrackerTypes {
  progress: number;
  totalStage: number;
}

export interface ButtonProps {
  variant: buttonVariant;
  renderText: string;
  onClick?: () => void;
  loading?: boolean;
  showRightIcon?: React.ReactNode;
  showLeftIcon?: React.ReactNode;
}

interface Vendor {
  name: string;
  followers: string;
  rating: number;
}

export interface ProductData {
  title: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  vendor: Vendor;
}

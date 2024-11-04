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


export interface Assignment {
  id: string;
  title: string;
  description: string;
  subject: string;
  dueDate : string;
  gradeLevel: string;
  instructions: string;
  resources: string;
  userId: string;
} 

export interface ProjectProps {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  userId: string;
}

export interface LessonPlanProps {
  id?: string;
  title: string;
  gradeLevel: string;
  objectives: string;
  materials: string;
  lessonPhases: string;
  assessment: string;
  reflection: string;
  date: string;
  userId: string;
}

export interface ActivityProps{
  id: string;
  description: string;
  date:string;
  userId: string; 
} 

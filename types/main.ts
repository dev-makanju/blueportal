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
  date: Date;
  userId: string;
}

export interface Contributor {
  id: string;
  projectId: string;
  userId: string; 
  project: SingleProjectProps; 
  user: UserTypes;
  status: string;
  createdAt: string;
}

export interface SingleProjectProps {
    id: string;
    title: string;
    original: string;
    description: string;
    dueDate: string;
    userId: string;
    content: string;
    user: UserTypes;
    tags: string;
    contributors: [];
    ratings: [];
    fileUrl: string;
}

export interface ProjectTypes {
  id?: string;
  content: string;
  original: string;
  description: string;
  dueDate: string;
  rating?: number;
  tags: string;
  contributors: [];
  ratings: [];
  title: string;
  userId: string;
  fileUrl: string;
  gradeLevel: string;
  objective?: string;
  curriculum?: string;
}

export interface AssignmentTypes {
  id?: string;
  title: string;
  gradeLevel: string;
  instructions: string;
  resources: string;
  subject: string;
  description: string;
  materials: string;
  dueDate: string;
  userId: string;
}

export interface ActivityProps{
  id: string;
  description: string;
  date:string;
  userId: string; 
} 


export interface UserTypes {
  token: string;
  email: string;
  emailVerified: string; 
  id: string;
  image: string,
  name: string;
  role: string;
  fetchingUser?: boolean;
  signingIn?: boolean;
  isLoggedIn?: boolean;
}
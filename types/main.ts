export type buttonVariant = 'PRIMARY' | 'SECONDARY' | 'WITHICONS' | 'NO_FILL'

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
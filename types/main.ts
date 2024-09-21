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
  
import { create } from 'zustand';

interface States {
  id: number;
  someData: string;
}


interface Actions {
  update: () => void;
}

export const useProductStore = create<States & Actions>((set) => ({
  id: 0,
  someData: 'makanju is building a sample product store for this page',
  update: () => set((state) => ({ id: 1,someData: state.someData })),
}));


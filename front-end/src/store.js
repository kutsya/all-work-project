import { create } from 'zustand';

const useStore = create((set) => ({
    messageForUser: [],
    setMessageForUser: (newArray) => { set({ messageForUser: newArray }) },
    addItem: (item) => set((state) => ({ messageForUser: [...state.messageForUser, item] })),

    flagIsMessage: false,
    setFlagIsMessage: (value) => set({ flagIsMessage: value }),
}));

export default useStore;

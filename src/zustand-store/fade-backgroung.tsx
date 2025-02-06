import { create } from 'zustand'

type Store = {
    isAlertDialogOpen: boolean
    setIsAlertDialogOpen: (open: boolean) => void
}

export const fadeBackgroundControllStore = create<Store>()((set) => ({
    isAlertDialogOpen: false,
    setIsAlertDialogOpen: (open) => set(() => ({ isAlertDialogOpen: open })),
}))

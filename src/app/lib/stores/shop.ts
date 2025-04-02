import { create } from "zustand";

type ShopState = {
	selectedShopId: string | null;
	setSelectedShop: (id: string) => void;
};

/**
 * useShopState state management pour la boutique séléctionnée.
 */
export const useShopStore = create<ShopState>()((set) => ({
	selectedShopId: null,
	setSelectedShop: (id): void => set({ selectedShopId: id }),
}));

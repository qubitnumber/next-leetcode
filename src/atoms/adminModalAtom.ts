import { atom } from "recoil";

type AdminModalState = {
	isOpen: boolean;
	type: "problem";
};

const initalAdminModalState: AdminModalState = {
	isOpen: false,
	type: "problem",
};

export const adminModalState = atom<AdminModalState>({
	key: "adminModalState",
	default: initalAdminModalState,
});

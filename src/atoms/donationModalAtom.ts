import { atom } from "recoil";

type DonationModalState = {
	isOpen: boolean;
	type: "donation";
};

const initalDonationModalState: DonationModalState = {
	isOpen: false,
	type: "donation",
};

export const donationModalState = atom<DonationModalState>({
	key: "donationModalState",
	default: initalDonationModalState,
});

import { donationModalState } from "@/atoms/donationModalAtom";
import DonationModal from "@/components/Modals/DonationModal";
import { useRecoilValue } from "recoil";
import Image from "next/image";

type AuthPageProps = {};

const AuthPage: React.FC<AuthPageProps> = () => {
	const donationModal = useRecoilValue(donationModalState);

	return (
		<div className='bg-gradient-to-b from-gray-600 to-black h-screen relative'>
			<div className='max-w-7xl mx-auto'>
				<div className='flex relative justify-center top-0 pointer-events-none select-none'>
					<Image src='/hero.png' alt='Hero img' width={450} height={450} />
				</div>
				{donationModal.isOpen && <DonationModal />}
			</div>
		</div>
	);
};
export default AuthPage;

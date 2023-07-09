import { donationModalState } from "@/atoms/donationModalAtom";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
	const setDonationModalState = useSetRecoilState(donationModalState);
	const router = useRouter();
	const handleClick = () => {
		setDonationModalState((prev) => ({ ...prev, isOpen: false, type: "donation" }));
		router.push("/");
	};

	return (
		<div className='space-y-6 px-6 pb-4 mb-10 flex-col'>
			<h3 className='text-xl font-medium text-white'>Thanks for Donations</h3>
			<div className='text-sm font-medium text-black'>
				Buy Me a Coffee{" "}
				<div className='text-blue-700 hover:underline'>
					<a
						href='https://www.buymeacoffee.com/leeduris'
						target='_blank'
						rel='noreferrer'
						onClick={handleClick}
					>
						https://www.buymeacoffee.com/leeduris
					</a>
				</div>
			</div>
			<div className='text-sm font-medium text-black'>
				KaKao Pay{" "}
				<div className='text-blue-700 hover:underline'>
					<a
						href='http://kko.to/ZOD_cYjYju'
						target='_blank'
						rel='noreferrer'
						onClick={handleClick}
					>
						http://kko.to/ZOD_cYjYju
					</a>
				</div>
			</div>
		</div>
	);
};
export default Login;

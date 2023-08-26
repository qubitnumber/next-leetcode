import { authModalState } from "@/atoms/authModalAtom";
import AuthModal from "@/components/Modals/AuthModal";
import Navbar from "@/components/Navbar/Navbar";
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useSession } from "next-auth/react";

type AuthPageProps = {};

const AuthPage: React.FC<AuthPageProps> = () => {
	const authModal = useRecoilValue(authModalState);
	const [pageLoading, setPageLoading] = useState(false);
	const router = useRouter();
    const {status, data: session} = useSession();

	useEffect(() => {
		if (session) router.push("/");
		if (status !== 'loading' && !session) setPageLoading(false);
	}, [session, router, status]);

	if (pageLoading) return null;

	return (
		<div className='bg-gradient-to-b from-gray-600 to-black h-screen relative'>
			<div className='max-w-7xl mx-auto'>
				<Navbar />
				<div className='flex justify-center top-0 pointer-events-none select-none'>
					<Image src='/hero.png' alt='Hero img' width={250} height={250} />
				</div>
				{authModal.isOpen && <AuthModal />}
			</div>
		</div>
	);
};
export default AuthPage;

import { adminModalState } from "@/atoms/adminModalAtom";
import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import AddProblem from './AddProblem';
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useRouter } from "next/router";

type AdminModalProps = {};

const AdminModal: React.FC<AdminModalProps> = () => {
	const adminModal = useRecoilValue(adminModalState);
	const closeModal = useCloseModal();

	return (
		<>
			<div
				className='absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60'
				onClick={closeModal}
			></div>
			<div className='w-full sm:w-[450px]  absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  flex justify-center items-center'>
				<div className='relative w-full h-full mx-auto flex items-center justify-center'>
					<div className='bg-white rounded-lg shadow relative w-full bg-gradient-to-b from-brand-orange to-slate-900 mx-6'>
						<div className='flex justify-end p-2'>
							<button
								type='button'
								className='bg-transparent  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 hover:text-white text-white'
								onClick={closeModal}
							>
								<IoClose className='h-5 w-5' />
							</button>
						</div>
						{adminModal.type === "problem" && <AddProblem />}
					</div>
				</div>
			</div>
		</>
	);
};
export default AdminModal;

function useCloseModal() {
	const setAdminModal = useSetRecoilState(adminModalState);
	const router = useRouter();

	const closeModal = () => {
		setAdminModal((prev) => ({ ...prev, isOpen: false, type: "problem" }));
		router.push("/");
	};

	useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === "Escape") closeModal();
		};
		window.addEventListener("keydown", handleEsc);
		return () => window.removeEventListener("keydown", handleEsc);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return closeModal;
}

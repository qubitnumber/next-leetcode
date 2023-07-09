import React from "react";
import { FiLogOut } from "react-icons/fi";
import { signOut } from "next-auth/react";

const Logout: React.FC = () => {
	const handleLogout = () => {
		signOut();
	};
	return (
		<button className='bg-dark-fill-3 py-1.5 px-3 cursor-pointer rounded text-brand-orange' onClick={handleLogout}>
			<FiLogOut />
		</button>
	);
};
export default Logout;

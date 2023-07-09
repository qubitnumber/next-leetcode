import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

type AddProblemProps = {};

const AddProblem: React.FC<AddProblemProps> = () => {
	const [inputs, setInputs] = useState({
		id: "", title: "", difficulty: "", category: "",
		order: 1, videoId: "", link: "",
	});
	const router = useRouter();

	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!inputs.id || !inputs.title || !inputs.difficulty ||
			!inputs.category || !inputs.order.toString()
		) {
            return alert("Please fill all fields");
        }
		try {
            toast.loading("Creating a Problem", { position: "top-center", toastId: "loadingToast" });
            const res = await fetch('/api/problem/addProblem',{
                method: 'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
					id: inputs.id,
					title: inputs.title,
					difficulty: inputs.difficulty,
					category: inputs.category,
					order: inputs.order,
					videoId: inputs.videoId,
					link: inputs.link,
				})
            });
			const { problem } = await res.json();
			if (!problem) return;
			router.push("/");
		} catch (error: any) {
			toast.error("Invalid request", { position: "top-center" });
		} finally {
			toast.dismiss("loadingToast");
		}
	};

	return (
		<form className='space-y-6 px-6 pb-4' onSubmit={handleRegister}>
			<h3 className='text-xl font-medium text-white'>Register to LeetClone</h3>
			<div>
				<label htmlFor='email' className='text-sm font-medium block mb-2 text-gray-300'>
					Id
				</label>
				<input
					onChange={handleChangeInput}
					type='text'
					name='id'
					id='id'
					className='
        border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
        bg-gray-600 border-gray-500 placeholder-gray-400 text-white
    '
					placeholder='two-sum'
				/>
			</div>
			<div>
				<label htmlFor='name' className='text-sm font-medium block mb-2 text-gray-300'>
					Title
				</label>
				<input
					onChange={handleChangeInput}
					type='text'
					name='title'
					id='title'
					className='
        border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
        bg-gray-600 border-gray-500 placeholder-gray-400 text-white
    '
					placeholder='Two Sum'
				/>
			</div>
			<div>
				<label htmlFor='password' className='text-sm font-medium block mb-2 text-gray-300'>
					Difficulty
				</label>
				<input
					onChange={handleChangeInput}
					type='text'
					name='difficulty'
					id='difficulty'
					className='
        border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
        bg-gray-600 border-gray-500 placeholder-gray-400 text-white
    '
					placeholder='Easy'
				/>
			</div>
			<div>
				<label htmlFor='password' className='text-sm font-medium block mb-2 text-gray-300'>
					Category
				</label>
				<input
					onChange={handleChangeInput}
					type='text'
					name='category'
					id='category'
					className='
        border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
        bg-gray-600 border-gray-500 placeholder-gray-400 text-white
    '
					placeholder='Array'
				/>
			</div>
			<div>
				<label htmlFor='password' className='text-sm font-medium block mb-2 text-gray-300'>
					Order
				</label>
				<input
					onChange={handleChangeInput}
					type='number'
					name='order'
					id='order'
					className='
        border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
        bg-gray-600 border-gray-500 placeholder-gray-400 text-white
    '
					placeholder='1'
				/>
			</div>
			<div>
				<label htmlFor='password' className='text-sm font-medium block mb-2 text-gray-300'>
					VideoId
				</label>
				<input
					onChange={handleChangeInput}
					type='text'
					name='videoId'
					id='videoId'
					className='
        border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
        bg-gray-600 border-gray-500 placeholder-gray-400 text-white
    '
					placeholder='8-k1C6ehKuw'
				/>
			</div>
			<div>
				<label htmlFor='password' className='text-sm font-medium block mb-2 text-gray-300'>
					Link
				</label>
				<input
					onChange={handleChangeInput}
					type='text'
					name='link'
					id='link'
					className='
        border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
        bg-gray-600 border-gray-500 placeholder-gray-400 text-white
    '
					placeholder=''
				/>
			</div>
			<button
				type='submit'
				className='w-full text-white focus:ring-blue-300 font-medium rounded-lg
            text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s
        '
			>
				Add Problem
			</button>
		</form>
	);
};
export default AddProblem;
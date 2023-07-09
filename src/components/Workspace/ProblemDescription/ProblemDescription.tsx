import CircleSkeleton from "@/components/Skeletons/CircleSkeleton";
import RectangleSkeleton from "@/components/Skeletons/RectangleSkeleton";
import { useEffect, useState } from "react";
import Image from "next/image";
import { AiFillLike, AiFillDislike, AiOutlineLoading3Quarters, AiFillStar } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { TiStarOutline } from "react-icons/ti";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { IUser } from '@/models/user.model';
import { IProblem, Problem } from '@/models/problem.model';

type ProblemX = Omit<IProblem, | 'createdAt' | 'updatedAt' >;

type ProblemDescriptionProps = {
	problem: Problem;
	_solved: boolean;
};

const ProblemDescription: React.FC<ProblemDescriptionProps> = ({ problem, _solved }) => {
    const {data: session} = useSession();
	const { currentProblem, loading, problemDifficultyClass, setCurrentProblem } = useGetCurrentProblem(problem.id);
	const { liked, disliked, solved, setData, starred } = useGetUsersDataOnProblem(problem.id);
	const [updating, setUpdating] = useState(false);
	const [userDoc, setUserDoc] = useState<IUser>();
	const [problemDoc, setProblemDoc] = useState<ProblemX>();


	const returnUserDataAndProblemData = async () => {
		try {
			const userRes = await fetch('/api/user/getUser', {
				method: 'POST',
				headers: new Headers({
					'Content-Type': 'application/json',
				}),
				body: JSON.stringify({ email: session?.user.email }),
			});
			const { user: userDoc} = await userRes.json();
			setUserDoc(userDoc);

			const problemRes = await fetch('/api/problem/getProblem', {
				method: 'POST',
				headers: new Headers({
					'Content-Type': 'application/json',
				}),
				body: JSON.stringify({ id: problem.id }),
			});
			const { problem: problemDoc } = await problemRes.json();
			setProblemDoc(problemDoc);

			return { userDoc, problemDoc };
		} catch (error: any) {
			console.log("Invalid request");
		};
	};

	const updateUserDataAndProblemData = async (
		filterUser: object, updateUser: object,
		filterProblem: object, updateProblem: object
		) => {
		try {
			const userRes = await fetch('/api/user/updateUser', {
				method: 'POST',
				headers: new Headers({
					'Content-Type': 'application/json',
				}),
				body: JSON.stringify({
					filterUser,
					updateUser,
				}),
			});
			const { user: userDoc} = await userRes.json();
			setUserDoc(userDoc);

			const problemRes = await fetch('/api/problem/updateProblem', {
				method: 'POST',
				headers: new Headers({
					'Content-Type': 'application/json',
				}),
				body: JSON.stringify({
					filterProblem,
					updateProblem,
				}),
			});
			const { problem: problemDoc } = await problemRes.json();
			setProblemDoc(problemDoc);
		} catch (error: any) {
			console.log("Invalid request");
		};
	};

	const handleLike = async () => {
		if (!session) {
			toast.error("You must be logged in to like a problem", { position: "top-left", theme: "dark" });
			return;
		}
		if (updating) return;
		setUpdating(true);
		await returnUserDataAndProblemData();
		if (userDoc && problemDoc) {
			if (liked) {
				// remove problem id from likedProblems on user document, decrement likes on problem document
				try {
					const filterUser = { email: userDoc.email};
					const updateUser = {
						likedProblems: userDoc.likedProblems?.filter((id: string) => id !== problem.id)
					};
					const filterProblem = { id: problemDoc.id};
					const updateProblem = {
						likes: problemDoc.likes - 1
					};
					await updateUserDataAndProblemData(
						filterUser, updateUser,
						filterProblem, updateProblem
					);
					setCurrentProblem((prev) => (prev ? { ...prev, likes: prev.likes - 1 } : null));
					setData((prev) => ({ ...prev, liked: false }));
				} catch (error: any) {
					console.log("Invalid request");
				};
			} else if (disliked) {
				try {
					const filterUser = { email: userDoc.email};
					const updateUser = {
						likedProblems: Array.from(new Set([...userDoc.likedProblems, problem.id])),
						dislikedProblems: userDoc.dislikedProblems.filter((id: string) => id !== problem.id),
					};
					const filterProblem = { id: problemDoc.id};
					const updateProblem = {
						likes: problemDoc.likes + 1,
						dislikes: problemDoc.dislikes - 1,
					};
					await updateUserDataAndProblemData(
						filterUser, updateUser,
						filterProblem, updateProblem
					);
					setCurrentProblem((prev) =>
						prev ? { ...prev, likes: prev.likes + 1, dislikes: prev.dislikes - 1 } : null
					);
					setData((prev) => ({ ...prev, liked: true, disliked: false }));
				} catch (error: any) {
					console.log("Invalid request");
				};
			} else {
				try {
					const filterUser = { email: userDoc.email};
					const updateUser = {
						likedProblems: Array.from(new Set([...userDoc.likedProblems, problem.id])),
					};
					const filterProblem = { id: problemDoc.id};
					const updateProblem = {
						likes: problemDoc.likes + 1,
					};
					await updateUserDataAndProblemData(
						filterUser, updateUser,
						filterProblem, updateProblem
					);
					setCurrentProblem((prev) => (prev ? { ...prev, likes: prev.likes + 1 } : null));
					setData((prev) => ({ ...prev, liked: true }));
				} catch (error: any) {
					console.log("Invalid request");
				};			
			}
		}
		setUpdating(false);
	};

	const handleDislike = async () => {
		if (!session) {
			toast.error("You must be logged in to dislike a problem", { position: "top-left", theme: "dark" });
			return;
		}
		if (updating) return;
		setUpdating(true);
		await returnUserDataAndProblemData();
		if (userDoc && problemDoc) {
			// already disliked, already liked, not disliked or liked
			if (disliked) {
				try {
					const filterUser = { email: userDoc.email};
					const updateUser = {
						dislikedProblems: userDoc.dislikedProblems.filter((id: string) => id !== problem.id),
					};
					const filterProblem = { id: problemDoc.id};
					const updateProblem = {
						dislikes: problemDoc.dislikes - 1,
					}
					await updateUserDataAndProblemData(
						filterUser, updateUser,
						filterProblem, updateProblem
					);
					setCurrentProblem((prev) => (prev ? { ...prev, dislikes: prev.dislikes - 1 } : null));
					setData((prev) => ({ ...prev, disliked: false }));
				} catch (error: any) {
					console.log("Invalid request");
				};
			} else if (liked) {
				try {
					const filterUser = { email: userDoc.email};
					const updateUser = {
						dislikedProblems: Array.from(new Set([...userDoc.dislikedProblems, problem.id])),
						likedProblems: userDoc.likedProblems.filter((id: string) => id !== problem.id),
					};
					const filterProblem = { id: problemDoc.id};
					const updateProblem = {
						dislikes: problemDoc.dislikes + 1,
						likes: problemDoc.likes - 1,
					};
					await updateUserDataAndProblemData(
						filterUser, updateUser,
						filterProblem, updateProblem
					);
					setCurrentProblem((prev) =>
						prev ? { ...prev, dislikes: prev.dislikes + 1, likes: prev.likes - 1 } : null
					);
					setData((prev) => ({ ...prev, disliked: true, liked: false }));
				} catch (error: any) {
					console.log("Invalid request");
				};
			} else {
				try {
					const filterUser = { email: userDoc.email};
					const updateUser = {
						dislikedProblems: Array.from(new Set([...userDoc.dislikedProblems, problem.id])),
					};
					const filterProblem = { id: problemDoc.id};
					const updateProblem = {
						dislikes: problemDoc.dislikes + 1,
					};
					await updateUserDataAndProblemData(
						filterUser, updateUser,
						filterProblem, updateProblem
					);
					setCurrentProblem((prev) => (prev ? { ...prev, dislikes: prev.dislikes + 1 } : null));
					setData((prev) => ({ ...prev, disliked: true }));
				} catch (error: any) {
					console.log("Invalid request");
				};				
			}
		}
		setUpdating(false);
	};

	const handleStar = async () => {
		if (!session) {
			toast.error("You must be logged in to star a problem", { position: "top-left", theme: "dark" });
			return;
		}
		if (updating) return;
		setUpdating(true);

		if (!starred && userDoc) {
			try {
				const res = await fetch('/api/user/updateUser', {
					method: 'POST',
					headers: new Headers({
						'Content-Type': 'application/json',
					}),
					body: JSON.stringify({
						filter: { email: session.user.email},
						update: {
							starredProblems: Array.from(new Set([...userDoc.starredProblems, problem.id]))
						},
					}),
				});
				const { user } = await res.json();
				if (user) {
					setData((prev) => ({ ...prev, starred: true }));
				}
			} catch (error: any) {
				console.log("Invalid request");
			};
		} else {
			try {
				const res = await fetch('/api/user/updateUser', {
					method: 'POST',
					headers: new Headers({
						'Content-Type': 'application/json',
					}),
					body: JSON.stringify({
						filter: { email: session.user.email},
						update: {
							starredProblems: userDoc?.starredProblems.filter((id: string) => id !== problem.id),
						},
					}),
				});
				const { user } = await res.json();
				if (user) {
					setData((prev) => ({ ...prev, starred: true }));
				}
			} catch (error: any) {
				console.log("Invalid request");
			};
			setData((prev) => ({ ...prev, starred: false }));
		}

		setUpdating(false);
	};

	return (
		<div className='bg-dark-layer-1'>
			{/* TAB */}
			<div className='flex h-11 w-full items-center pt-2 bg-dark-layer-2 text-white overflow-x-hidden'>
				<div className={"bg-dark-layer-1 rounded-t-[5px] px-5 py-[10px] text-xs cursor-pointer"}>
					Description
				</div>
			</div>

			<div className='flex px-0 py-4 h-[calc(100vh-94px)] overflow-y-auto'>
				<div className='px-5'>
					{/* Problem heading */}
					<div className='w-full'>
						<div className='flex space-x-4'>
							<div className='flex-1 mr-2 text-lg text-white font-medium'>{problem?.title}</div>
						</div>
						{!loading && currentProblem && (
							<div className='flex items-center mt-3'>
								<div
									className={`${problemDifficultyClass} inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize `}
								>
									{currentProblem.difficulty}
								</div>
								{(solved || _solved) && (
									<div className='rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-s text-dark-green-s'>
										<BsCheck2Circle />
									</div>
								)}
								<div
									className='flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-dark-gray-6'
									onClick={handleLike}
								>
									{liked && !updating && <AiFillLike className='text-dark-blue-s' />}
									{!liked && !updating && <AiFillLike />}
									{updating && <AiOutlineLoading3Quarters className='animate-spin' />}

									<span className='text-xs'>{currentProblem.likes}</span>
								</div>
								<div
									className='flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-green-s text-dark-gray-6'
									onClick={handleDislike}
								>
									{disliked && !updating && <AiFillDislike className='text-dark-blue-s' />}
									{!disliked && !updating && <AiFillDislike />}
									{updating && <AiOutlineLoading3Quarters className='animate-spin' />}

									<span className='text-xs'>{currentProblem.dislikes}</span>
								</div>
								<div
									className='cursor-pointer hover:bg-dark-fill-3  rounded p-[3px]  ml-4 text-xl transition-colors duration-200 text-green-s text-dark-gray-6 '
									onClick={handleStar}
								>
									{starred && !updating && <AiFillStar className='text-dark-yellow' />}
									{!starred && !updating && <TiStarOutline />}
									{updating && <AiOutlineLoading3Quarters className='animate-spin' />}
								</div>
							</div>
						)}

						{loading && (
							<div className='mt-3 flex space-x-2'>
								<RectangleSkeleton />
								<CircleSkeleton />
								<RectangleSkeleton />
								<RectangleSkeleton />
								<CircleSkeleton />
							</div>
						)}

						{/* Problem Statement(paragraphs) */}
						<div className='text-white text-sm'>
							<div dangerouslySetInnerHTML={{ __html: problem.problemStatement }} />
						</div>

						{/* Examples */}
						<div className='mt-4'>
							{problem.examples.map((example, index) => (
								<div key={example.id}>
									<p className='font-medium text-white '>Example {index + 1}: </p>
									{example.img &&
										<Image
											src={example.img}
											alt=''
											className='mt-3'
											height={100} width={300} priority={true}
											style={{ width: 'auto', height: 'auto' }} />}
									<div className='example-card'>
										<pre>
											<strong className='text-white'>Input: </strong> {example.inputText}
											<br />
											<strong>Output:</strong>
											{example.outputText} <br />
											{example.explanation && (
												<>
													<strong>Explanation:</strong> {example.explanation}
												</>
											)}
										</pre>
									</div>
								</div>
							))}
						</div>

						{/* Constraints */}
						<div className='my-8 pb-4'>
							<div className='text-white text-sm font-medium'>Constraints:</div>
							<ul className='text-white ml-5 list-disc '>
								<div dangerouslySetInnerHTML={{ __html: problem.constraints }} />
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default ProblemDescription;

function useGetCurrentProblem(problemId: string) {
	const [currentProblem, setCurrentProblem] = useState<ProblemX | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [problemDifficultyClass, setProblemDifficultyClass] = useState<string>("");

	useEffect(() => {
		// Get problem from DB
		const getCurrentProblem = async () => {
			setLoading(true);
			try {
				const res = await fetch('/api/problem/getProblem',{
					method: 'POST',
					headers:{
						'Content-Type':'application/json'
					},
					body: JSON.stringify({
						id: problemId,
					})
				});
				const { problem } = await res.json();
				if (problem) {
					setCurrentProblem({ id: problem.id, ...problem } as ProblemX);
					// easy, medium, hard
					setProblemDifficultyClass(
						problem.difficulty === "Easy"
							? "bg-olive text-olive"
							: problem.difficulty === "Medium"
							? "bg-dark-yellow text-dark-yellow"
							: " bg-dark-pink text-dark-pink"
					);
				}
				setLoading(false);
			} catch (error: any) {
				console.log("Invalid request");
			};
		};
		getCurrentProblem();
	}, [problemId]);

	return { currentProblem, loading, problemDifficultyClass, setCurrentProblem };
}

function useGetUsersDataOnProblem(problemId: string) {
	const [data, setData] = useState({ liked: false, disliked: false, starred: false, solved: false });
	const {data: session} = useSession();

	useEffect(() => {
		const getUsersDataOnProblem = async () => {
			try {
				const res = await fetch('/api/user/getUser',{
					method: 'POST',
					headers:{
						'Content-Type':'application/json'
					},
					body: JSON.stringify({
						email: session?.user.email,
					})
				});
				const { user } = await res.json();
				if (user) {
					const { solvedProblems, likedProblems, dislikedProblems, starredProblems } = user;
					setData({
						liked: likedProblems.includes(problemId), // likedProblems["two-sum","jump-game"]
						disliked: dislikedProblems.includes(problemId),
						starred: starredProblems.includes(problemId),
						solved: solvedProblems.includes(problemId),
					});
				}
				
			} catch (error: any) {
				console.log("Invalid request");
			};
		};

		if (session) getUsersDataOnProblem();
		return () => setData({ liked: false, disliked: false, starred: false, solved: false });
	}, [problemId, session]);

	return { ...data, setData };
}

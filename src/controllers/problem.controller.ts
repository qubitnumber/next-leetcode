import connectDB from '@/utils/db';
import ProblemModel, { IProblem } from '@/models/problem.model';

type ProblemX = Omit<IProblem, | 'createdAt' | 'updatedAt' >;

export const createProblem = async (problem: ProblemX) => {
    await connectDB();
    const findProblem = await ProblemModel.findOne({
        id: problem.id
    });
    if(findProblem) return null;
    const newProblem = await ProblemModel.create(problem);
    return newProblem;
}

export const getProblemById = async (id: string) => {
    const problem: ProblemX | null = await ProblemModel.findOne({
        id
    });
    if(!problem) throw new Error("No Problem Found");
    return problem;
}

export const getProblems = async () => {
    await connectDB();
    const problems: ProblemX[] = await ProblemModel.find({});
    return problems;
}

export const updateProblem = async (filter: object, update: object) => {
    await connectDB();
    const problem: ProblemX | null = await ProblemModel.findOneAndUpdate(filter, update, {
        new: true,
        upsert: false,
    });
    if(!problem) throw new Error("No Problem Found");
    return problem;
}


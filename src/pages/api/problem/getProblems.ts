import type { NextApiRequest, NextApiResponse } from 'next';
import { getProblems } from '@/controllers/problem.controller';
import { IProblem } from '@/models/problem.model';

type Data = {
    message: string,
    problems: IProblem[]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method==='POST') {
        const data = await getProblems();
        res.status(201).json({ message: 'problems retrieved', problems: data });
        return
    } else {
        res.status(500).send({ message:'Invalid Route', problems: [] })
    }
}

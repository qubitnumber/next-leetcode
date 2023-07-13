import type { NextApiRequest, NextApiResponse } from 'next';
import { createProblem } from '@/controllers/problem.controller';
import { IProblem } from '@/models/problem.model';

type Data = {
    message: string,
    problem: IProblem | {}
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method==='POST') {
        const { 
            id, title, difficulty, category, order, ...otherProps
        } = req.body;
        if (!id || !title || !difficulty || !category || !order.toString()
		) {
            res.status(422).json({ message: 'Invalid Data', problem: {} });
            return;
        }
        const data = await createProblem({
            id, title, difficulty, category, order, likes: 0, dislikes: 0, acceptance: 0,
            ...otherProps
        });
        if (!data) {
            res.status(422).json({ message: 'Problems not created', problem: {} });
            return;
        }
        res.status(201).json({ message: 'Problems created', problem: data });
        return
    } else {
        res.status(500).send({ message:'Invalid Route', problem: {} })
    }
}

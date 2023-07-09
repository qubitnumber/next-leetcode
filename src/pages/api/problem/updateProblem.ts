import type { NextApiRequest, NextApiResponse } from 'next';
import { updateProblem } from '@/controllers/problem.controller';
import { IProblem } from '@/models/problem.model';

type Data = {
    message: string,
    problem: IProblem | {}
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === 'POST') {
        const { filter, update } = req.body;
        const data = await updateProblem(filter, update)
        if (!data) {
            res.status(422).json({ message: 'User already exists', problem: {} });
            return;
        }
        res.status(201).json({ message: 'User created', problem: data });
        return
    } else {
        res.status(500).send({message:'Invalid Route', problem: {} })
    }
}

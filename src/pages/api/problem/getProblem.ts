import type { NextApiRequest, NextApiResponse } from 'next';
import { getProblemById } from '@/controllers/problem.controller';
import { IProblem } from '@/models/problem.model';

type Data = {
    message: string,
    problem: IProblem | {}
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method==='POST') {
        const { id } = req.body;
        if (!id) {
            res.status(422).json({ message: 'Invalid Data', problem: {} });
            return;
        }
        const data = await getProblemById(id);
        if (!data) {
            res.status(422).json({ message: 'Problems not exists', problem: {} });
            return;
        }
        res.status(201).json({ message: 'Problems created', problem: data });
        return
    } else {
        res.status(500).send({ message:'Invalid Route', problem: {} })
    }
}

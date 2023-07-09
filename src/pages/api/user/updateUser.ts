import type { NextApiRequest, NextApiResponse } from 'next';
import { updateUser } from '@/controllers/user.controller';
import { IUser } from '@/models/user.model';

type Data = {
    message: string,
    user: IUser | {}
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === 'POST') {
        const { filter, update } = req.body;
        const data = await updateUser(filter, update)
        if (!data) {
            res.status(422).json({ message: 'User already exists', user: {} });
            return;
        }
        res.status(201).json({ message: 'User created', user: data });
        return
    } else {
        res.status(500).send({message:'Invalid Route', user: {} })
    }
}

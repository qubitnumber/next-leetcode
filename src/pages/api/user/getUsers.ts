import type { NextApiRequest, NextApiResponse } from 'next';
import { getUsers } from '@/controllers/user.controller';
import { IUser } from '@/models/user.model';

type Data = {
    message: string,
    users: IUser[]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method==='POST') {
        const data = await getUsers();
        res.status(201).json({ message: 'problems retrieved', users: data });
        return
    } else {
        res.status(500).send({ message:'Invalid Route', users: [] })
    }
}

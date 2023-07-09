import type { NextApiRequest, NextApiResponse } from 'next';
import { getUserByEmail } from '@/controllers/user.controller';
import { IUser } from '@/models/user.model';

type Data = {
    message: string,
    user: IUser | {}
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === 'POST') {
        const { email } = req.body;
        if (!email) {
            res.status(422).json({ message: 'Invalid Data', user: {} });
            return;
        }
        const data = await getUserByEmail(email)
        if (!data) {
            res.status(422).json({ message: 'User not exists', user: {} });
            return;
        }
        res.status(201).json({ message: 'User retrieved', user: data });
        return
    } else {
        res.status(500).send({message:'Invalid Route', user: {} })
    }
}

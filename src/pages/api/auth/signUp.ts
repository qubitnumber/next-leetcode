import type { NextApiRequest, NextApiResponse } from 'next';
import { createUser } from '@/controllers/user.controller';
type Data = {
    message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method==='POST') {
        const {email, password, ...otherProps} = req.body;
        if (!email || !email.includes('@') || !password) {
            res.status(422).json({ message: 'Invalid Data' });
            return;
        }
        const data = await createUser({email, password, ...otherProps})
        if (!data) {
            res.status(422).json({ message: 'User already exists' });
            return;
        }
        // sign in the user
        res.status(201).json({ message: 'User created', ...data });
        return
    } else {
        res.status(500).send({message:'Invalid Route'})
    }
}

import connectDB from '@/utils/db';
import UserModel, { IUser } from '@/models/user.model';
import bcryptjs from 'bcryptjs';

type UserX = Omit<IUser, | 'createdAt' | 'updatedAt' >;

export const createUser = async (user: UserX) => {
    await connectDB();
    const userAdded: UserX = {
        ...user,
        password: bcryptjs.hashSync(user.password, 10),
        isAdmin: false,
    }

    const finduser = await UserModel.findOne({
        email: userAdded.email
    });
    if(finduser) return null;
    const newUser = await UserModel.create(userAdded);
    return newUser;
}

export const getUserByEmail = async (email: string) => {
    await connectDB();
    const user: UserX | null = await UserModel.findOne({
        email
    });
    if(!user) throw new Error("No User Found");
    return user;
}

export const updateUser = async (filter: object, update: object) => {
    await connectDB();
    const user: UserX | null = await UserModel.findOneAndUpdate(filter, update, {
        new: true,
        upsert: false,
    });
    if(!user) throw new Error("No User Found");
    return user;
}


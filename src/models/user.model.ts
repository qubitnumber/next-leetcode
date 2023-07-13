import mongoose, { Document } from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            required: true,
        },
        createdAt: {
            type: Date,
            required: false,
        },
        updatedAt: {
            type: Date,
            required: false,
        },
        likedProblems: {
            type: Array,
            required: false,
        },
        dislikedProblems: {
            type: Array,
            required: false,
        },
        solvedProblems: {
            type: Array,
            required: false,
        },
        submittedProblems: {
            type: Array,
            required: false,
        },
        starredProblems: {
            type: Array,
            required: false,
        },
    },
    { timestamps: true }
);

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    likedProblems: [];
    dislikedProblems: [];
    solvedProblems: [];
    submittedProblems: [];
    starredProblems: [];
}

let UserModel: mongoose.Model<IUser>;
try {
  // Try to get the existing model from mongoose
    UserModel = mongoose.model<IUser>('User');
} catch {
  // If the model doesn't exist, define it
    UserModel = mongoose.model<IUser>('User', userSchema);
}
export default UserModel;
import mongoose, { Document } from 'mongoose';

const problemSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true,
        },
        title: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        difficulty: {
            type: String,
            required: true,
        },
        order: {
            type: Number,
            required: true,
        },
        likes: {
            type: Number,
            required: false,
        },
        dislikes: {
            type: Number,
            required: false,
        },
        acceptance: {
            type: Number,
            required: false,
        },
        videoId: {
            type: String,
            required: false,
        },
        link: {
            type: String,
            required: false,
        },
        createdAt: {
            type: Date,
            required: false,
        },
        updatedAt: {
            type: Date,
            required: false,
        },
    },
    { timestamps: true }
);

export interface IProblem extends Document {
    id: string;
	title: string;
	category: string;
	difficulty: string;
    order: number;
	likes: number;
	dislikes: number;
    acceptance: number;
	videoId?: "";
	link?: "";
    createdAt?: Date;
    updatedAt?: Date;
}

export type Example = {
	id: number;
	inputText: string;
	outputText: string;
	explanation?: string;
	img?: string;
};


export type Problem = {
	id: string;
	title: string;
	problemStatement: string;
	examples: Example[];
	constraints: string;
	order: number;
	starterCode: string;
	handlerFunction: ((fn: any) => boolean) | string;
	starterFunctionName: string;
};

let ProblemModel: mongoose.Model<IProblem>;
try {
  // Try to get the existing model from mongoose
    ProblemModel = mongoose.model<IProblem>('Problem');
} catch {
  // If the model doesn't exist, define it
    ProblemModel = mongoose.model<IProblem>('Problem', problemSchema);
}
export default ProblemModel;
import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb';

export async function GET() {
    const data = await getQuestions();

    return NextResponse.json({ data })
}

const getQuestions = async (): Promise<any> => {
    const client = await clientPromise;
    const db = client.db('reviewer');

    const response = await db.collection('COSC 80B').findOne();

    if (response) {
        return {
            status: 200,
            isSuccess: true,
            questions: response,
            message: 'Successfully retrieved questions'
        };
    }

    return {
        status: 404,
        isSuccess: false,
        message: 'Failed to retrieve questions'
    }
}
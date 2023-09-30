import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb';
import { db } from '@/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

export async function GET() {
    const data = await db.cosc80B.findMany({
        include: { User: true },
        orderBy: {
            score: 'desc'
        }
    });

    return NextResponse.json({ data })
}

export async function PUT(request: Request) {
    const body = await request.json();
    const { getUser } = getKindeServerSession();
    const user = getUser();

    if (!user) return NextResponse.json({ success: false });

    await db.cosc80B.upsert({
        where: { userId: user.id! },
        update: { score: body.score },
        create: { score: body.score },
    })

    return NextResponse.json({ success: true });
}

const getQuestions = async (): Promise<any> => {
    const client = await clientPromise;
    const db = client.db('brainbout');

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
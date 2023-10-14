import { NextResponse } from 'next/server'
import { db } from '@/db'

export async function POST(req: Request) {
    const { lecture } = await req.json();
    let data: any;

    if (lecture != 'Cover-to-cover') {
        data = await db.exams.findFirst({
            where: {
                subject: 'cosc 101',
                lecture: lecture
            },
            select: {
                questions: true
            }
        });
    } else {
        data = await db.exams.findMany({
            where: {
                subject: 'cosc 101',
            },
            select: {
                questions: true
            }
        });

        data = {
            questions: [
                ...data[0].questions,
                ...data[1].questions,
            ]
        }
    }

    return NextResponse.json(data)
}
import { NextResponse } from 'next/server'
import { db } from '@/db'

export async function GET() {
    const data = await db.exams.findFirst({
        where: {
            subject: 'cosc 80b'
        },
    });

    return NextResponse.json({ data })
}
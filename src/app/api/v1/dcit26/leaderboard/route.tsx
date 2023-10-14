import { NextResponse } from 'next/server'
import { db } from '@/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

export async function POST(req: Request) {
    const { lecture } = await req.json();
    const data = await db.leaderboards.findMany({
        where: {
            subject: 'dcit 26',
            lecture: lecture
        },
        include: { User: true },
        orderBy: {
            score: 'desc'
        }
    });

    return NextResponse.json({ data })
}

export async function PUT(request: Request) {
    const { score, lecture } = await request.json();
    const { getUser } = getKindeServerSession();
    const user = getUser();

    if (!user) return NextResponse.json({ success: false });

    await db.leaderboards.upsert({
        where: {
            userId: user.id!,
            lecture: lecture
        },
        update: {
            score: score
        },
        create: {
            userId: user.id,
            subject: 'dcit 26',
            score: score,
            lecture: lecture
        },
    })

    return NextResponse.json({ success: true });
}
// import 'server-only'

export async function getLeaderboard(subject: string, lecture: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/${subject}/leaderboard`, {
        cache: 'no-store',
        method: 'POST',
        body: JSON.stringify({ lecture })
    })

    return res.json();
}

export async function getExam(subject: string, lecture: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/${subject}/exam`, {
        cache: 'no-store',
        method: 'POST',
        body: JSON.stringify({ lecture })
    })

    return res.json();
}

export async function updateExamScore(subject: string, lecture: string, score: number) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/${subject}/leaderboard`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({ lecture, score })
    })

    return res.json();
}
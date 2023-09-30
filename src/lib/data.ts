// import 'server-only'

export async function getLeaderboard(subject: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/${subject}`, {
        cache: 'no-store',
        method: 'GET',
    })

    return res.json();
}

export async function updateExamScore(subject: string, score: number) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/${subject}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({ score })
    })

    return res.json();
}
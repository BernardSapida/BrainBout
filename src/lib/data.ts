import 'server-only'

export async function getData() {
    const res = await fetch(`${process.env.NEXT_URL}/api/v1/cosc80`, {
        method: 'GET'
    })

    return res.json();
}
export function secondsToMinutesAndSeconds(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

    return `${formattedMinutes}:${formattedSeconds}`;
}

export function timeProgress(seconds: number, remainingSeconds: number) {
    return (remainingSeconds / seconds) * 100;
}

export function progressBarColor(percent: number) {
    if (percent > 50) return 'success';
    else if (percent <= 50 && percent > 20) return 'warning';
    else return 'danger';
}

export function absoluteUrl(path: string) {
    if (typeof window !== 'undefined') return path
    if (process.env.VERCEL_URL)
        return `https://${process.env.VERCEL_URL}${path}`
    return `http://localhost:${process.env.PORT ?? 3000
        }${path}`
}

export function getNumberWithOrdinal(n: number) {
    var s = ["th", "st", "nd", "rd"],
        v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export function rankChipColor(rank: number) {
    let color: string;

    switch (rank) {
        case 0: return 'success';
        case 1: return 'warning';
        case 2: return 'danger';
        default: return 'default';
    }
}
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
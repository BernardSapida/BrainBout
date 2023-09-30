type User = {
    id: string;
    given_name?: string;
    family_name?: string;
    email?: string;
    picture?: string;
}

type Leaderboard = {
    id: string;
    score: number;
    User: User;
    userId: string;
}
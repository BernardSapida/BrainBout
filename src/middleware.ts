import { authMiddleware } from '@kinde-oss/kinde-auth-nextjs/server'

export const config = {
    matcher: ['/dashboard/:path*', '/auth-callback', '/leaderboard', '/exam'],
}

export default authMiddleware;
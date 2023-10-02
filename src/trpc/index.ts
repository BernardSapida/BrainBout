import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { publicProcedure, privateProcedure, router } from './trpc';
import { TRPCError } from '@trpc/server';
import { db } from '@/db';

export const appRouter = router({
    // query => GET
    // mutation => POST, PATCH, DELETE, UPDATE
    authCallback: publicProcedure.query(async () => {
        const { getUser } = getKindeServerSession();
        const user = getUser();

        if (!user || !user.id || !user.email) {
            throw new TRPCError({ code: 'UNAUTHORIZED' });
        }

        // Upsert user in database
        await db.users.upsert({
            where: { id: user.id },
            update: {
                given_name: user.given_name,
                family_name: user.family_name,
                email: user.email,
                picture: user.picture,
            },
            create: {
                id: user.id,
                given_name: user.given_name,
                family_name: user.family_name,
                email: user.email,
                picture: user.picture,
            }
        })

        return { success: true }
    }),
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
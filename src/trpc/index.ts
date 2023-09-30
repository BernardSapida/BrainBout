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

        if (!user.id || !user.email) {
            throw new TRPCError({ code: 'UNAUTHORIZED' });
        }

        // Check if the user is in the database
        const dbUser = await db.user.findUnique({
            where: {
                id: user.id
            }
        });

        if (!dbUser) {
            // Create user in db
            await db.user.create({
                data: {
                    id: user.id,
                    given_name: user.given_name,
                    family_name: user.family_name,
                    email: user.email,
                    picture: user.picture,
                }
            })
        }

        return { success: true }
    }),
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
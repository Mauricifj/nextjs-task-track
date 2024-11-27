import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { sql } from '@vercel/postgres';
import { z } from 'zod';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';

const saltRounds = 10;

async function getUser(email: string): Promise<User | undefined> {
    try {
        const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
        return user.rows[0];
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

async function createUser(user: User): Promise<boolean | undefined> {
    try {
        const result = await sql`
            INSERT INTO users (name, email, password)
            VALUES (${user.name}, ${user.email}, ${user.password})
            ON CONFLICT (id) DO NOTHING;
        `;
        return result.rowCount === 1;
    } catch (error) {
        console.error('Failed to create user:', error);
        throw new Error('Failed to create user.');
    }
}

export async function signUp(user: User) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const { id, name, email } = user;
    return await createUser({ id, name, email, password: hashedPassword });
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (!parsedCredentials.success) {
                    return null;
                }

                const { email, password } = parsedCredentials.data;

                const user = await getUser(email);
                if (!user) {
                    return null;
                }

                const passwordsMatch = await bcrypt.compare(password, user.password);
                if (!passwordsMatch) {
                    return null;
                }

                return user;
            },
        }),
    ],
});
import { auth } from '@/authentication/auth';
import { lusitana } from '@/app/ui/fonts';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Home',
};

export default async function Page() {
    const session = await auth();
    const user = session?.user;

    return (
        <main className="flex min-h-screen flex-col p-6">
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Welcome, { user?.name }!
            </h1>
        </main>
    );
}
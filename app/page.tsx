import { lusitana } from '@/app/ui/fonts';
import Link from 'next/link';
import Image from 'next/image';
import FastTrackLogo from './ui/fast-track-logo';
import ArrowRightIcon from '@heroicons/react/24/outline/ArrowRightIcon';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        <FastTrackLogo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <p className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Welcome to Fast Track.</strong>
            <br />
            This is a project for the{' '}
            <a href="https://postech.fiap.com.br/curso/front-end-engineering" className="text-blue-500">
              FIAP&apos;s Front-End Engineering Post-graduate Course
            </a>
            , brought to you by{' '}
            <a href="https://github.com/mauricifj" className="text-blue-500">
              Mauricifj
            </a>
          </p>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
          <div className="mt-4">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-blue-500 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          <Image
            src="/hero-desktop.png"
            width={1000}
            height={760}
            className="hidden md:block"
            alt="Screenshots of the task management board showing desktop version"
          />
          <Image
            src="/hero-mobile.png"
            width={560}
            height={620}
            className="block md:hidden"
            alt="Screenshots of the task management board showing mobile version"
          />
        </div>
      </div>
    </main>
  );
}

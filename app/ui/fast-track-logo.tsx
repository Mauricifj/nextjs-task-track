import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';

export default function FastTrackLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <Image
        src="/logo.png"
        width={44}
        height={44}
        className="m-3 hidden md:block"
        alt="Fast track logo"
      />
      <Image
            src="/logo.png"
            width={20}
            height={20}
            className="m-3 block md:hidden"
            alt="Screenshots of the task management board showing mobile version"
          />
      <p className="text-[34px] md:text-[44px]">Fast Track</p>
    </div>
  );
}

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { navItems } from '@/constants';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface Props {
  fullName: string;
  avatar: string;
  email: string;
}

const Sidebar = ({ fullName, avatar, email }: Props) => {
  const pathname = usePathname();

  return (
    <aside className="sidebar text-light-300">
      <Link href="/">
        <Image
          src="/assets/icons/logo-3d-new.png"
          alt="logo"
          width={160}
          height={50}
          className="hidden h-auto lg:block w-[100px] m-auto"
        />

        {/* <Image
          src="/assets/icons/logo-brand.svg"
          alt="logo"
          width={52}
          height={52}
          className="lg:hidden"
        /> */}
      </Link>

      <nav className="sidebar-nav">
        <ul className="flex flex-1 flex-col gap-6">
          {navItems.map(({ url, name, icon }) => (
            <Link
              key={name}
              href={url}
              className="lg:w-full hover:bg-brand rounded-xl"
            >
              <li
                className={cn(
                  'sidebar-nav-item',
                  pathname === url && 'shad-active'
                )}
              >
                <Image
                  src={icon}
                  alt={name}
                  width={24}
                  height={24}
                  className={cn(
                    'nav-icon',
                    pathname === url && 'nav-icon-active'
                  )}
                />
                <p className="hidden lg:block">{name}</p>
              </li>
            </Link>
          ))}
        </ul>
      </nav>

      {/* <Image
        src="/assets/images/Storage Icons.png"
        alt="logo"
        width={64}
        height={96}
        className="m-auto w-40 "
      /> */}

      <div className="sidebar-user-info">
        <Image
          src={avatar}
          alt="Avatar"
          width={44}
          height={44}
          className="sidebar-user-avatar"
        />
        <div className="hidden lg:block text-light-300">
          <p className="subtitle-2 capitalize">{fullName}</p>
          <p className="caption">{email}</p>
        </div>
      </div>
    </aside>
  );
};
export default Sidebar;

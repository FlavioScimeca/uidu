'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

const Header = () => {
  const { data, status } = useSession();

  return (
    <header className="flex justify-between px-4 items-center p-2">
      <div>
        <Link href={'/'}>UI-HIRING</Link>
      </div>

      <div className="flex items-center">
        <p className="mr-2">Ciao {data?.user?.name ?? ' Guest'}</p>
        {status == 'authenticated' ? (
          <>
            <Link
              className="rounded-md p-2 mr-2 bg-sky-500 text-white"
              href="/create"
            >
              Create Offer
            </Link>
            <Link
              className="rounded-md p-2 mr-2 bg-black text-white"
              href="/offers"
            >
              Your Offers
            </Link>
            <button
              onClick={() => signOut()}
              className="bg-red-500 rounded-md p-2"
            >
              Sign Out
            </button>
          </>
        ) : (
          <Link
            href={'/sign-in'}
            className="bg-emerald-500 rounded-md px-4 py-2"
          >
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;

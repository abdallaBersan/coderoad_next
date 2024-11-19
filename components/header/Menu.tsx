"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { IoMdLogOut } from "react-icons/io";


const Menu = () => {
  const { data: session } = useSession();

  const signOutHandler = () => {
    signOut({ callbackUrl: "/signin" });
  };

  return (
    <>
      <ul>
        <li>
          {session && session.user ? (
            <>
              <Link href="/roadmaps/add">
                Create mission
              </Link>
              <Link href="/profile">
                Profile ({session.user.username})
              </Link>
            </>
          ) : (
            <button
              type="button"
              onClick={() => signIn()}
            >
              Sign in
            </button>
          )}
        </li>
      </ul>
      {session && session.user && (
        <button
          type="button"
          onClick={signOutHandler}
        >
          <IoMdLogOut />
          Logout
        </button>
      )}
    </>
  );
};

export default Menu;

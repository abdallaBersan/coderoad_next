"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { IoMdLogOut } from "react-icons/io";
import { IoAddCircle } from "react-icons/io5";
import { FaUserTie } from "react-icons/fa6";

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
                <IoAddCircle />
                Create mission
              </Link>
              <Link href="/profile">
                <FaUserTie />
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

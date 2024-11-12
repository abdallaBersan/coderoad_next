"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const Menu = () => {
  const { data: session } = useSession();

  const signOutHandler = () => {
    signOut({ callbackUrl: "/signin" });
  };

  return (
    <div>
      <ul className="flex items-stretch">
        <li>
          {session && session.user ? (
            <>
              <Link className="btn btn-ghost rounded-btn" href="/new-roadmap">
                Créer une roadmap
              </Link>
              <Link className="btn btn-ghost rounded-btn" href="/profile">
                Profil ({session.user.username})
              </Link>
            </>
          ) : (
            <button
              className="btn btn-ghost rounded-btn"
              type="button"
              onClick={() => signIn()}
            >
              Se connecter
            </button>
          )}
        </li>
        <li>
          {session && session.user && (
            <button
              className="btn btn-ghost rounded-btn"
              type="button"
              onClick={signOutHandler}
            >
              Se déconnecter
            </button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Menu;

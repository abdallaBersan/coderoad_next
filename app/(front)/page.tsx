"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/signin");
    }
  }, [session]);

  if (session && session.user) {
    return (
      <div>
        <h1>Home</h1>
      </div>
    );
  }

  return (
    <div>
      <p>Loading...</p>
    </div>
  );
}

// app/(front)/HomeClientComponent.tsx
"use client";

import Home from "@/app/(front)/Home";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { User } from "@/types/types";

export default function HomeClientComponent({ users }: { users: User[] }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "authenticated") {
    return <Home users={users} />;
  }

  return null;
}

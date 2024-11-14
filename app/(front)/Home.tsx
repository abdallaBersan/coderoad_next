"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { User } from "@/types/types";
import RoadmapsComponent from "@/components/home/RoadmapsComponent";

export default function Home({ users }: { users: User[] }) {
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
    return <RoadmapsComponent users={users} />;
  }

  return null;
}

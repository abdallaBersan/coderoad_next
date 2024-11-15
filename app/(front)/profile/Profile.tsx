"use client";

import { User } from "@/types/types";
import RoadmapsView from "@/components/roadmap/RoadmapsView";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    const getUser = async () => {
      console.log("Profile getUser");

      if (!session) return;
      const res = await fetch(`/api/users/${session.user.id}/roadmaps`);
      const data = await res.json();

      console.log("Profile getUser data: ", data);

      setUser(data.user);
      setIsLoading(false);
    };
    getUser();
  }, [session]);

  if (isLoading) {
    return <Loading />;
  }

  if (!user) {
    return <p>Vous devez être connecté pour voir cette page.</p>;
  }

  return <RoadmapsView users={[user]} isCenter={true} />;
}

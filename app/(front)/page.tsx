// app/(front)/page.tsx

import HomeClientComponent from "@/components/home/HomeClientComponent";
import { prisma } from "@/lib/prisma";

// Composant de page principal
export default async function Front() {
  // Récupération des utilisateurs et des roadmaps côté serveur
  const users = await prisma.user.findMany({
    include: {
      Roadmap: true,
    },
  });

  return <HomeClientComponent users={users} />;
}

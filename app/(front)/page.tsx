// app/(front)/page.tsx

import { prisma } from "@/lib/prisma";
import Home from "./Home";

// Composant de page principal
export default async function Front() {
  // Récupération des utilisateurs et des roadmaps côté serveur
  const users = await prisma.user.findMany({
    include: {
      Roadmap: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  return <Home users={users} />;
}

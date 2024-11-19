"use client";

import RoadmapCard from "@/components/roadmap/RoadmapCard";
import Sidebar from "@/components/Sidebar";
import { User, Roadmap } from "@/types/types";
import { useState } from "react";

interface RoadmapsViewProps {
  users: User[];
  isCenter?: boolean;
}

export default function RoadmapsView({ users, isCenter }: RoadmapsViewProps) {
  // État pour gérer la visibilité de la sidebar et les données de la roadmap sélectionnée
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [selectedRoadmap, setSelectedRoadmap] = useState<Roadmap | null>(null);

  // Fonction pour ouvrir la sidebar avec la roadmap sélectionnée
  const handleRoadmapClick = (roadmap: Roadmap) => {
    setSelectedRoadmap(roadmap);
    setSidebarVisible(true);
  };

  // Fonction pour fermer la sidebar
  const closeSidebar = () => {
    setSidebarVisible(false);
    setSelectedRoadmap(null);
  };

  const updateRoadmap = (roadmap: Roadmap) => {
    setSelectedRoadmap({ ...roadmap });
  };

  async function handleStatusChange(roadmap: Roadmap, newStatus: string) {
    // Logique pour mettre à jour le statut dans l'état global ou dans la base de données
    console.log(`Changing status of ${roadmap.title} to ${newStatus}`);
    try {
      // Envoyer la mise à jour à l'API
      const response = await fetch(`/api/roadmaps/${roadmap.id}/single`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        roadmap.status = newStatus;
        updateRoadmap(roadmap);
      } else {
        console.error("Erreur lors de la mise à jour du statut");
      }
    } catch (error) {
      console.error("Erreur de connexion à l'API", error);
    }
  }

  return (
    <div className={`${isCenter ? "" : "flex flex-row w-full"}`}>
      {users.map((user) => (
        <div key={user.username} className="flex flex-col m-5">
          <div className="text-center mb-5 text-2xl">
            <div className="username">{user.username}</div>
          </div>
          <div className="flex flex-col items-center">
            {/* Vérifie si `Roadmap` existe et n'est pas vide */}
            {user.Roadmap && user.Roadmap.length > 0 ? (
              <>
                {user.Roadmap &&
                  user.Roadmap.slice(0, -1).map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col items-center gap-4"
                    >
                      {/* Affiche la carte */}
                      <RoadmapCard
                        item={item}
                        handleRoadmapClick={handleRoadmapClick}
                        handleStatusChange={handleStatusChange}
                      />
                      {/* Affiche le Connector entre les cartes */}
                      <Connector />
                    </div>
                  ))}

                {/* Affiche la dernière carte sans le Connector */}
                <RoadmapCard
                  item={user.Roadmap[user.Roadmap.length - 1]}
                  handleRoadmapClick={handleRoadmapClick}
                  handleStatusChange={handleStatusChange}
                />
              </>
            ) : (
              <div className="text-center text-lg text-gray-500">
                Aucune roadmap pour le moment
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Overlay flou lorsque la sidebar est visible */}
      {isSidebarVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-30"
          onClick={closeSidebar}
        ></div>
      )}

      <Sidebar
        roadmap={selectedRoadmap}
        isSidebarVisible={isSidebarVisible}
        closeSidebar={closeSidebar}
        updateRoadmap={updateRoadmap}
      />
    </div>
  );
}

const Connector = () => {
  return <div className="w-0.5 bg-green-600 h-7"></div>;
};

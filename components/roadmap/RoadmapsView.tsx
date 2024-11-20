"use client";

import RoadmapCard from "@/components/roadmap/RoadmapCard";
import Sidebar from "@/components/Sidebar";
import { User, Roadmap } from "@/types/types";
import { useEffect, useRef, useState } from "react";

interface RoadmapsViewProps {
  users: User[];
  isCenter?: boolean;
}

export default function RoadmapsView({ users, isCenter }: RoadmapsViewProps) {
  // État pour gérer la visibilité de la sidebar et les données de la roadmap sélectionnée
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [selectedRoadmap, setSelectedRoadmap] = useState<Roadmap | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Fermer le menu dropdown lorsque vous cliquez en dehors
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        openMenuId
      ) {
        setTimeout(() => setOpenMenuId(null), 0); // Diffère la fermeture pour éviter le conflit
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [openMenuId]);

  // Fonction pour ouvrir la sidebar avec la roadmap sélectionnée
  const handleRoadmapClick = (roadmap: Roadmap) => {
    setSelectedRoadmap(roadmap);
    setOpenMenuId(null);
    setSidebarVisible(true);
  };

  // Fonction pour fermer la sidebar
  const closeSidebar = () => {
    setSidebarVisible(false);
    setOpenMenuId(null);
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
    <section className={`${isCenter ? "" : "roadmap-container"}`}>
      {users.map((user) => (
        <div key={user.username}>
          <div className="text-center mb-5 text-2xl">
            <p>{user.username}</p>
          </div>
          <div className="card-container">
            <div className="frontend">
              <h3>Front-end</h3>
              {/* Vérifie si `Roadmap` existe et n'est pas vide */}
              {user.Roadmap && user.Roadmap.length > 0 ? (
                <>
                  {user.Roadmap &&
                    user.Roadmap.filter(item => item.type === 'frontend').slice(0, -1).map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col items-center gap-4"
                      >
                        {/* Affiche la carte */}
                        <RoadmapCard
                          item={item}
                          handleRoadmapClick={handleRoadmapClick}
                          handleStatusChange={handleStatusChange}
                          openMenuId={openMenuId}
                          setOpenMenuId={setOpenMenuId}
                          menuRef={menuRef}
                        />
                        {/* Affiche le Connector entre les cartes */}
                        <Connector />
                      </div>
                    ))}

                  {/* Affiche la dernière carte sans le Connector */}
                  <RoadmapCard
                    item={user.Roadmap.filter(item => item.type === 'frontend')[user.Roadmap.filter(item => item.type === 'frontend').length - 1]}
                    handleRoadmapClick={handleRoadmapClick}
                    handleStatusChange={handleStatusChange}
                    openMenuId={openMenuId}
                    setOpenMenuId={setOpenMenuId}
                    menuRef={menuRef}
                  />
                </>
              ) : (
                <div className="text-center text-lg text-gray-500">
                  Aucune roadmap pour le moment
                </div>
              )}
            </div>
            <div className="backend">
              <h3>Back-end</h3>
              {/* Vérifie si `Roadmap` existe et n'est pas vide */}
              {user.Roadmap && user.Roadmap.length > 0 ? (
                <>
                  {user.Roadmap &&
                    user.Roadmap.filter(item => item.type === 'backend').map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col items-center gap-4"
                      >
                        {/* Affiche la carte */}
                        <RoadmapCard
                          item={item}
                          handleRoadmapClick={handleRoadmapClick}
                          handleStatusChange={handleStatusChange}
                          openMenuId={openMenuId}
                          setOpenMenuId={setOpenMenuId}
                          menuRef={menuRef}
                        />
                        {/* Affiche le Connector entre les cartes */}
                        <Connector />
                      </div>
                    ))}
                </>
              ) : null}
            </div>
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
    </section>
  );
}

const Connector = () => {
  return <div className="w-0.5 bg-green-600 h-7"></div>;
};

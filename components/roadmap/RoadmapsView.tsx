"use client";

import RoadmapCard from "@/components/roadmap/RoadmapCard";
import Sidebar from "@/components/Sidebar";
import { User, Roadmap } from "@/types/types";
import { useEffect, useRef, useState } from "react";

interface RoadmapsViewProps {
  users: User[];
  isCenter?: boolean;
}

export default function RoadmapsView({ users }: RoadmapsViewProps) {
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
    <section className="roadmap-container">
      {users.map((user) => (
        <div key={user.username} className="roadmaps">
          <div className="text-center mb-5 text-2xl">
            <p>{user.username}</p>
            <div className="types">
              <span>Backend</span>
              <span>Fronted</span>
            </div>
          </div>
          <div className="card-container">
            {user.Roadmap && user.Roadmap.length > 0 ? (
              <>
                {user.Roadmap
                  .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
                  .reduce((acc: { type: string; items?: Roadmap[]; }[], item) => {
                    if (item.group === 'projet') {
                      acc.push(
                        <div key={item.id} className="project-row">
                          <RoadmapCard
                            item={item}
                            handleRoadmapClick={handleRoadmapClick}
                            handleStatusChange={handleStatusChange}
                            openMenuId={openMenuId}
                            setOpenMenuId={setOpenMenuId}
                            menuRef={menuRef}
                          />
                        </div>
                      );
                    } else {
                      const lastRow = acc[acc.length - 1];
                      if (lastRow && lastRow.type === 'challenge-row' && lastRow.items && lastRow.items.length < 2) {
                        lastRow.items.push(item);
                      } else {
                        acc.push({ type: 'challenge-row', items: [item] });
                      }
                    }
                    return acc;
                  }, [])
                  .map((row, index) => {
                    if (row.type === 'challenge-row') {
                      return (
                        <div key={index} className="challenge-row">
                          {row.items && row.items.map((item, idx) => (
                            <div key={item.id} className={`challenge ${item.type}`}>
                              <RoadmapCard
                                item={item}
                                handleRoadmapClick={handleRoadmapClick}
                                handleStatusChange={handleStatusChange}
                                openMenuId={openMenuId}
                                setOpenMenuId={setOpenMenuId}
                                menuRef={menuRef}
                              />
                              {row.items && idx < row.items.length - 1}
                            </div>
                          ))}
                        </div>
                      );
                    } else {
                      return row;
                    }
                  })}
              </>
            ) : (
              <div className="text-center text-lg text-gray-500">
                Aucune roadmap pour le moment
              </div>
            )}
          </div>
        </div>
      ))}

      {isSidebarVisible && (
        <div className="overlay" onClick={closeSidebar}></div>
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

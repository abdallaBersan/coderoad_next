import { Roadmap } from "@/types/types";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function RoadmapCard({
  item,
  handleRoadmapClick,
  handleStatusChange,
}: {
  item: Roadmap;
  handleRoadmapClick: (roadmap: Roadmap) => void;
  handleStatusChange: (roadmap: Roadmap, newStatus: string) => void;
}) {
  const { data: session } = useSession();

  const [isStatusMenuOpen, setIsStatusMenuOpen] = useState(false);

  const toggleStatusMenu = (e: React.MouseEvent) => {
    e.stopPropagation(); // Empêche le déclenchement de `handleRoadmapClick`
    setIsStatusMenuOpen(!isStatusMenuOpen);
  };

  const changeStatus = (newStatus: string) => {
    handleStatusChange(item, newStatus);
    setIsStatusMenuOpen(false); // Fermer le menu après le changement
  };

  return (
    <div
      className="bg-neutral-800 text-white w-64 rounded-lg shadow-lg relative mb-2 mt-5"
      onClick={() => handleRoadmapClick(item)}
    >
      <div
        className={`flex justify-between items-center p-1 text-lg text-white rounded-t-lg select-none ${
          item.status === "in progress"
            ? "bg-amber-600"
            : item.status === "done"
            ? "bg-green-600"
            : "bg-blue-600"
        }`}
      >
        <span className="status text-sm font-medium">
          {item.status === "todo"
            ? "To Do"
            : item.status === "in progress"
            ? "In Progress"
            : "Done"}
        </span>
        {item.authorId === session?.user.id ? (
          <span className="cursor-pointer relative" onClick={toggleStatusMenu}>
            •••
            {isStatusMenuOpen && (
              <div className="absolute right-0 mt-2 bg-neutral-700 rounded shadow-lg p-2 z-50 w-32">
                <button
                  className="block text-left w-full text-white hover:bg-neutral-600 px-2 py-1"
                  onClick={() => changeStatus("todo")}
                >
                  To Do
                </button>
                <button
                  className="block text-left w-full text-white hover:bg-neutral-600 px-2 py-1"
                  onClick={() => changeStatus("in progress")}
                >
                  In Progress
                </button>
                <button
                  className="block text-left w-full text-white hover:bg-neutral-600 px-2 py-1"
                  onClick={() => changeStatus("done")}
                >
                  Done
                </button>
              </div>
            )}
          </span>
        ) : (
          <span className="opacity-0">•••</span>
        )}
      </div>
      <div className="text-lg font-semibold mb-2 p-1 select-none">
        {item.title}
      </div>
      <div className="flex items-center bg-neutral-700 p-1 text-white text-xs font-semibold rounded-b-lg select-none">
        {item.group === "challenge" ? "Challenge" : "Projet"}
      </div>
    </div>
  );
}

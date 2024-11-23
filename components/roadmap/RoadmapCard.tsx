import { Roadmap } from "@/types/types";
import { useSession } from "next-auth/react";
import { HiDotsVertical } from "react-icons/hi";


export default function RoadmapCard({
  item,
  handleRoadmapClick,
  handleStatusChange,
  openMenuId,
  setOpenMenuId,
  menuRef,
}: {
  item: Roadmap;
  handleRoadmapClick: (roadmap: Roadmap) => void;
  handleStatusChange: (roadmap: Roadmap, newStatus: string) => void;
  openMenuId: string | null;
  setOpenMenuId: React.Dispatch<React.SetStateAction<string | null>>;
  menuRef: React.RefObject<HTMLDivElement>;
}) {
  const { data: session } = useSession();

  const isStatusMenuOpen = openMenuId === item.id;

  const toggleStatusMenu = (e: React.MouseEvent) => {
    e.stopPropagation();

    setOpenMenuId(isStatusMenuOpen ? null : item.id);
  };

  const changeStatus = (newStatus: string) => {
    handleStatusChange(item, newStatus);
    setOpenMenuId(null); // Fermer le menu après le changement
  };

  return (
    <div
      className="card"
      onClick={() => handleRoadmapClick(item)}
    >
      <div
        className={`status-badge ${item.status === "in progress"
          ? "bg-amber-600"
          : item.status === "done"
            ? "bg-green-600"
            : "bg-blue-600"
          }`}
      >
        <span className="status text-sm font-medium">
          {item.status === "todo"
            ? "To do"
            : item.status === "in progress"
              ? "In Progress"
              : "Done"}
        </span>
      </div>
      {item.authorId === session?.user.id ? (
        <span
          className="cursor-pointer relative dots"
          onClick={toggleStatusMenu}
        >
          <HiDotsVertical />
          {isStatusMenuOpen && (
            <div
              ref={menuRef}
              className="absolute right-0 mt-2 bg-neutral-700 rounded shadow-lg p-2 z-50 w-32"
            >
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
        <span className="opacity-0"><HiDotsVertical /></span>
      )}
      <div>
        {item.title}
      </div>
    </div>
  );
}

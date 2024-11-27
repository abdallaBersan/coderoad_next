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
      className={`card card-height ${item.status === "in progress"
        ? "border-amber-700 in-progress"
        : item.status === "done"
          ? "border-green-800 done"
          : "border-gray-700 not-started"
        } ${item.group === "projet" ? "project" : ""}`}
      onClick={() => handleRoadmapClick(item)}
    >
      {item.group === "projet" && (
        <>
          <div className="project-extra-before"></div>
          <div className="project-extra-after"></div>
        </>
      )}
      <div
        className={`status-badge ${item.status === "in progress"
          ? "bg-amber-700"
          : item.status === "done"
            ? "bg-green-800"
            : "bg-gray-600"
          }`}
      >
        <span className="status text-sm font-medium">
          {item.status === "todo"
            ? "To Do"
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
              className="status-menu"
            >
              <button
                onClick={() => changeStatus("todo")}
              >
                To Do
              </button>
              <button
                onClick={() => changeStatus("in progress")}
              >
                In Progress
              </button>
              <button
                onClick={() => changeStatus("done")}
              >
                Done
              </button>
            </div>
          )}
        </span>
      ) : (
        null
      )}
      <div>
        <p className="card-title">{item.title}</p>
      </div>
      {item.group === "projet" && (
        <div className="zone">
          <p>PROJET</p>
        </div>
      )}
    </div>
  );
}

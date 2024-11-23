import { Roadmap } from "@/types/types";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Sidebar({
  roadmap,
  isSidebarVisible,
  closeSidebar,
  updateRoadmap,
}: {
  roadmap: Roadmap | null;
  isSidebarVisible: boolean;
  closeSidebar: () => void;
  updateRoadmap: (roadmap: Roadmap) => void;
}) {
  const { data: session } = useSession();

  const [isLoading, setIsLoading] = useState(false);
  const [githubLink, setGithubLink] = useState(roadmap?.github || "");
  const [githubInputValue, setGithubInputValue] = useState("");

  // Fonction pour gérer la mise à jour du lien GitHub
  const handleSaveGithub = async () => {
    try {
      setIsLoading(true);
      // Envoyer la mise à jour à l'API
      const response = await fetch(`/api/roadmaps/${roadmap?.id}/single`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ github: githubInputValue }),
      });

      if (response.ok) {
        setGithubLink(githubInputValue);
        setGithubInputValue("");

        roadmap!.github = githubInputValue;
        updateRoadmap(roadmap!);
      } else {
        console.error("Erreur lors de la mise à jour du lien GitHub");
      }
    } catch (error) {
      console.error("Erreur de connexion à l'API", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setGithubLink(roadmap?.github || "");
  }, [roadmap]);

  return (
    <div
      className={`sidebar ${isSidebarVisible && roadmap ? "translate-x-0 " : "translate-x-full"
        }`}
    >
      {/* <div className="fixed top-0 right-0 h-full w-80 bg-neutral-800 text-white shadow-lg z-50"> */}
      <div className="flex justify-between items-center p-3">
        {/* ajouter un bouton pour edit avec Link */}
        <Link href={`/roadmaps/${roadmap?.id}/edit`} className="underline link">
          Modifier
        </Link>

        <button onClick={closeSidebar} className="text-white underline">
          Fermer
        </button>
      </div>
      <div className="p-3">
        <span className="text-lg font-semibold">{roadmap?.title}</span>
      </div>
      <div className="pl-3">
        <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
          {" "}
          {roadmap?.group === "challenge" ? "Challenge" : "Projet"}
        </span>
      </div>

      <div className="p-3">
        <div className="text-sm font-semibold mb-2">Description</div>
        <div className="text-sm">{roadmap?.description}</div>
      </div>
      <div className="p-3">
        <div className="text-sm font-semibold mb-2">Type</div>
        <div className="text-sm">
          {roadmap?.type === "frontend" ? "Frontend" : "Backend"}
        </div>
      </div>
      <div className="p-3">
        <div className="text-sm font-semibold mb-2">Status</div>
        <div className="text-sm">
          {roadmap?.status === "todo"
            ? "To Do"
            : roadmap?.status === "in progress"
              ? "In Progress"
              : "Done"}
        </div>
      </div>
      <div className="p-3">
        <div className="text-sm font-semibold mb-2">Lien Github</div>
        {!githubLink ? (
          <div className="text-sm text-gray-500">Aucun lien</div>
        ) : (
          <a
            href={roadmap?.github!}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm"
          >
            {githubLink}
          </a>
        )}
      </div>

      {/* only owner can edit the github link */}
      {roadmap?.authorId == session?.user.id && (
        <div className="p-3">
          <input
            type="text"
            className="input input-bordered w-full max-w-sm mb-3"
            value={githubInputValue}
            onChange={(e) => setGithubInputValue(e.target.value)}
            placeholder="Nouveau lien Github"
          />
          <button
            className={`btn btn-primary w-full max-w-sm ${isLoading ? "loading" : ""
              }`}
            onClick={handleSaveGithub}
            disabled={isLoading || !githubInputValue}
          >
            {isLoading ? "Enregistrement..." : "Modifier"}
          </button>
        </div>
      )}
      <div className="p-3">
        <div className="text-sm font-semibold mb-2">Date</div>
        {/* date et l'heure du roadmap */}
        <div className="text-sm">
          {new Date(roadmap?.createdAt!).toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          à{" "}
          {new Date(roadmap?.createdAt!).toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
}

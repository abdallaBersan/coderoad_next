"use client";

import { User, Roadmap } from "@/types/types";

export default function Home({ users }: { users: User[] }) {
  return (
    <div className="flex flex-row w-full">
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
                      <Card item={item} />
                      {/* Affiche le Connector entre les cartes */}
                      <Connector />
                    </div>
                  ))}

                {/* Affiche la dernière carte sans le Connector */}
                <Card item={user.Roadmap[user.Roadmap.length - 1]} />
              </>
            ) : (
              <div className="text-center text-lg text-gray-500">
                Aucune roadmap pour le moment
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

const Card = ({ item }: { item: Roadmap }) => (
  <div className="bg-neutral-800 text-white w-64 rounded-lg shadow-lg relative mb-2 mt-5">
    <div
      className={`flex justify-between items-center p-1 mb-2 text-white rounded-t-lg ${
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
      <span className="text-lg cursor-pointer">•••</span>
    </div>
    <div className="text-lg font-semibold mb-2 p-1">{item.title}</div>
    <div className="flex items-center bg-neutral-700 p-1 text-white text-xs font-semibold rounded-b-lg">
      {item.group === "challenge" ? "Challenge" : "Projet"}
    </div>
  </div>
);

const Connector = () => {
  return <div className="w-0.5 bg-green-600 h-7"></div>;
};

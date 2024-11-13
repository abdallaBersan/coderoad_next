"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import RoadmapForm from "@/components/RoadmapForm";
import { SubmitHandler } from "react-hook-form";
import { RoadmapInputs } from "@/types/types";

export default function Form() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [initialData, setInitialData] = useState<RoadmapInputs | null>(null);

  useEffect(() => {
    // Fetch the existing roadmap data by ID
    const fetchData = async () => {
      const res = await fetch(`/api/roadmaps/${id}`);
      const data = await res.json();

      setInitialData(data.roadmap);
    };
    fetchData();
  }, [id]);

  const handleFormSubmit: SubmitHandler<RoadmapInputs> = async (form) => {
    try {
      console.log("Edit Form handleFormSubmit form: ", form);
      console.log("Edit Form handleFormSubmit id: ", id);

      const res = await fetch(`/api/roadmaps/${id}`, {
        method: "PUT",
        // headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push("/");
      } else {
        console.error(await res.json());
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!initialData) return <p>Loading...</p>;

  return (
    <RoadmapForm
      initialData={initialData}
      onSubmit={handleFormSubmit}
      submitLabel="Modifier la roadmap"
    />
  );
}

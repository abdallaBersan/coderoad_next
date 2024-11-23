"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import RoadmapForm from "@/components/roadmap/RoadmapForm";
import { SubmitHandler } from "react-hook-form";
import { RoadmapInputs } from "@/types/types";
import Loading from "@/components/Loading";

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
      // remove status field from form data
      const { status, ...rest } = form;

      const res = await fetch(`/api/roadmaps/${id}`, {
        method: "PUT",
        // headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rest),
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

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/roadmaps/${id}`, {
        method: "DELETE",
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

  if (!initialData) return <Loading />;

  return (
    <RoadmapForm
      initialData={initialData}
      onSubmit={handleFormSubmit}
      submitLabel="Modifier la roadmap"
      onDelete={handleDelete}
      isEditing={true}
    />
  );
}

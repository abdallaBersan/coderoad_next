"use client";

import { useRouter, useParams } from "next/navigation";
import RoadmapForm from "@/components/roadmap/RoadmapForm";
import { SubmitHandler } from "react-hook-form";
import { RoadmapInputs } from "@/types/types";

export default function NewRoadmap() {
  const router = useRouter();

  const handleFormSubmit: SubmitHandler<RoadmapInputs> = async (form) => {
    try {
      const res = await fetch("/api/roadmaps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

  return (
    <RoadmapForm onSubmit={handleFormSubmit} submitLabel="Créer une roadmap" />
  );
}

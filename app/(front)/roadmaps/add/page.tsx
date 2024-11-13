import { Metadata } from "next";
import Form from "./Form";

export const metadata: Metadata = {
  title: "Créer une roadmap",
};

export default function NewRoadmap() {
  return <Form />;
}

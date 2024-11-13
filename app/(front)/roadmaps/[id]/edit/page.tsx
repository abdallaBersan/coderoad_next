import { Metadata } from "next";
import Form from "./Form";

export const metadata: Metadata = {
  title: "Modifier une roadmap",
};

export default function EditRoadmap() {
  return <Form />;
}

"use client";
// import { Metadata } from "next";
// import Form from "./Form";

import { useRouter } from "next/navigation";

// export const metadata: Metadata = {
//     title: 'Inscription',
// }

export default function Register() {
  const router = useRouter();

  router.push("/");

  return null;
}

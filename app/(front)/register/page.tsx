import { Metadata } from "next";
import Form from "./Form";

export const metadata: Metadata = {
    title: 'Inscription',
}

export default function Signin(){
    return <Form />
}
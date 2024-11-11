import { Metadata } from "next";
import Form from "./Form";

export const metadata: Metadata = {
    title: 'Login',
}

export default function Signin(){
    return <Form />
}
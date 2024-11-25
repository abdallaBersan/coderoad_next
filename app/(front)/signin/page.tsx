import { Metadata } from "next";
import VerifyAuth from "./VerifyAuth";

export const metadata: Metadata = {
    title: 'Login',
}

export default function Signin(){
    return <VerifyAuth />
}
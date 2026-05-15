"use client";
import Button from "./Button";
import google from "../public/google.webp";
import github from "../public/github.png";
import { use } from "react";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import ROUTES from "@/route";

export default function AuthForm() {
  const oauthSignIn = async (type: "github" | "google") => {
    try {
      await signIn(type, { redirectTo: ROUTES.HOME });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };
  return (
    <div className="flex space-x-3">
      <Button icon={google} variant="outline" onClick={()=>oauthSignIn("google")}>
        Sign In With Google
      </Button>
      <Button icon={github} variant="outline" onClick={()=>oauthSignIn("github")}>
        Sign In With Github
      </Button>
    </div>
  );
}

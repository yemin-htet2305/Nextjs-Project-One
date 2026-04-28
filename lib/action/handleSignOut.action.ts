// lib/actions/auth.action.ts (add to your existing actions file)
"use server";
import { signOut } from "@/auth";
import { redirect } from "next/navigation";
import ROUTES from "@/route";

export async function handleSignOut() {
  console.log("handleSignOut called"); 
  await signOut({ redirect: false });
  redirect(ROUTES.LOGIN);
}
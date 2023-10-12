"use client";

import { useRouter } from "next/navigation";

export default function Jud() {
  const {push} = useRouter()
  push('/'); // send the user to the home page
  return null;
}
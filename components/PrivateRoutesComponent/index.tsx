"use client";

import { auth } from "@/services/database/firebase";
import { useAuth } from "@/utils/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {

  const { user } = useAuth();
  const router = useRouter();

  if (!user || auth.currentUser?.email != "creattek.team@gmail.com") {}

  return <>{children}</>;
}

import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";

import { getToken } from "./auth.token";
import { originHeader } from "@/services/api.headers";

export const verifySession = cache(async (): Promise<void> => {
  const token = await getToken();

  if (!token) {
    redirect("/");
  }

  const url = `${process.env.API_URL}/auth/session`;

  const req = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      ...originHeader(),
    },
    cache: "no-store",
  });

  if (!req.ok) {
    redirect("/");
  }
});

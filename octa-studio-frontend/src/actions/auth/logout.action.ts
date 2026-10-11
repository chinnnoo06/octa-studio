"use server"

import { redirect } from "next/navigation"
import { cookies } from "next/headers"

export const logout = async () => {
  const cookieStore = await cookies()

  cookieStore.delete("token")

  redirect("/")
}
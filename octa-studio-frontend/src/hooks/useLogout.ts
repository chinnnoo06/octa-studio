"use client";

import { useQueryClient } from "@tanstack/react-query";

import { logout } from "@/actions/logout.action";

export const useLogout = () => {
  const queryClient = useQueryClient();

  return async () => {
    queryClient.clear();
    await logout();
  };
};

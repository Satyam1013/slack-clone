"use client";

import { usePresence } from "../api/use-presence";

export const PresenceManager = () => {
  usePresence();
  return null;
};

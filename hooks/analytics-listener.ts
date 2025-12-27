import { useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { trackPageView } from "./analytics.client";

export function AnalyticsListener() {
  const router = useRouter();

  useEffect(() => {
    return router.subscribe("onLoad", () => {
      trackPageView(window.location.pathname);
    });
  }, [router]);

  return null;
}
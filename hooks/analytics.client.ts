export function trackPageView(path: string) {
  if (typeof window === "undefined") return;

  window.dataLayer.push({
    event: "page_view",
    page_path: path,
  });
}
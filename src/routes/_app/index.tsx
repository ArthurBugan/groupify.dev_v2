import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/components/landing-page";

export const Route = createFileRoute("/_app/")({
	component: HomePage,
});

function HomePage() {
	return <LandingPage />;
}

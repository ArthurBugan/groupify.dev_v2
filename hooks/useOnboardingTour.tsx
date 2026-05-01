import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  OnboardingProvider,
  useOnboarding as useOnboardjsOnboarding,
  type OnboardingStep,
} from "@onboardjs/react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { useCheckGoogleSession } from "./useQuery/useSocialLogin";
import { useGroups } from "./useQuery/useGroups";

const TOUR_STORAGE_KEY = "groupify_onboarding_complete";

type TourPage =
  | "dashboard"
  | "group-form"
  | "settings-account"
  | "groups-list"
  | "group-detail"
  | "add-channel"
  | "unknown";

function detectPage(pathname: string): TourPage {
  if (pathname === "/dashboard" || pathname.startsWith("/dashboard?")) return "dashboard";
  if (pathname === "/dashboard/groups/new" || pathname.startsWith("/dashboard/groups/new?")) return "group-form";
  if (pathname === "/dashboard/settings/account") return "settings-account";
  if (pathname === "/dashboard/groups") return "groups-list";
  if (/^\/dashboard\/groups\/[^/]+\/add-channel/.test(pathname)) return "add-channel";
  if (/^\/dashboard\/groups\/[^/]+$/.test(pathname)) return "group-detail";
  return "unknown";
}

export interface TourStepData {
  id: string;
  title: string;
  description: string;
  target?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface TourContextValue {
  isComplete: boolean;
  isRunning: boolean;
  currentStep: TourStepData | null;
  currentStepIndex: number;
  totalSteps: number;
  canGoNext: boolean;
  canGoPrevious: boolean;
  startTour: () => void;
  resetTour: () => void;
  completeTour: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onSkip: () => void;
  currentPage: TourPage;
}

const TourContext = createContext<TourContextValue | null>(null);

// Dummy step component - we manage UI ourselves
function DummyStep() {
  return null;
}

// Inner provider that uses onboardjs hooks
function TourProviderInner({
  children,
  stepsData,
}: {
  children: React.ReactNode;
  stepsData: TourStepData[];
}) {
  const location = useLocation();
  const currentPage = detectPage(location.pathname);

  const {
    state: onboardState,
    next,
    previous,
    skip,
  } = useOnboardjsOnboarding();

  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(TOUR_STORAGE_KEY) === "true";
    }
    return false;
  });

  const currentStep = onboardState?.currentStep
    ? stepsData.find((s) => s.id === (onboardState.currentStep as any).id) || null
    : null;

  const stepIds = stepsData.map((s) => s.id);
  const currentStepId = onboardState?.currentStep?.id || null;
  const currentStepIndex = currentStepId ? stepIds.indexOf(String(currentStepId)) : 0;

  const completeTour = useCallback(() => {
    localStorage.setItem(TOUR_STORAGE_KEY, "true");
    setIsComplete(true);
    setIsRunning(false);
  }, []);

  const startTour = useCallback(() => {
    setIsRunning(true);
  }, []);

  const resetTour = useCallback(() => {
    localStorage.removeItem(TOUR_STORAGE_KEY);
    setIsComplete(false);
    setIsRunning(false);
  }, []);

  const onNext = useCallback(() => {
    next();
  }, [next]);

  const onPrevious = useCallback(() => {
    previous();
  }, [previous]);

  const onSkip = useCallback(() => {
    completeTour();
    skip();
  }, [completeTour, skip]);

  const value = useMemo<TourContextValue>(
    () => ({
      isComplete,
      isRunning,
      currentStep,
      currentStepIndex,
      totalSteps: stepsData.length,
      canGoNext: onboardState?.canGoNext ?? false,
      canGoPrevious: onboardState?.canGoPrevious ?? false,
      startTour,
      resetTour,
      completeTour,
      onNext,
      onPrevious,
      onSkip,
      currentPage,
    }),
    [
      isComplete,
      isRunning,
      currentStep,
      currentStepIndex,
      stepsData.length,
      onboardState?.canGoNext,
      onboardState?.canGoPrevious,
      startTour,
      resetTour,
      completeTour,
      onNext,
      onPrevious,
      onSkip,
      currentPage,
    ],
  );

  return (
    <TourContext.Provider value={value}>
      {children}
    </TourContext.Provider>
  );
}

// Component that builds steps and wraps with OnboardingProvider
function StepsBuilder({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { data: googleSession, isLoading: googleLoading } = useCheckGoogleSession();
  const { data: groupsData, isLoading: groupsLoading } = useGroups({ limit: 1 });

  const isDataReady = !googleLoading && !groupsLoading;
  const hasGoogleConnected = googleSession?.connected ?? false;
  const hasGroups = (groupsData?.data?.length ?? 0) > 0;

  // Build step data — only after data is loaded so we don't default to false
  const stepsData: TourStepData[] = useMemo(() => {
    if (!isDataReady) return [];
    const s: TourStepData[] = [];

    // Welcome
    s.push({
      id: "welcome",
      title: "Welcome to Groupify! 👋",
      description:
        "Let's get you set up in a few quick steps. We'll help you connect your YouTube account, create your first group, and add channels.",
      target: "[data-tour='welcome-section']",
    });

    // Connect YouTube (only if not connected)
    if (!hasGoogleConnected) {
      s.push({
        id: "connect-youtube",
        title: "Step 1: Connect Your YouTube Account",
        description:
          "First, let's connect your Google account so Groupify can access your YouTube subscriptions.",
        target: "[data-tour='settings-nav-link']",
        action: {
          label: "Go to Account Settings",
          onClick: () => navigate({ to: "/dashboard/settings/account" }),
        },
      });

      s.push({
        id: "google-connect-btn",
        title: "Connect Google",
        description:
          "Click <b>Connect</b> next to Google to link your account. After authorizing, you'll be redirected back.",
        target: "[data-tour='google-connect-btn']",
      });
    }

    // Create first group (only if no groups)
    if (!hasGroups) {
      const stepNum = hasGoogleConnected ? "Step 1" : "Step 2";
      s.push({
        id: "create-group",
        title: `${stepNum}: Create Your First Group`,
        description:
          "Groups help you organize your YouTube channels into categories like 'Tech', 'Music', 'Gaming', and more.",
        target: "[data-tour='new-group-btn']",
        action: {
          label: "Create Group",
          onClick: () => navigate({ to: "/dashboard/groups/new", search: { parentId: "" } }),
        },
      });

      s.push({
        id: "group-name",
        title: "Give Your Group a Name",
        description:
          "Enter a name for your group. You can also add a description, pick a category, and choose an icon.",
        target: "[data-tour='group-name-input']",
      });

      s.push({
        id: "group-create",
        title: "Create the Group!",
        description:
          "Click <b>Create</b> to save your group. Once created, we'll move on to adding channels.",
        target: "[data-tour='group-create-btn']",
      });
    }

    // Add channels
    const addStepNum = (!hasGoogleConnected && !hasGroups) ? "Step 3" : (!hasGroups) ? "Step 2" : "Step 1";
    s.push({
      id: "add-channels",
      title: `${addStepNum}: Add Channels`,
      description:
        "Now let's add some YouTube channels to your group!",
      target: "[data-tour='groups-nav-link']",
      action: {
        label: "Go to Groups",
        onClick: () => navigate({ to: "/dashboard/groups" }),
      },
    });

    s.push({
      id: "open-group",
      title: "Open Your Group",
      description:
        "Click on your group to open it. From there you can add YouTube channels.",
      target: "[data-tour='first-group-link']",
    });

    s.push({
      id: "add-channel-btn",
      title: "Add Channels",
      description:
        "Click the <b>Add Channel</b> button to start adding YouTube channels to this group.",
      target: "[data-tour='add-channel-btn']",
    });

    s.push({
      id: "channel-search",
      title: "Search for Channels",
      description:
        "Use the search bar to find YouTube channels you want to add. You can also paste a channel URL directly.",
      target: "[data-tour='channel-search-input']",
    });

    s.push({
      id: "channel-add",
      title: "Add Channels to Your Group",
      description:
        "Click the <b>+</b> button next to any channel to add it. Select as many as you like, then click <b>Review</b>.",
      target: "[data-tour='channel-add-btn']",
    });

    // Done
    s.push({
      id: "done",
      title: "You're All Set! 🎉",
      description:
        "You've completed the setup! Start exploring your dashboard and organizing more subscriptions.",
    });

    return s;
  }, [isDataReady, hasGoogleConnected, hasGroups, navigate]);

  // Convert to onboardjs steps
  const onboardjsSteps: OnboardingStep[] = useMemo(
    () =>
      stepsData.map((step, i) => ({
        id: step.id,
        component: DummyStep,
        nextStep: stepsData[i + 1]?.id || null,
      })),
    [stepsData],
  );

  return (
    <OnboardingProvider
      key={isDataReady ? "ready" : "loading"}
      steps={onboardjsSteps}
      localStoragePersistence={undefined}
      initialStepId={stepsData[0]?.id}
    >
      <TourProviderInner stepsData={stepsData}>
        {children}
      </TourProviderInner>
    </OnboardingProvider>
  );
}

export { StepsBuilder as TourProvider };

export function useOnboardingTour(): TourContextValue {
  const ctx = useContext(TourContext);
  if (!ctx) throw new Error("useOnboardingTour must be used within a TourProvider");
  return ctx;
}

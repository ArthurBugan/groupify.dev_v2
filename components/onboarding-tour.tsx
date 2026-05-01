"use client";

import { X, ChevronRight, ChevronLeft, Sparkles, Youtube, FolderKanban, Plus, Search, CheckCircle2 } from "lucide-react";
import { useOnboardingTour } from "@/hooks/useOnboardingTour";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useCallback, useRef } from "react";
import { useLocation } from "@tanstack/react-router";

// Step icons mapping
const STEP_ICONS: Record<string, React.ElementType> = {
  welcome: Sparkles,
  "connect-youtube": Youtube,
  "google-connect-btn": Youtube,
  "create-group": FolderKanban,
  "group-name": FolderKanban,
  "group-create": FolderKanban,
  "add-channels": FolderKanban,
  "open-group": FolderKanban,
  "add-channel-btn": Plus,
  "channel-search": Search,
  "channel-add": Plus,
  done: CheckCircle2,
};

function getStepIcon(stepId: string | undefined): React.ElementType {
  return STEP_ICONS[stepId || ""] || Sparkles;
}

export function OnboardingTour() {
  const {
    isComplete,
    isRunning,
    currentStep,
    currentStepIndex,
    totalSteps,
    canGoNext,
    canGoPrevious,
    onNext,
    onPrevious,
    onSkip,
    startTour,
    completeTour,
  } = useOnboardingTour();

  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [spotlightTarget, setSpotlightTarget] = useState<HTMLElement | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Auto-start tour on first dashboard visit
  useEffect(() => {
    if (!isComplete && !isRunning && location.pathname === "/dashboard") {
      const timer = setTimeout(() => {
        startTour();
        setShowModal(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, isComplete, isRunning, startTour]);

  // Show/hide modal based on tour state
  useEffect(() => {
    setShowModal(isRunning && !!currentStep);
  }, [isRunning, currentStep]);

  // Update spotlight target when step changes
  useEffect(() => {
    if (!currentStep?.target) {
      setSpotlightTarget(null);
      return;
    }

    const updateTarget = () => {
      if (!currentStep?.target) return;
      const target = document.querySelector(currentStep.target as any);
      if (target) {
        setSpotlightTarget(target as HTMLElement);
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };

    // Try immediately, then retry after a short delay (for navigation)
    updateTarget();
    const timer = setTimeout(updateTarget, 400);
    const timer2 = setTimeout(updateTarget, 800);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, [currentStep?.target, location.pathname]);

  const handleClose = useCallback(() => {
    setShowModal(false);
    onSkip();
  }, [onSkip]);

  const handleNext = useCallback(() => {
    if (currentStep?.action?.onClick) {
      currentStep.action.onClick();
    }
    if (currentStep?.id === "done") {
      completeTour();
    }
    onNext();
  }, [currentStep, onNext, completeTour]);

  if (!showModal || !currentStep) return null;

  const StepIcon = getStepIcon(currentStep.id);
  const progress = totalSteps > 0 ? ((currentStepIndex + 1) / totalSteps) * 100 : 0;
  const hasSpotlight = !!currentStep.target;

  // Calculate spotlight position
  const spotlightRect = spotlightTarget?.getBoundingClientRect?.() || null;
  const spotPadding = 16;

  return (
    <>
      {/* Overlay - always shown so the modal is modal */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-[2px] transition-opacity duration-300"
        style={
          hasSpotlight && spotlightRect
            ? {
                clipPath: `polygon(
                  0% 0%, 
                  100% 0%, 
                  100% 100%, 
                  0% 100%, 
                  0% ${spotlightRect.top - spotPadding}px,
                  ${spotlightRect.left - spotPadding}px ${spotlightRect.top - spotPadding}px,
                  ${spotlightRect.left - spotPadding}px ${spotlightRect.top + spotlightRect.height + spotPadding}px,
                  ${spotlightRect.left + spotlightRect.width + spotPadding}px ${spotlightRect.top + spotlightRect.height + spotPadding}px,
                  ${spotlightRect.left + spotlightRect.width + spotPadding}px ${spotlightRect.top - spotPadding}px,
                  0% ${spotlightRect.top - spotPadding}px
                )`,
              }
            : undefined
        }
      >
        {/* Spotlight border effect - only when target is found */}
        {hasSpotlight && spotlightRect && (
          <div
            className="absolute border-2 border-red-500/30 rounded-xl pointer-events-none"
            style={{
              left: spotlightRect.left - spotPadding - 2,
              top: spotlightRect.top - spotPadding - 2,
              width: spotlightRect.width + spotPadding * 2 + 4,
              height: spotlightRect.height + spotPadding * 2 + 4,
              boxShadow: "0 0 20px rgba(239, 68, 68, 0.2), inset 0 0 20px rgba(239, 68, 68, 0.1)",
            }}
          />
        )}
      </div>

      {/* Modal */}
      <div className="fixed inset-0 z-[9999] flex items-start justify-center pointer-events-none p-4">
        <div
          className="pointer-events-auto w-full max-w-lg mt-8"
        >
          <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-background shadow-2xl shadow-black/20">
            {/* Progress bar */}
            <div className="px-6 pt-3">
              <div className="h-1 w-full overflow-hidden rounded bg-muted/30">
                <div
                  className="h-full bg-gradient-to-r from-red-500 to-pink-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="p-6">
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 rounded-full p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Step icon */}
              <div className="mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/10 to-pink-500/10 border border-red-500/20">
                  <StepIcon className="h-6 w-6 text-red-500" />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold mb-2 text-foreground">
                {currentStep.title}
              </h3>

              {/* Description */}
              <div
                className="text-sm text-muted-foreground leading-relaxed mb-6"
                dangerouslySetInnerHTML={{
                  __html: currentStep.description,
                }}
              />

              {/* Action buttons */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  {canGoPrevious && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onPrevious}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Back
                    </Button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClose}
                    className="text-muted-foreground"
                  >
                    Skip tour
                  </Button>

                  <Button
                    size="sm"
                    onClick={handleNext}
                    className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-lg shadow-red-500/25"
                  >
                    {currentStep.action?.label || (currentStep.id === "done" ? "Finish" : "Next")}
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Step counter */}
            <div className="px-6 py-3 border-t bg-muted/20 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                Step {currentStepIndex + 1} of {totalSteps}
              </span>
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(totalSteps, 10) }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i <= currentStepIndex
                        ? "w-4 bg-gradient-to-r from-red-500 to-pink-500"
                        : "w-1.5 bg-muted-foreground/20"
                    }`}
                  />
                ))}
                {totalSteps > 10 && (
                  <span className="text-xs text-muted-foreground ml-1">
                    +{totalSteps - 10}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function useTourController() {
  const { isComplete, isRunning, startTour, resetTour } = useOnboardingTour();
  return { isComplete, isRunning, startTour, resetTour };
}

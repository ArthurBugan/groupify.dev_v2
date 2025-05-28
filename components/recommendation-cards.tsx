"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Heart, ArrowRight, Coffee, CheckCircle2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { cn } from "@/lib/utils"

export function RecommendationCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <CrunchyrollIntegrationCard />
      <DonationSupportCard />
    </div>
  )
}

function CrunchyrollIntegrationCard() {
  return (
    <Card className="overflow-hidden border-orange-200 dark:border-orange-900/50">
      <div className="absolute top-0 right-0 w-24 h-24 -mt-8 -mr-8 bg-orange-500/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 -mb-10 -ml-10 bg-orange-500/10 rounded-full blur-2xl"></div>

      <CardHeader className="pb-2">
        <div className="flex justify-between items-center mb-2">
          <Badge
            variant="outline"
            className="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800"
          >
            <Sparkles className="h-3 w-3 mr-1 text-orange-500" />
            New Integration
          </Badge>
          <Badge
            variant="secondary"
            className="bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300"
          >
            Anime
          </Badge>
        </div>
        <CardTitle className="text-xl flex items-center gap-2 text-orange-700 dark:text-orange-400">
          Crunchyroll Integration
        </CardTitle>
        <CardDescription>Seamlessly combine YouTube and Crunchyroll anime content</CardDescription>
      </CardHeader>

      <CardContent className="pt-2 pb-0">
        <div className="relative h-40 w-full mb-4 rounded-md overflow-hidden border border-orange-200 dark:border-orange-900/50 shadow-sm">
          <Image
            src="https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=94,width=3840/CurationAssets/Ani-May/May%202025/ULTRA-WIDE/TheApothecaryDiaries-Animay-2025-UW-LTR.png"
            alt="Crunchyroll website"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-4">
            <div className="text-white text-sm font-medium">The ultimate anime tracking experience</div>
          </div>
        </div>


        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-orange-700 dark:text-orange-400">
            <Sparkles className="h-4 w-4" />
            Unlock the full anime experience
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-start gap-2 bg-orange-50 dark:bg-orange-900/20 p-2 rounded-md">
              <CheckCircle2 className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
              <div>Track anime across both platforms</div>
            </div>
            <div className="flex items-start gap-2 bg-orange-50 dark:bg-orange-900/20 p-2 rounded-md">
              <CheckCircle2 className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
              <div>Control all your collections</div>
            </div>
            <div className="flex items-start gap-2 bg-orange-50 dark:bg-orange-900/20 p-2 rounded-md">
              <CheckCircle2 className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
              <div>Discovery new animes</div>
            </div>
            <div className="flex items-start gap-2 bg-orange-50 dark:bg-orange-900/20 p-2 rounded-md">
              <CheckCircle2 className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
              <div>Share curated collections</div>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            Connect your Crunchyroll account to organize all your favorite anime content in one place.
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-4">
        <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white" asChild>
          <Link href="/dashboard/settings/integrations">
            Connect Crunchyroll <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

function DonationSupportCard() {
  const [donationType, setDonationType] = useState<"one-time" | "monthly">("one-time")
  const [selectedAmount, setSelectedAmount] = useState<string>("10")

  const handleSelectAmount = (amount: string) => {
    setSelectedAmount(amount)
  }

  const handleSelectType = (type: "one-time" | "monthly") => {
    setDonationType(type)
  }

  return (
    <Card className="border-primary/20">
      <div className="absolute top-0 right-0 w-24 h-24 -mt-8 -mr-8 bg-primary/10 rounded-full blur-2xl"></div>

      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Heart className="h-5 w-5 text-red-500" />
          Support This Project
        </CardTitle>
        <CardDescription>Help us keep the YouTube Group Manager alive and growing</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="rounded-lg bg-muted p-4 text-sm">
          <p className="mb-2 font-medium">Your support helps us:</p>
          <ul className="space-y-1 list-disc pl-5">
            <li>Maintain server infrastructure</li>
            <li>Develop new features like the Crunchyroll integration</li>
            <li>Improve existing functionality</li>
            <li>Keep the service free for everyone</li>
          </ul>
        </div>

        <div className="space-y-3">
          <div className="flex rounded-md overflow-hidden border">
            <button
              className={cn(
                "flex-1 py-2 text-sm font-medium transition-colors",
                donationType === "one-time" ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80",
              )}
              onClick={() => handleSelectType("one-time")}
            >
              One-time
            </button>
            <button
              className={cn(
                "flex-1 py-2 text-sm font-medium transition-colors",
                donationType === "monthly" ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80",
              )}
              onClick={() => handleSelectType("monthly")}
            >
              Monthly
            </button>
          </div>

          {donationType === "one-time" ? (
            <div className="grid grid-cols-3 gap-2">
              {["5", "10", "25"].map((amount) => (
                <button
                  key={amount}
                  onClick={() => handleSelectAmount(amount)}
                  className={cn(
                    "flex flex-col h-auto py-3 rounded-md border transition-all",
                    selectedAmount === amount
                      ? "border-primary bg-primary/5 ring-1 ring-primary"
                      : "border-border bg-background hover:bg-muted",
                  )}
                >
                  <span className="text-lg font-bold">${amount}</span>
                  <span className="text-xs text-muted-foreground">One-time</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {["5", "10"].map((amount) => (
                <button
                  key={amount}
                  onClick={() => handleSelectAmount(amount)}
                  className={cn(
                    "flex flex-col h-auto py-3 rounded-md border transition-all",
                    selectedAmount === amount
                      ? "border-primary bg-primary/5 ring-1 ring-primary"
                      : "border-border bg-background hover:bg-muted",
                  )}
                >
                  <span className="text-lg font-bold">${amount}</span>
                  <span className="text-xs text-muted-foreground">Monthly</span>
                </button>
              ))}
            </div>
          )}

          <div className="text-center text-sm text-muted-foreground">
            {donationType === "monthly" ? "Cancel anytime" : "Secure one-time payment"}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-2">
        <Button className="w-full">
          <Coffee className="mr-2 h-4 w-4" />
          Donate ${selectedAmount} {donationType === "monthly" ? "monthly" : ""}
        </Button>
        <p className="text-xs text-center text-muted-foreground">
          100% of donations go toward development and server costs
        </p>
      </CardFooter>
    </Card>
  )
}

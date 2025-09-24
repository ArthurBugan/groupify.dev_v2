"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CreditCard, Download, Check } from "lucide-react"

export function BillingSettings() {
  const currentPlan = "Pro"
  const billingCycle = "monthly"
  const nextBillingDate = "January 15, 2024"
  const usage = {
    groups: { used: 12, limit: 50 },
    channels: { used: 45, limit: 500 },
    apiCalls: { used: 24500, limit: 100000 },
  }

  const plans = [
    {
      name: "Free",
      price: "$0",
      features: ["Up to 3 groups", "Up to 20 channels", "Basic analytics", "1,000 API calls/month"],
    },
    {
      name: "Pro",
      price: "$9",
      current: true,
      features: [
        "Up to 50 groups",
        "Up to 500 channels",
        "Advanced analytics",
        "100,000 API calls/month",
        "Priority support",
        "Export data",
      ],
    },
    {
      name: "Business",
      price: "$29",
      features: [
        "Unlimited groups",
        "Unlimited channels",
        "Advanced analytics",
        "1,000,000 API calls/month",
        "Priority support",
        "API access",
        "Custom integrations",
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>You are currently on the {currentPlan} plan</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">$9/month</p>
              <p className="text-sm text-muted-foreground">
                Billed {billingCycle}ly • Next billing date: {nextBillingDate}
              </p>
            </div>
            <Badge variant="outline" className="text-lg px-3 py-1">
              {currentPlan}
            </Badge>
          </div>

          <div className="flex gap-2">
            <Button variant="outline">
              <CreditCard className="mr-2 h-4 w-4" />
              Update Payment Method
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download Invoice
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Usage</CardTitle>
          <CardDescription>Your current usage for this billing period</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Groups</span>
              <span className="font-medium">
                {usage.groups.used} / {usage.groups.limit}
              </span>
            </div>
            <Progress value={(usage.groups.used / usage.groups.limit) * 100} />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Channels</span>
              <span className="font-medium">
                {usage.channels.used} / {usage.channels.limit}
              </span>
            </div>
            <Progress value={(usage.channels.used / usage.channels.limit) * 100} />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>API Calls</span>
              <span className="font-medium">
                {usage.apiCalls.used.toLocaleString()} / {usage.apiCalls.limit.toLocaleString()}
              </span>
            </div>
            <Progress value={(usage.apiCalls.used / usage.apiCalls.limit) * 100} />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Available Plans</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.name} className={plan.current ? "border-primary" : ""}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{plan.name}</CardTitle>
                  {plan.current && <Badge>Current</Badge>}
                </div>
                <CardDescription>
                  <span className="text-2xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-4" variant={plan.current ? "outline" : "default"} disabled={plan.current}>
                  {plan.current ? "Current Plan" : plan.name === "Free" ? "Downgrade" : "Upgrade"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>Your recent transactions and invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-medium">Pro Plan - December 2023</p>
                <p className="text-sm text-muted-foreground">December 15, 2023</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">$9.00</span>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-medium">Pro Plan - November 2023</p>
                <p className="text-sm text-muted-foreground">November 15, 2023</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">$9.00</span>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium">Pro Plan - October 2023</p>
                <p className="text-sm text-muted-foreground">October 15, 2023</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">$9.00</span>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Youtube, ArrowLeft, Mail, CheckCircle, RefreshCw } from "lucide-react"

function SuccessContent() {
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || "your email address"

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold">
            <Youtube className="h-8 w-8 text-red-500" />
            Groupify
          </Link>
        </div>

        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-xl">Check your email</CardTitle>
            <CardDescription className="text-base">
              We've sent a password reset link to <br />
              <strong className="text-foreground">{email}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-lg bg-muted p-6 text-center space-y-3">
              <Mail className="mx-auto h-10 w-10 text-muted-foreground" />
              <div className="space-y-2">
                <p className="font-medium">What's next?</p>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>1. Check your email inbox</p>
                  <p>2. Click the reset link in the email</p>
                  <p>3. Create your new password</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-amber-800 dark:text-amber-200">Didn't receive the email?</p>
                  <p className="text-amber-700 dark:text-amber-300 mt-1">
                    Check your spam folder or wait a few minutes for the email to arrive.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-3">
            <Button variant="outline" className="w-full" asChild>
              <Link href="/auth/forgot-password">
                <RefreshCw className="mr-2 h-4 w-4" />
                Send another email
              </Link>
            </Button>
            <Button variant="ghost" className="w-full" asChild>
              <Link href="/auth/login">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to sign in
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <div className="text-center text-sm text-muted-foreground">
          Need help?{" "}
          <Link href="/support" className="text-primary hover:underline">
            Contact support
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function ForgotPasswordSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  )
}

"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function Auth() {
  const [loginStage, setLoginStage] = useState("email");

  const handleLogin = () => {
    if (loginStage === "email") {
      setLoginStage("otp");
    } else if (loginStage === "otp") {
    }
  };
  return (
    <div className="flex flex-col items-center space-y-4 justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            {loginStage === "email"
              ? "Enter your email below to login to your account."
              : "Enter the OTP sent to your email to verify."}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {loginStage === "email" && (
            <>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
              </div>
            </>
          )}

          {loginStage === "otp" && (
            <div className="grid gap-2 justify-center">
              <InputOTP maxLength={6}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          )}
        </CardContent>

        <CardFooter>
          <Button className="w-full" onClick={handleLogin}>
            {loginStage === "email" ? "Sign in" : "Verify OTP"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

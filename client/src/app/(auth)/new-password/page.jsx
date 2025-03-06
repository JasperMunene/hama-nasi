"use client";
import React, { Suspense, useState } from "react";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/elements/button/Button";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

// Child component that uses useSearchParams()
function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resetToken = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!resetToken) {
      alert("Reset token not found in URL");
      return;
    }

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reset_token: resetToken, new_password: newPassword }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Password reset successful. Please log in with your new password.");
        router.push("/login");
      } else {
        alert(data.message || "Password reset failed");
      }
    } catch (err) {
      console.error("Error resetting password", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="w-full max-w-md sm:pt-10 mx-auto mb-5"></div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Reset Your Password
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Please enter your new password and confirm it below.
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <Label>
                    New Password <span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div>
                  <Label>
                    Confirm Password <span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div>
                  <Button className="w-full" size="sm" type="submit">
                    Reset Password
                  </Button>
                </div>
              </div>
            </form>
            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Remembered your password?{" "}
                <Link
                  href="/login"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Parent component wrapping the form in Suspense
export default function ResetPassword() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
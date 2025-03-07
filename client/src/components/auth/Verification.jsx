"use client";
import React, { useState, useEffect } from "react";
import Label from "@/components/form/Label";
import Button from "@/components/elements/button/Button";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function Verification() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email"); // Fetch email from query params

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(0); // countdown timer (in seconds)

  // useEffect to count down the timer when resend is disabled
  useEffect(() => {
    if (resendTimer === 0) return;
    const interval = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  // Update the OTP state on input change
  const handleChange = (e, index) => {
    const { value } = e.target;
    // Only allow a single digit (0-9)
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      // Auto focus the next input if a digit was entered
      if (value && index < otp.length - 1) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  // Submit the form and send the OTP for verification
  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    
    // Ensure email is present before making the request
    if (!email) {
      alert("Email not provided in the URL.");
      return;
    }

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otpValue }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Email verified:", data);
        router.push("/onboarding");
      } else {
        console.error("Verification error:", data);
        alert(data.message || "Verification failed");
      }
    } catch (err) {
      console.error("Error during verification:", err);
      alert("Something went wrong!");
    }
  };

  // Handle resending the OTP
  const handleResend = async () => {
    if (!email) {
      alert("Email not provided in the URL.");
      return;
    }
    try {
      const response = await fetch("http://127.0.0.1:5000/auth/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("OTP resent successfully. Please check your email.");
        // Disable the resend button for 30 seconds
        setResendTimer(30);
      } else {
        alert(data.message || "Failed to resend OTP.");
      }
    } catch (err) {
      console.error("Error resending OTP:", err);
      alert("Something went wrong while resending OTP!");
    }
  };

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="w-full max-w-md sm:pt-10 mx-auto mb-5"></div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Two Step Verification
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              A verification code has been sent to your email. Please enter it in the field below.
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <Label>
                    Type your 6 digits security code <span className="text-error-500">*</span>
                  </Label>
                  <div className="flex gap-2 sm:gap-4" id="otp-container">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        maxLength="1"
                        className="dark:bg-dark-900 otp-input h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-center text-xl font-semibold text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                        type="text"
                        value={digit}
                        onChange={(e) => handleChange(e, index)}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <Button className="w-full" size="sm" type="submit">
                    Verify My Account
                  </Button>
                </div>
              </div>
            </form>
            <div className="mt-5 flex gap-3 items-center">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400">
                Didn&apos;t get the code?
              </p>
              <p 
                className="text-sm pt-[2px] text-brand-500"
                size="sm"
                onClick={handleResend}
                disabled={resendTimer > 0}
              >
                {resendTimer > 0 ? `Resend (${resendTimer}s)` : "Resend"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

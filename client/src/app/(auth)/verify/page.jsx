import Verification from "@/components/auth/Verification";
import { Suspense } from "react";



export const metadata = {
  title: "Hama Nasi | Reset Password",
  description: "Reset your password",
};

export default function Verify() {
  return (
    <Suspense>
      <Verification />
    </Suspense>
  );
}

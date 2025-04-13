import type { Metadata } from "next";
import SignupForm from "@/components/ui/forms/SignupForm";
import AuthLayout from "@/components/layouts/AuthLayout";

export const metadata: Metadata = {
  title: "Sign Up | Chat App",
  description: "Create a new chat account",
};

export default function SignupPage() {
  return (
    <AuthLayout
      title="Create an account"
      subtitle="Sign up to get started with our chat application"
      illustration="signup"
    >
      <SignupForm />
    </AuthLayout>
  );
}

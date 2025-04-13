import type { Metadata } from "next";
import SignupForm from "@/components/ui/forms/SignupForm";
import AuthLayout from "@/components/layouts/AuthLayout";

export const metadata: Metadata = {
  title: "Sign Up",
  description:
    "Create a Chimr account to start chatting and connecting with others.",
  robots: {
    index: false, // typically you don't want auth pages indexed
    follow: false,
  },
  openGraph: {
    title: "Sign Up | Chimr",
    description: "Join Chimr and connect with people around the world.",
    url: "https://chimr.vercel.app/auth/signup",
    siteName: "Chimr",
    locale: "en_US",
    type: "website",
  },
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

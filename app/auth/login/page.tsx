import type { Metadata } from "next";
import LoginForm from "@/components/ui/forms/LoginForm";
import AuthLayout from "@/components/layouts/AuthLayout";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Sign in to your Chimr account to access chats and connect with your friends.",
  robots: {
    index: false, // login page shouldn't be indexed
    follow: false,
  },
  openGraph: {
    title: "Login | Chimr",
    description: "Access your Chimr account to chat and collaborate.",
    url: "https://chimr.vercel.app/auth/login",
    siteName: "Chimr",
    locale: "en_US",
    type: "website",
  },
};

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Login to your account to continue chatting"
      illustration="login"
    >
      <LoginForm />
    </AuthLayout>
  );
}

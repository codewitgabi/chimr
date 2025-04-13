import type { Metadata } from "next";
import LoginForm from "@/components/ui/forms/LoginForm";
import AuthLayout from "@/components/layouts/AuthLayout";

export const metadata: Metadata = {
  title: "Login | Chat App",
  description: "Login to your chat account",
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

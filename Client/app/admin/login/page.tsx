import type { Metadata } from "next"
import AdminLoginTemplate from "@/templates/admin-login-template"

export const metadata: Metadata = {
  title: "Login | DealDash",
  description: "Secure login portal for DealDash e-commerce platform administrators",
}

export default function AdminLoginPage() {
  return <AdminLoginTemplate />
}

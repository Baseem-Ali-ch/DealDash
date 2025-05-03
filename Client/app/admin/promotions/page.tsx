import { PromotionsManagementTemplate } from "@/templates/promotions-management-template"
import { AdminLayout } from "@/templates/admin-layout"

export default function PromotionsPage() {
  return (
    <AdminLayout>
      <PromotionsManagementTemplate />
    </AdminLayout>
  )
}

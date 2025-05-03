import { AdminLayout } from "@/templates/admin-layout"
import { OrderManagementTemplate } from "@/templates/order-management-template"

export default function OrdersPage() {
  return (
    <AdminLayout>
      <OrderManagementTemplate />
    </AdminLayout>
  )
}

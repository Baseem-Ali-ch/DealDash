import { AdminLayout } from "@/templates/admin-layout"
import { CustomerManagementTemplate } from "@/templates/customer-management-template"

export default function CustomersPage() {
  return (
    <AdminLayout>
      <CustomerManagementTemplate />
    </AdminLayout>
  )
}

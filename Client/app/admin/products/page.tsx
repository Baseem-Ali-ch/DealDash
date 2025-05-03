import { AdminLayout } from "@/templates/admin-layout"
import { ProductsManagementTemplate } from "@/templates/products-management-template"

export default function ProductsPage() {
  return (
    <AdminLayout>
      <ProductsManagementTemplate />
    </AdminLayout>
  )
}

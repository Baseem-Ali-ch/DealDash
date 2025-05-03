import { AdminLayout } from "@/templates/admin-layout"
import { CategoryManagementTemplate } from "@/templates/category-management-template"

export default function CategoriesPage() {
  return (
    <AdminLayout>
      <CategoryManagementTemplate />
    </AdminLayout>
  )
}

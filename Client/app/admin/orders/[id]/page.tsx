import { AdminLayout } from "@/templates/admin-layout"

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  // In a real app, fetch order data based on params.id

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Order Details</h1>
        <p className="text-muted-foreground">This page will display detailed information for order ID: {params.id}</p>

        {/* Order detail component would be rendered here */}
        <div className="p-8 text-center bg-muted rounded-lg">
          <p>Order detail view is under development</p>
        </div>
      </div>
    </AdminLayout>
  )
}

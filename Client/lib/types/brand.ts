
interface BrandFormProps {
  category?: Brand | null;
  onSave: (data: Brand) => void;
  onCancel: () => void;
}


interface Brand {
  _id: string;
  name: string;
  description?: string;
  website?: string;
  logo?: string;
  status: 'active' | 'inactive';
  productsCount?: number;
}

interface BrandsTableProps {
  brand: { data: Brand[] } | null;
  searchTerm?: string;
  onEdit: (brand: Brand) => void;
  onDelete: (id: string) => void;
  onViewDetails?: (brand: Brand) => void;
  onToggleStatus: (id: string, status: string) => void;
  isLoading?: boolean;
}
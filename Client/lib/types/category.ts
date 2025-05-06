interface Category {
  _id?: string;
  name?: string;
  slug?: string;
  description?: string;
  status?: string;
  image?: { url: string; name: string; size: number; type: string } | null;
}

interface CategoryFormProps {
  category?: Category | null;
  onSave: (data: Category) => void;
  onCancel: () => void;
}
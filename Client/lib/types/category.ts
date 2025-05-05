interface Category {
  _id?: string;
  name?: string;
  slug?: string;
  description?: string;
  parentId?: string;
  status?: string;
  image?: { url: string; name: string; size: number; type: string } | null;
  seo?: { title: string; description: string; keywords: string };
}

interface CategoryFormProps {
  category?: Category | null;
  onSave: (data: Category) => void;
  onCancel: () => void;
}
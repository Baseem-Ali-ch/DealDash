"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";

export function CategoryHeader({ onAddCategory, onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Categories</h1>
        <p className="text-muted-foreground">
          Manage your product categories and subcategories.
        </p>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <form onSubmit={handleSearch} className="flex w-full sm:w-auto">
          <Input
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-r-none"
          />
          <Button
            type="submit"
            variant="secondary"
            className="rounded-l-none text-white"
          >
            <Search className="h-4 w-4" />
          </Button>
        </form>

        <Button onClick={() => onAddCategory()}>
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>
    </div>
  );
}

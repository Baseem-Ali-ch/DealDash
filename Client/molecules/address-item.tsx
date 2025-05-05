"use client";
import type { Address } from "@/lib/data/user-data";
import { cn } from "@/lib/utils/utils";
import { Edit, Home, MapPin, Trash } from "lucide-react";
import { Button } from "@/atoms/button";

interface AddressItemProps {
  address: Address;
  onEdit: (address: Address) => void;
  onDelete: (id: string) => void;
  onSetDefault: (id: string) => void;
}

export const AddressItem = ({
  address,
  onEdit,
  onDelete,
  onSetDefault,
}: AddressItemProps) => {
  return (
    <div
      className={cn(
        "border rounded-lg p-4",
        address.isDefault
          ? "border-primary/50 bg-primary/5"
          : "border-gray-200 dark:border-gray-700"
      )}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <Home className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          <h3 className="font-medium">{address.name}</h3>
          {address.isDefault && (
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
              Default
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(address)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(address.id)}
            className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
          >
            <Trash className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-3 text-sm text-gray-600 dark:text-gray-300 space-y-1">
        <p>{address.addressLine1}</p>
        {address.addressLine2 && <p>{address.addressLine2}</p>}
        <p>
          {address.city}, {address.state} {address.postalCode}
        </p>
        <p>{address.country}</p>
        <p className="mt-2">{address.phone}</p>
      </div>

      {!address.isDefault && (
        <Button
          variant="outline"
          size="sm"
          className="mt-3"
          onClick={() => onSetDefault(address.id)}
        >
          <MapPin className="h-4 w-4 mr-2" />
          Set as Default
        </Button>
      )}
    </div>
  );
};

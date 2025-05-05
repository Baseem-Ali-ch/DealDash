"use client";

import { Grid, List } from "lucide-react";
import { Button } from "@/atoms/button";
import { cn } from "@/lib/utils/utils";

interface ViewToggleProps {
  view: "grid" | "list";
  onChange: (view: "grid" | "list") => void;
}

export function ViewToggle({ view, onChange }: ViewToggleProps) {
  return (
    <div className="flex rounded-md border">
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "rounded-none rounded-l-md border-r",
          view === "grid" && "bg-accent text-accent-foreground"
        )}
        onClick={() => onChange("grid")}
        aria-label="Grid view"
        aria-pressed={view === "grid"}
      >
        <Grid className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "rounded-none rounded-r-md",
          view === "list" && "bg-accent text-accent-foreground"
        )}
        onClick={() => onChange("list")}
        aria-label="List view"
        aria-pressed={view === "list"}
      >
        <List className="h-4 w-4" />
      </Button>
    </div>
  );
}

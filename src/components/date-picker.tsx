"use client";

import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export type ImperativeHandleFromDatePicker = {
  reset: () => void;
} | null;

type DatePickerProps = {
  id: string;
  name: string;
  label: string;
  defaultValue?: string | undefined;
  className?: string;
  imperativeHandleRef: React.RefObject<ImperativeHandleFromDatePicker>;
  errorField: React.ReactElement;
};

export function DatePicker({
  id,
  label,
  name,
  className,
  defaultValue,
  imperativeHandleRef,
  errorField,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(
    defaultValue ? new Date(defaultValue.replaceAll("-", "/")) : undefined,
  );
  React.useImperativeHandle(imperativeHandleRef, () => ({
    reset: () => setDate(undefined),
  }));
  const formattedStringDate = date ? format(date, "yyyy-MM-dd") : "Select date";

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <Label htmlFor={id} className="px-1">
        {label}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            className="justify-between font-normal"
          >
            {formattedStringDate}
            <ChevronDownIcon />
            <input type="hidden" name={name} value={formattedStringDate} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
      {errorField}
    </div>
  );
}

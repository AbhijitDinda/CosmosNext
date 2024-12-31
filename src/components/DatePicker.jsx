import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

export function DatePickerDemo({
  buttonClassName = "",
  contentClassName = "",
  calendarClassName = "",
}) {
  const [date, setDate] = useState();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-between text-wrap font-normal",
            !date && "text-muted-foreground",
            buttonClassName
          )}
        >
          {date ? format(date, "PP") : <span>Pick a date</span>}
          <CalendarIcon className="mr-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("w-auto p-0", contentClassName)}>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          className={calendarClassName} // Accept dynamic className for the calendar
        />
      </PopoverContent>
    </Popover>
  );
}

"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker, DropdownProps } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Import Select components

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption_label: "text-sm font-medium", // Removed hidden class if captionLayout is dropdown
        caption_dropdowns: "flex justify-center gap-1", // Style for dropdown container
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground", // Adjusted opacity
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        caption: cn("flex justify-center pt-1 relative items-center", {
           // Hide default label if dropdowns are used
          '[&>[data-testid="captionLabel"]]:hidden': props.captionLayout?.startsWith('dropdown')
        }),
        dropdown: "rdp-dropdown bg-background text-foreground", // Ensure dropdown uses theme colors
        dropdown_icon: "ml-2",
        dropdown_year: "rdp-dropdown_year", // Class for year dropdown
        dropdown_month: "rdp-dropdown_month", // Class for month dropdown
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" {...props} />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" {...props} />,
        // Use ShadCN Select for dropdowns
         Dropdown: ({ value, onChange, children, ...rest }: DropdownProps) => {
           const options = React.Children.toArray(children) as React.ReactElement<React.HTMLProps<HTMLOptionElement>>[];
           const selected = options.find((child) => child.props.value === value);
           const handleChange = (value: string) => {
             const changeEvent = {
               target: { value },
             } as React.ChangeEvent<HTMLSelectElement>;
             onChange?.(changeEvent);
           };
           return (
             <Select
               value={value?.toString()}
               onValueChange={(value) => {
                 if(value) handleChange(value); // Ensure value is not null/undefined before calling
               }}
               // Pass name prop ('month' or 'year') to Select for context/accessibility
               name={rest.name}
             >
               <SelectTrigger
                aria-label={rest.name === 'months' ? 'Select Month' : 'Select Year'}
                className={cn(
                    buttonVariants({ variant: "outline" }),
                    "h-7 w-fit min-w-[4.5rem] px-2 py-0.5 text-sm font-medium focus:ring-0 bg-background text-foreground border-input hover:bg-accent hover:text-accent-foreground" // Apply theme colors
                )}
                >
                 <SelectValue>
                     {selected?.props?.children}
                 </SelectValue>
               </SelectTrigger>
               <SelectContent
                 position="popper"
                 className="max-h-60 bg-popover text-popover-foreground" // Apply theme colors
                >
                 {options.map((option, id: number) => (
                   <SelectItem
                     key={`${rest.name}-${option.props.value ?? id}`} // Use a more robust key including dropdown name
                     value={option.props.value?.toString() ?? ""}
                     className="cursor-pointer focus:bg-accent focus:text-accent-foreground" // Apply theme colors
                   >
                     {option.props.children}
                   </SelectItem>
                 ))}
               </SelectContent>
             </Select>
           );
         },
         // Pass test ID for easier querying
         CaptionLabel: ({ ...props }) => (
             <div data-testid="captionLabel" className={cn("text-sm font-medium", classNames?.caption_label)} {...props} />
         ),
      }}
      {...props} // Pass all other props down
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }

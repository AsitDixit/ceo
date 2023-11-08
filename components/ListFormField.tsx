import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { CalendarIcon, CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { UseFormReturn } from "react-hook-form";
import { setValuehandlerProps } from "@/app/page";
import { ScrollArea } from "@/components/ui/scroll-area";

interface typeProps {
  form_control: any;
  name: "company" | "days";
  command_placeholder: string;
  placeholder: string;
  form_label: string;
  form_description: string;
  listItem: readonly {
    label: string;
    value: string;
  }[];
  formSetValueHandler: ({ attribute, value }: setValuehandlerProps) => void;
}
export default function ListFormField({
  form_control,
  name,
  placeholder,
  command_placeholder,
  listItem,
  form_label,
  form_description,
  formSetValueHandler,
}: typeProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <FormField
      control={form_control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {form_label}
          </FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-full justify-between font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? listItem.find((level) => level.value === field.value)
                        ?.label
                    : placeholder}
                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Command>
                <CommandInput placeholder={command_placeholder} />
                <CommandEmpty>No role found.</CommandEmpty>
                <ScrollArea
                  className={`${
                    listItem.length > 10 ? "h-[200px]" : "h-auto"
                  } w-[350px] rounded-md border p-2 border-none shadow-none`}
                >
                  <CommandGroup>
                    {listItem.map((level) => (
                      <CommandItem
                        value={level.label}
                        key={level.value}
                        onSelect={() => {
                          formSetValueHandler({
                            attribute: name,
                            value: level.value,
                          });
                          setOpen(false);
                        }}
                      >
                        <CheckIcon
                          className={cn(
                            "mr-2 h-4 w-4",
                            level.value === field.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {level.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </ScrollArea>
              </Command>
            </PopoverContent>
          </Popover>
          <FormDescription>{form_description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

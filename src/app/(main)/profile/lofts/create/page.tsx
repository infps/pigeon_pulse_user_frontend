"use client";
import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { creatteLoft } from "@/lib/api/loft";

const formSchema = z.object({
  name: z.string().min(1, "Loft name is required"),
  location: z.string().min(1, "Location is required"),
});

export default function CreateLoft() {
  const { data, isError, isPending, mutateAsync, isSuccess } = creatteLoft({
    params: {},
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      location: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!mutateAsync) return;
    try {
      const res = await mutateAsync(values);
      if (res.error) {
        toast.error(res.error || "Failed to create loft");
      } else {
        toast.success("Loft created successfully");
        form.reset();
      }
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to create loft. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto py-10 flex flex-col"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Loft Name</FormLabel>
              <FormControl>
                <Input placeholder="" type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="" type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} type="submit" className="self-end">
          Create
        </Button>
      </form>
    </Form>
  );
}

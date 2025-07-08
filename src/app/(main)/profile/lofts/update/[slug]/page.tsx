"use client";
import { use, useState } from "react";
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
import { getLoft, updateLoft } from "@/lib/api/loft";
import { Loft, MyLofts } from "@/components/columns";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1, "Loft name is required"),
  location: z.string().min(1, "Location is required"),
});

export default function UpdateLoft({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();
  const {
    data: getLoftData,
    isError: getLoftError,
    isPending: getLoftPending,
    isSuccess: getLoftSuccess,
  } = getLoft({
    params: {},
    loftId: slug,
  });

  if (!slug) {
    router.push("/profile/lofts");
    return null;
  }

  const loftDetails: Loft = getLoftData?.data;

  if (getLoftPending) {
    return <div>Loading loft details...</div>;
  }
  if (getLoftError) {
    return <div>Error loading loft details</div>;
  }

  return <div className="p-4 sm:p-6"><UpdateLoftForm loftId={slug} initialData={loftDetails} /></div>;
}

function UpdateLoftForm({
  loftId,
  initialData,
}: {
  loftId: string;
  initialData: Loft;
}) {
  const router = useRouter();
  const { mutateAsync, isPending } = updateLoft({
    params: {},
    loftId: loftId,
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData.name,
      location: initialData.location,
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!mutateAsync) return;
    try {
      const res = await mutateAsync(values);
      if (res.error) {
        toast.error(res.error || "Failed to update loft");
      } else {
        toast.success("Loft updated successfully");
        router.push("/profile/lofts");
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
        className="space-y-6 sm:space-y-8 max-w-3xl mx-auto py-6 sm:py-10 flex flex-col"
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
          <Button
            disabled={form.formState.isSubmitting}
            type="submit"
            className="self-end w-full sm:w-auto"
          >
            {isPending ? "Updating..." : "Update"}
          </Button>
        </form>
      </Form>
  );
}

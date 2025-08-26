"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSession } from "@/lib/api/auth";
import { useCurrentUser, useUpdateCurrentUser } from "@/lib/api/user";
import { CurrentUser } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  country: z.string().min(1, "Country is required").optional(),
  ssn: z.string().min(1, "SSN is required").optional(),
  taxNumber: z.string().min(1, "Tax number is required").optional(),

  address: z.string().min(1, "Address is required").optional(),
  city: z.string().min(1, "City is required").optional(),
  state: z.string().min(1, "State is required").optional(),
  zip: z.string().min(1, "ZIP code is required").optional(),

  primaryPhone: z.string().min(1, "Primary phone is required").optional(),
  cellPhone: z.string().min(1, "Cell phone is required").optional(),
  fax: z.string().min(1, "Fax is required").optional(),
  sms: z.string().min(1, "SMS is required").optional(),
  alternativeEmail: z.string().email("Invalid email").optional(),
  webAddress: z.string().url("Invalid URL").optional(),
});

export default function page() {
  const { data, error, isError, isPending, isSuccess } = useCurrentUser();
  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  const userProfile: CurrentUser = data?.data;

  return (
    <div>
      <ProfileForm userProfile={userProfile} />
    </div>
  );
}

function ProfileForm({ userProfile }: { userProfile: CurrentUser }) {
  const { mutateAsync: updateCurrentUser } = useUpdateCurrentUser();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: userProfile?.name || "",
      country: userProfile?.country || "",
      ssn: userProfile?.ssn || "",
      taxNumber: userProfile?.taxNumber || "",
      address: userProfile?.address || "",
      city: userProfile?.city || "",
      state: userProfile?.state || "",
      zip: userProfile?.zip || "",
      primaryPhone: userProfile?.primaryPhone || "",
      cellPhone: userProfile?.cellPhone || "",
      fax: userProfile?.fax || "",
      sms: userProfile?.sms || "",
      alternativeEmail: userProfile?.alternativeEmail || "",
      webAddress: userProfile?.webAddress || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (!updateCurrentUser) return;
      await updateCurrentUser(values);
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      toast.error(error.message || "Update failed. Please try again.");
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Form {...form}>
        <h1 className="text-3xl font-bold text-center mb-1">My Profile</h1>
        <p className="text-center text-sm text-muted-foreground mb-6">
          Update your account information
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-10 w-full"
        >
          {/* ---------- PERSONAL INFORMATION ---------- */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        className="shadow-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input
                        className="shadow-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ssn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SSN</FormLabel>
                    <FormControl>
                      <Input
                        className="shadow-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="taxNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tax Number</FormLabel>
                    <FormControl>
                      <Input
                        className="shadow-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </section>

          {/* ---------- ADDRESS INFORMATION ---------- */}
          <section className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Address Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        className="shadow-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input
                        className="shadow-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input
                        className="shadow-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="zip"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ZIP Code</FormLabel>
                    <FormControl>
                      <Input
                        className="shadow-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </section>

          {/* ---------- CONTACT INFORMATION ---------- */}
          <section className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="primaryPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Phone</FormLabel>
                    <FormControl>
                      <Input
                        className="shadow-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cellPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cell Phone</FormLabel>
                    <FormControl>
                      <Input
                        className="shadow-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fax"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fax</FormLabel>
                    <FormControl>
                      <Input
                        className="shadow-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SMS</FormLabel>
                    <FormControl>
                      <Input
                        className="shadow-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="alternativeEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alternative Email</FormLabel>
                    <FormControl>
                      <Input
                        className="shadow-none"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="webAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Web Address</FormLabel>
                    <FormControl>
                      <Input
                        className="shadow-none"
                        type="url"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </section>

          {/* ---------- SUBMIT BUTTON ---------- */}
          <Button
            disabled={form.formState.isSubmitting}
            className="w-full"
            type="submit"
          >
            {form.formState.isSubmitting ? "Updating..." : "Update Profile"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

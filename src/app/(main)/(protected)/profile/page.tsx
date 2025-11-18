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
  firstName: z.string().min(1, "First name is required").optional(),
  lastName: z.string().min(1, "Last name is required").optional(),
  country: z.string().min(1, "Country is required").optional(),
  ssn: z.string().min(1, "SSN is required").optional(),
  taxNumber: z.string().min(1, "Tax number is required").optional(),
  
  isDefaultAddress1: z.boolean().optional(),
  address1: z.string().min(1, "Address is required").optional(),
  city1: z.string().min(1, "City is required").optional(),
  state1: z.string().min(1, "State is required").optional(),
  zip1: z.string().min(1, "ZIP code is required").optional(),
  
  address2: z.string().min(1, "Address is required").optional(),
  city2: z.string().min(1, "City is required").optional(),
  state2: z.string().min(1, "State is required").optional(),
  zip2: z.string().min(1, "ZIP code is required").optional(),

  phone: z.string().min(1, "Phone is required").optional(),
  cell: z.string().min(1, "Cell phone is required").optional(),
  fax: z.string().min(1, "Fax is required").optional(),
  sms: z.string().min(1, "SMS is required").optional(),
  email2: z.string().email("Invalid email").optional().or(z.literal("")),
  webAddress: z.string().url("Invalid URL").optional().or(z.literal("")),
  note: z.string().optional(),
  defaultNameAgn: z.string().optional(),
  defaultNameAs: z.string().optional(),
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
      firstName: userProfile?.firstName || "",
      lastName: userProfile?.lastName || "",
      country: userProfile?.country || "",
      ssn: userProfile?.ssn || "",
      taxNumber: userProfile?.taxNumber || "",
      isDefaultAddress1: userProfile?.isDefaultAddress1 || false,
      address1: userProfile?.address1 || "",
      city1: userProfile?.city1 || "",
      state1: userProfile?.state1 || "",
      zip1: userProfile?.zip1 || "",
      address2: userProfile?.address2 || "",
      city2: userProfile?.city2 || "",
      state2: userProfile?.state2 || "",
      zip2: userProfile?.zip2 || "",
      phone: userProfile?.phone || "",
      cell: userProfile?.cell || "",
      fax: userProfile?.fax || "",
      sms: userProfile?.sms || "",
      email2: userProfile?.email2 || "",
      webAddress: userProfile?.webAddress || "",
      note: userProfile?.note || "",
      defaultNameAgn: userProfile?.defaultNameAgn || "",
      defaultNameAs: userProfile?.defaultNameAs || "",
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
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
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
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
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
                name="defaultNameAgn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Default Name (AGN)</FormLabel>
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
                name="defaultNameAs"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Default Name (AS)</FormLabel>
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

          {/* ---------- PRIMARY ADDRESS ---------- */}
          <section className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Primary Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="address1"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
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
                name="city1"
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
                name="state1"
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
                name="zip1"
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

          {/* ---------- SECONDARY ADDRESS ---------- */}
          <section className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Secondary Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="address2"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
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
                name="city2"
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
                name="state2"
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
                name="zip2"
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
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
                name="cell"
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
                name="email2"
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

          {/* ---------- ADDITIONAL INFORMATION ---------- */}
          <section className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
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

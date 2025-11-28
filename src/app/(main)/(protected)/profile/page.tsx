"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useCurrentUser, useUpdateCurrentUser } from "@/lib/api/user";
import { CurrentUser } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const updateProfileSchema = z.object({
  firstName: z.string().min(1, "First Name is required").optional(),
  lastName: z.string().min(1, "Last Name is required").optional(),
  country: z.string().min(1, "Country is required").optional(),
  address1: z.string().min(1, "Address Line 1 is required").optional(),
  city1: z.string().min(1, "City is required").optional(),
  state1: z.string().min(1, "State is required").optional(),
  zip1: z.string().min(1, "ZIP Code is required").optional(),
  address2: z.string().optional(),
  city2: z.string().optional(),
  state2: z.string().optional(),
  zip2: z.string().optional(),
  phone: z.string().min(1, "Phone number is required").optional(),
  cell: z.string().optional(),
  fax: z.string().optional(),
  email2: z
    .string()
    .email("Invalid email address")
    .optional()
    .or(z.literal("")),
  webAddress: z.string().optional(),
  ssn: z.string().optional(),
  note: z.string().optional(),
  sms: z.string().optional(),
  taxNumber: z.string().optional(),
  defaultNameAgn: z.string().optional(),
  defaultNameAs: z.string().optional(),
});

type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;

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
  const { mutateAsync: updateCurrentUser, isPending } = useUpdateCurrentUser();
  const [isDefaultAddress1, setIsDefaultAddress1] = useState(false);
  const [isDefaultAddress2, setIsDefaultAddress2] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
  });

  // Update form when user data is loaded
  useEffect(() => {
    if (userProfile) {
      reset({
        firstName: userProfile.firstName || "",
        lastName: userProfile.lastName || "",
        country: userProfile.country || "",
        address1: userProfile.address1 || "",
        city1: userProfile.city1 || "",
        state1: userProfile.state1 || "",
        zip1: userProfile.zip1 || "",
        address2: userProfile.address2 || "",
        city2: userProfile.city2 || "",
        state2: userProfile.state2 || "",
        zip2: userProfile.zip2 || "",
        phone: userProfile.phone || "",
        cell: userProfile.cell || "",
        fax: userProfile.fax || "",
        email2: userProfile.email2 || "",
        webAddress: userProfile.webAddress || "",
        ssn: userProfile.ssn || "",
        note: userProfile.note || "",
        sms: userProfile.sms || "",
        taxNumber: userProfile.taxNumber || "",
        defaultNameAgn: userProfile.defaultNameAgn || "",
        defaultNameAs: userProfile.defaultNameAs || "",
      });
      setIsDefaultAddress1(userProfile.isDefaultAddress1 || false);
      setIsDefaultAddress2(!userProfile.isDefaultAddress1 || false);
    }
  }, [userProfile, reset]);

  const onSubmit = async (data: UpdateProfileFormData) => {
    try {
      // Remove empty email2 field
      if (!data.email2) {
        delete data.email2;
      }
      if (!updateCurrentUser) return;
      await updateCurrentUser(data);
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      toast.error(error?.message || "Failed to update profile");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Section */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" {...register("firstName")} />
            {errors.firstName && (
              <p className="text-sm text-red-500 mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" {...register("lastName")} />
            {errors.lastName && (
              <p className="text-sm text-red-500 mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        {/* Country, SSN, Tax Number */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="country">Country</Label>
            <Input id="country" {...register("country")} />
            {errors.country && (
              <p className="text-sm text-red-500 mt-1">
                {errors.country.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="ssn">S.S. number</Label>
            <Input id="ssn" {...register("ssn")} />
          </div>
          <div>
            <Label htmlFor="taxNumber">Tax number</Label>
            <Input id="taxNumber" {...register("taxNumber")} />
          </div>
        </div>

        {/* Address 1 Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Address 1</h3>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="defaultAddress1"
                checked={isDefaultAddress1}
                onCheckedChange={(checked) => {
                  setIsDefaultAddress1(checked as boolean);
                  if (checked) setIsDefaultAddress2(false);
                }}
              />
              <label htmlFor="defaultAddress1" className="text-sm">
                Default address
              </label>
            </div>
          </div>
          <div>
            <Label htmlFor="address1">Address</Label>
            <Input id="address1" {...register("address1")} />
            {errors.address1 && (
              <p className="text-sm text-red-500 mt-1">
                {errors.address1.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="city1">City</Label>
              <Input id="city1" {...register("city1")} />
              {errors.city1 && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.city1.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="state1">State</Label>
              <Input id="state1" {...register("state1")} />
              {errors.state1 && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.state1.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="zip1">Zip</Label>
              <Input id="zip1" {...register("zip1")} />
              {errors.zip1 && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.zip1.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Address 2 Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Address 2</h3>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="defaultAddress2"
                checked={isDefaultAddress2}
                onCheckedChange={(checked) => {
                  setIsDefaultAddress2(checked as boolean);
                  if (checked) setIsDefaultAddress1(false);
                }}
              />
              <label htmlFor="defaultAddress2" className="text-sm">
                Default address
              </label>
            </div>
          </div>
          <div>
            <Label htmlFor="address2">Address</Label>
            <Input id="address2" {...register("address2")} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="city2">City</Label>
              <Input id="city2" {...register("city2")} />
            </div>
            <div>
              <Label htmlFor="state2">State</Label>
              <Input id="state2" {...register("state2")} />
            </div>
            <div>
              <Label htmlFor="zip2">Zip</Label>
              <Input id="zip2" {...register("zip2")} />
            </div>
          </div>
        </div>

        {/* Contacts Section */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Contacts</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Primary Phone</Label>
              <Input id="phone" {...register("phone")} />
              {errors.phone && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="cell">Cell Phone</Label>
              <Input id="cell" {...register("cell")} />
            </div>
            <div>
              <Label htmlFor="fax">Fax</Label>
              <Input id="fax" {...register("fax")} />
            </div>
            <div>
              <Label htmlFor="sms">SMS</Label>
              <Input id="sms" {...register("sms")} />
            </div>
            <div>
              <Label htmlFor="email2">Alternative E-Mail</Label>
              <Input id="email2" type="email" {...register("email2")} />
              {errors.email2 && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email2.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <Label htmlFor="webAddress">Web address</Label>
            <Input id="webAddress" {...register("webAddress")} />
          </div>
        </div>

        {/* Defaults Section */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Defaults</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="defaultNameAgn">AGN team name</Label>
              <Input id="defaultNameAgn" {...register("defaultNameAgn")} />
            </div>
            <div>
              <Label htmlFor="defaultNameAs">AS team name</Label>
              <Input id="defaultNameAs" {...register("defaultNameAs")} />
            </div>
          </div>
        </div>

        {/* Note Section */}
        <div>
          <Label htmlFor="note">Note</Label>
          <Textarea id="note" {...register("note")} rows={4} />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}

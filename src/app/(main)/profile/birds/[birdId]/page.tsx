"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getBird, updateBird } from "@/lib/api/loft";
import { Bird } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React, { use } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export default function page({
  params,
}: {
  params: Promise<{ birdId: string }>;
}) {
  const { birdId } = use(params);
  const { data, isError, error, isSuccess, isPending } = getBird({
    params: {},
    birdId,
  });
  console.log(data, isError, error, isSuccess, isPending);
  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isError && error) {
    return <div>Error: {error.message}</div>;
  }
  if (isSuccess && !data) {
    return <div>No data found</div>;
  }
  const bird: Bird = data?.data;
  return (
    <div>
      <div className="rounded-lg border p-4 grid h-32 grid-cols-3 gap-4">
        <div className="border-r flex items-center gap-4">
          <Image
            src={bird?.photoUrl || ""}
            alt="Bird Image"
            width={80}
            height={80}
            className="rounded-full aspect-square object-cover w-20 h-20"
          />
          <div className="flex flex-col">
            <h1 className="text-muted-foreground">Bird Name</h1>
            <p className="text-2xl font-medium mt-4">{bird.name}</p>
          </div>
        </div>
        <div className="border-r flex flex-col justify-between">
          <h1 className="text-muted-foreground">Totat Races Joined</h1>
          <p className="text-2xl font-medium">{bird._count.raceEntries}</p>
        </div>
        <div className=" flex flex-col justify-between">
          <h1 className="text-muted-foreground">Loft Name</h1>
          <p className="text-2xl font-medium">{bird.loft.name}</p>
        </div>
      </div>
      <UpdateBirdForm initialData={bird} />
    </div>
  );
}

function UpdateBirdForm({ initialData }: { initialData: Bird }) {
  const { mutateAsync, isPending } = updateBird({
    params: {},
    birdId: initialData.id,
  });
  const formSchema = z.object({
    loftname: z.string().min(1, "Loft name is required"),
    name: z.string().min(1, "Bird name is required"),
    bandNumber: z.string().min(1, "Band number is required"),
    breed: z.string().min(1, "Breed is required"),
    color: z.string().min(1, "Color is required"),
    gender: z.enum(["MALE", "FEMALE"], {
      message: "Gender must be either Male or Female",
    }),
    status: z.enum(["ACTIVE", "MISSING", "HOSPITALIZED"], {
      message: "Status must be either ACTIVE, MISSING, or HOSPITALIZED",
    }),
    age: z.number(),
    wingspan: z.number(),
    vaccinationStatus: z.boolean().refine((val) => typeof val === "boolean", {
      message: "Vaccination status must be a boolean",
    }),
    penNumber: z.string().min(1, "Pen number is required"),
    raceExperience: z.number(),
    rfIdTag: z.string().min(1, "RFID tag is required"),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      loftname: initialData.loft.name,
      name: initialData.name,
      bandNumber: initialData.bandNumber,
      breed: initialData.breed || "",
      color: initialData.color || "",
      gender: initialData.gender,
      status: initialData.status,
      age: initialData.age || 0,
      wingspan: initialData.wingspan || 0,
      vaccinationStatus: initialData.vaccinationStatus || false,
      penNumber: initialData.penNumber || "",
      raceExperience: initialData.raceExperience || 0,
      rfIdTag: initialData.rfIdTag || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!mutateAsync) {
      return;
    }
    try {
      const { data, error, status } = await mutateAsync(values);
      if (error) {
        toast.error(`Error: ${error}`);
      } else {
        toast.success("Bird updated successfully");
      }
    } catch (error) {
      console.error("Error updating bird:", error);
      toast.error("Failed to update bird. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 mx-auto py-10"
      >
        <div className="flex items-center w-full gap-6">
          <FormField
            control={form.control}
            name="loftname"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Loft Name</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    readOnly
                    className="w-full"
                    placeholder=""
                    type="text"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Bird name</FormLabel>
                <FormControl>
                  <Input
                    className="w-full"
                    placeholder="Bird Name"
                    type="text"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center w-full gap-6">
          <FormField
            control={form.control}
            name="bandNumber"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Band Number</FormLabel>
                <FormControl>
                  <Input
                    className="w-full"
                    placeholder="Band Number"
                    type="text"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="breed"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Breed</FormLabel>
                <FormControl>
                  <Input
                    className="w-full"
                    placeholder="Breed"
                    type="text"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center w-full gap-6">
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Gender</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="MALE">Male</SelectItem>
                    <SelectItem value="FEMALE">Female</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="MISSING">Missing</SelectItem>
                    <SelectItem value="HOSPITALIZED">Hospitalized</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center w-full gap-6">
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Color</FormLabel>
                <FormControl>
                  <Input
                    className="w-full"
                    placeholder="Color"
                    type="text"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input
                    className="w-full"
                    placeholder="Age in months"
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center w-full gap-6">
          <FormField
            control={form.control}
            name="wingspan"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Wing Span (in cm)</FormLabel>
                <FormControl>
                  <Input
                    className="w-full"
                    placeholder="Wing Span"
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="penNumber"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Pen Number</FormLabel>
                <FormControl>
                  <Input
                    className="w-full"
                    placeholder="Pen Number"
                    type="text"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center w-full gap-6">
          <FormField
            control={form.control}
            name="raceExperience"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Race Experience</FormLabel>
                <FormControl>
                  <Input
                    className="w-full"
                    placeholder="Race Experience in months"
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rfIdTag"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>RFID Tag</FormLabel>
                <FormControl>
                  <Input
                    className="w-full"
                    placeholder="RFID Tag"
                    type="text"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="vaccinationStatus"
          render={({ field }) => (
            <FormItem className="w-full flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Is Bird Vaccinated?</FormLabel>

                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          Update Bird
        </Button>
      </form>
    </Form>
  );
}

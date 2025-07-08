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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import React from "react";
import { createBird, getLoft } from "@/lib/api/loft";
import { Loft } from "@/components/columns";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/file-upload";
import { CloudUpload, Paperclip } from "lucide-react";

export default function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { data, isError, isPending, mutateAsync, isSuccess } = getLoft({
    params: {},
    loftId: slug,
  });
  if (isPending) {
    return <div>Loading loft details...</div>;
  }
  if (isError) {
    return <div>Error loading loft details</div>;
  }
  const loft: Loft = data?.data;
  return (
    <div className="p-4 sm:p-6">
      <CreateBirdForm loftName={loft.name} loftId={slug} />
    </div>
  );
}

function CreateBirdForm({
  loftName,
  loftId,
}: {
  loftName: string;
  loftId: string;
}) {
  const { isPending, mutateAsync } = createBird({
    params: {},
    loftId,
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
    photo: z
      .instanceof(File)
      .refine((file) => file.size <= 1024 * 1024 * 4, {
        message: "File size must be less than 4MB",
      })
      .optional(),
  });
  const [files, setFiles] = useState<File[] | null>(null);
  const dropZoneConfig = {
    maxFiles: 1,
    maxSize: 1024 * 1024 * 4,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".svg"],
    },
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      loftname: loftName,
      name: "",
      bandNumber: "",
      breed: "",
      color: "",
      gender: "MALE",
      status: "ACTIVE",
      age: 0,
      wingspan: 0,
      vaccinationStatus: false,
      penNumber: "",
      raceExperience: 0,
      rfIdTag: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (!mutateAsync) {
      return;
    }
    if (!files || files.length === 0) {
      toast.error("Please upload a bird image");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("bandNumber", data.bandNumber);
    formData.append("breed", data.breed);
    formData.append("color", data.color);
    formData.append("gender", data.gender);
    formData.append("status", data.status);
    formData.append("age", data.age.toString());
    formData.append("wingspan", data.wingspan.toString());
    formData.append("vaccinationStatus", data.vaccinationStatus.toString());
    formData.append("penNumber", data.penNumber);
    formData.append("raceExperience", data.raceExperience.toString());
    formData.append("rfIdTag", data.rfIdTag);
    formData.append("photo", files[0]);
    try {
      const { data, error, status } = await mutateAsync(formData);
      if (error) {
        toast.error(`Error: ${error}`);
      } else {
        toast.success("Bird created successfully");
        form.reset();
        setFiles(null);
      }
    } catch (error) {
      console.error("Error creating bird:", error);
      toast.error("Failed to create bird. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 sm:space-y-8 max-w-3xl mx-auto py-6 sm:py-10"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center w-full gap-4 sm:gap-6">
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
        <div className="flex flex-col sm:flex-row items-start sm:items-center w-full gap-4 sm:gap-6">
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
        <div className="flex flex-col sm:flex-row items-start sm:items-center w-full gap-4 sm:gap-6">
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

        <div className="flex flex-col sm:flex-row items-start sm:items-center w-full gap-4 sm:gap-6">
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
        <div className="flex flex-col sm:flex-row items-start sm:items-center w-full gap-4 sm:gap-6">
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
          name="photo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bird Image</FormLabel>
              <FormControl>
                <FileUploader
                  value={files}
                  onValueChange={setFiles}
                  dropzoneOptions={dropZoneConfig}
                  className="relative bg-background rounded-lg p-2"
                >
                  <FileInput
                    id="fileInput"
                    className="outline-dashed outline-1 outline-slate-500"
                  >
                    <div className="flex items-center justify-center flex-col p-8 w-full ">
                      <CloudUpload className="text-gray-500 w-10 h-10" />
                      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>
                        &nbsp; or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF
                      </p>
                    </div>
                  </FileInput>
                  <FileUploaderContent>
                    {files &&
                      files.length > 0 &&
                      files.map((file, i) => (
                        <FileUploaderItem key={i} index={i}>
                          <Paperclip className="h-4 w-4 stroke-current" />
                          <span>{file.name}</span>
                        </FileUploaderItem>
                      ))}
                  </FileUploaderContent>
                </FileUploader>
              </FormControl>
              <FormDescription>1024x1024 size recommended</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <Button className="w-full sm:w-auto sm:self-end" type="submit">
          Save Bird
        </Button>
      </form>
    </Form>
  );
}

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useCreateBird, useUpdateBird } from "@/lib/api/bird";
import { toast } from "sonner";
import { Bird } from "@/lib/types";
import { Button } from "./ui/button";

const formSchema = z.object({
  birdName: z.string().min(1, "Bird name is required"),
  color: z.string().min(1, "Color is required"),
  sex: z.enum(["COCK", "HEN"]),
});
export function BirdCreateForm() {
  const { mutateAsync: createBird } = useCreateBird();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      birdName: "",
      color: "",
      sex: "COCK",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (!createBird) return;
      await createBird(values);
      form.reset();
      toast.success("Bird created successfully!");
    } catch (error) {
      console.error("Failed to create bird:", error);
      toast.error("Failed to create bird.");
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-full mt-4"
      >
        <FormField
          control={form.control}
          name="birdName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bird Name</FormLabel>
              <FormControl>
                <Input
                  className="shadow-none"
                  placeholder="Enter bird name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <Input
                  className="shadow-none"
                  placeholder="Enter color"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sex"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sex</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full shadow-none">
                    <SelectValue placeholder="Select sex" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="COCK">Cock</SelectItem>
                    <SelectItem value="HEN">Hen</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create Bird</Button>
      </form>
    </Form>
  );
}

export function BirdUpdateForm({ values }: { values: Bird }) {
  const { mutateAsync: updateBird } = useUpdateBird(values.id);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: values,
  });
  async function onSubmit(updatedValues: z.infer<typeof formSchema>) {
    try {
      if (!updateBird) return;
      await updateBird(updatedValues);
      toast.success("Bird updated successfully!");
    } catch (error) {
      console.error("Failed to update bird:", error);
      toast.error("Failed to update bird.");
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 mt-4 w-full"
      >
        <FormField
          control={form.control}
          name="birdName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bird Name</FormLabel>
              <FormControl>
                <Input
                  className="shadow-none"
                  placeholder="Enter bird name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <Input
                  className="shadow-none"
                  placeholder="Enter color"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sex"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sex</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full shadow-none">
                    <SelectValue placeholder="Select sex" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="COCK">Cock</SelectItem>
                    <SelectItem value="HEN">Hen</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update Bird</Button>
      </form>
    </Form>
  );
}

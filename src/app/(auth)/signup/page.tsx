"use client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { PasswordInput } from "@/components/ui/password-input";
import { useSignup } from "@/lib/api/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
const formSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z
      .string()
      .email("Invalid email address")
      .min(1, "Email is required"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(32, "Password must be at most 32 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password is required")
      .max(32, "Confirm Password must be at most 32 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function page() {
  const router = useRouter();
  const { mutateAsync: signup } = useSignup();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (!signup) return;
      const { data } = await signup(values);
      localStorage.setItem("accessToken", data.data.token);
      toast.success("Signup successful!");
      router.push("/");
    } catch (error: any) {
      toast.error(error.message || "Signup failed. Please try again.");
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto bg-card py-10 px-14 border">
      <Form {...form}>
        <h1 className="text-3xl font-bold text-center mb-1">Sign up to AGN</h1>
        <p className="text-center text-sm text-muted-foreground mb-3">
          Already have an account?{" "}
          <Link href={"/login"} className="text-primary underline">
            Log In
          </Link>
        </p>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full pt-10 pb-2"
        >
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    className="shadow-none"
                    placeholder="John"
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
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    className="shadow-none"
                    placeholder="Doe"
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="shadow-none"
                    placeholder="abc@example.com"
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    className="shadow-none"
                    placeholder="**********"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    className="shadow-none"
                    placeholder="**********"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={form.formState.isSubmitting}
            className="w-full"
            type="submit"
          >
            {form.formState.isSubmitting ? "Signing up..." : "Sign Up"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

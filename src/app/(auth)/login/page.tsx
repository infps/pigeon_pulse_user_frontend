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
import { useLogin } from "@/lib/api/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
const formSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z
    .string()
});

export default function page() {
  const router = useRouter();
  const { mutateAsync: login } = useLogin();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (!login) return;
      const { data } = await login(values);
      localStorage.setItem("accessToken", data.data.token);
      toast.success("Login successful!");
      router.push("/");
    } catch (error: any) {
      toast.error(error.message || "Login failed. Please try again.");
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto bg-card py-10 px-14 border">
      <Form {...form}>
        <h1 className="text-3xl font-bold text-center mb-1">Log in to AGN</h1>
        <p className="text-center text-sm text-muted-foreground mb-3">
          Don't have an account?{" "}
          <Link href={"/signup"} className="text-primary underline">
            Sign Up
          </Link>
        </p>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full pt-10 pb-2"
        >
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

          <Button
            disabled={form.formState.isSubmitting}
            className="w-full"
            type="submit"
          >
            {form.formState.isSubmitting ? "Logging in..." : "Log In"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

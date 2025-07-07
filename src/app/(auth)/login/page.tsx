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
import { PasswordInput } from "@/components/ui/password-input";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { signIn, signUp } from "@/lib/auth-client";

const formSchema = z.object({
  email: z.string(),
  password: z.string(),
  privacyPolicy: z.boolean().refine((val) => val === true, {
    message: "You must accept the privacy policy",
  }),
});

export default function page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      privacyPolicy: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { data, error } = await signIn.email({
        email: values.email,
        password: values.password,
        callbackURL: "/",
      });
      if (error) {
        toast.error(error.message || "Failed to log in. Please try again.");
      }
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto bg-white py-10 px-14 border shadow-2xl">
      <Form {...form}>
        <h1 className="text-3xl font-bold text-center mb-1">Log In to AGN</h1>
        <p className="text-center text-sm text-muted-foreground mb-3">
          Don't have an account?{" "}
          <Link href={"/signup"} className="text-primary underline">
            Signup
          </Link>
        </p>
        <form onSubmit={form.handleSubmit(onSubmit)} className="py-10 w-full">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="border px-4 py-3">
                <FormLabel>Email</FormLabel>
                <FormControl className="border-none shadow-none focus-within:border-none focus-within:shadow-none p-0">
                  <Input
                    className="border-none shadow-none focus-within:border-none focus-within:shadow-none focus-visible:border-none focus-visible:shadow-none focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-offset-0 focus-visible:ring-transparent dark:bg-input/30 dark:placeholder:text-muted-foreground/80 dark:text-muted-foreground/80 dark:focus-within:border-none dark:focus-within:shadow-none dark:focus-visible:border-none dark:focus-visible:shadow-none"
                    placeholder="john@example"
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
              <FormItem className="border px-4 py-3">
                <FormLabel>Password</FormLabel>
                <FormControl className="border-none shadow-none focus-within:border-none focus-within:shadow-none p-0">
                  <PasswordInput
                    className="border-none shadow-none focus-within:border-none focus-within:shadow-none focus-visible:border-none focus-visible:shadow-none focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-offset-0 focus-visible:ring-transparent dark:bg-input/30 dark:placeholder:text-muted-foreground/80 dark:text-muted-foreground/80 dark:focus-within:border-none dark:focus-within:shadow-none dark:focus-visible:border-none dark:focus-visible:shadow-none"
                    placeholder="********"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="privacyPolicy"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start py-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-[11px] font-normal">
                    I agree to the Terms of Service and Privacy Policy
                  </FormLabel>

                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <Button className="h-14 w-full rounded-none" type="submit">
            LOGIN
          </Button>
        </form>
      </Form>
      <p className="text-center text-sm text-muted-foreground">OR</p>
      <div className="flex items-center justify-center space-x-10">
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="32"
            height="32"
            viewBox="0 0 48 48"
          >
            <path
              fill="#FFC107"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
            <path
              fill="#FF3D00"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            ></path>
            <path
              fill="#4CAF50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            ></path>
            <path
              fill="#1976D2"
              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
          </svg>
        </button>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="32"
            height="32"
            viewBox="0 0 48 48"
          >
            <path
              fill="#039be5"
              d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"
            ></path>
            <path
              fill="#fff"
              d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}

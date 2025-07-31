"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormField, FormMessage } from "@/components/ui/form";
import Link from "next/link";
import { CircleIcon } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { account, ID } from "../appwrite";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  fullname: z.string().min(2).max(50),
  email: z.string().email("Invalid email address").max(100),
  password: z.string().min(2).max(50),
  confirmPassword: z.string().min(2).max(50),
});

export default function SignupPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      fullname: "",
      password: "",
      confirmPassword: "",
    },
  });
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await account.create(
        ID.unique(),
        values.email,
        values.password,
        values.fullname,
      );
      await account.createEmailPasswordSession(values.email, values.password);
      router.push("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        form.setError("root", { message: error.message });
      } else {
        form.setError("root", { message: "An unexpected error occurred" });
      }
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-950 via-indigo-950 to-purple-950 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2">
            <CircleIcon className="h-8 w-8 text-blue-500" />
            <span className="text-2xl font-bold text-white">100Devs</span>
          </Link>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card className="border-gray-800 bg-gray-900">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-white">
                  Create an account
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Enter your information to get started with LearnCircle
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <FormMessage className="text-red-500 mb-4">
                  {form.formState.errors.root?.message}
                </FormMessage>
                <FormField
                  control={form.control}
                  name="fullname"
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Label htmlFor="full-name" className="text-white">
                        Full name
                      </Label>
                      <Input
                        id="full-name"
                        placeholder="John Doe"
                        {...field}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">
                        Email
                      </Label>
                      <Input
                        id="email"
                        placeholder="name@example.com"
                        {...field}
                        type="email"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-white">
                        Password
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        {...field}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password" className="text-white">
                        Confirm password
                      </Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        {...field}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                  )}
                />
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" required />
                  <Label htmlFor="terms" className="text-sm text-gray-400">
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="text-blue-400 hover:text-blue-300"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="text-blue-400 hover:text-blue-300"
                    >
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button
                  className={cn([
                    "w-full bg-blue-600 hover:bg-blue-700 text-white",
                    form.formState.isSubmitting &&
                      "opacity-50 cursor-not-allowed",
                  ])}
                >
                  {form.formState.isSubmitting ? "Submitting..." : "Sign up"}
                </Button>
                <div className="text-center text-sm text-gray-400">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    Log in
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  );
}

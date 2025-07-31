"use client";

import { useState } from "react";
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
import { Form, FormField, FormMessage } from "@/components/ui/form";
import Link from "next/link";
import { CircleIcon } from "lucide-react";
import { account } from "../appwrite";
import type { Models } from "appwrite";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email("Invalid email address").max(100),
  password: z.string().min(2).max(50),
});

const LogoutForm = () => {
  const logoutForm = useForm();
  const router = useRouter();

  const onLogoutSubmit = async () => {
    console.log("Logging out...");
    try {
      await account.deleteSession("current");
      router.push("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        logoutForm.setError("root", { message: err.message });
      } else {
        logoutForm.setError("root", { message: "Logout failed" });
      }
    }
  };

  return (
    <Form {...logoutForm}>
      <form onSubmit={logoutForm.handleSubmit(onLogoutSubmit)}>
        <Button
          className="w-full bg-red-600 hover:bg-red-700 text-white"
          type="submit"
        >
          {logoutForm.formState.isSubmitting ? "Logging out..." : "Logout"}
        </Button>
        <FormMessage className="text-red-500 mb-4">
          {logoutForm.formState.errors.root?.message}
        </FormMessage>
      </form>
    </Form>
  );
};

export default function LoginPage() {
  const [loggedInUser, setLoggedInUser] =
    useState<Models.User<Models.Preferences> | null>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onLoginSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const session = await account.createEmailPasswordSession(
        data.email,
        data.password,
      );
      console.log("Session created:", session);
      const user = await account.get();
      setLoggedInUser(user);
      router.push("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        form.setError("root", { message: err.message });
      } else {
        form.setError("root", { message: "Login failed" });
      }
    }
  };

  if (loggedInUser) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-950 via-indigo-950 to-purple-950 p-4">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-8">
            <Link href="/" className="flex items-center gap-2">
              <CircleIcon className="h-8 w-8 text-blue-500" />
              <span className="text-2xl font-bold text-white">100Devs</span>
            </Link>
          </div>
          <Card className="border-gray-800 bg-gray-900">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-white">
                Welcome!
              </CardTitle>
              <CardDescription className="text-gray-400">
                Logged in as{" "}
                <span className="font-semibold">{loggedInUser.name}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LogoutForm />
            </CardContent>
          </Card>
        </div>
      </div>
    );
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
          <form onSubmit={form.handleSubmit(onLoginSubmit)}>
            <Card className="border-gray-800 bg-gray-900">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-white">
                  Log in to your account
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Enter your email and password to access your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormMessage className="text-red-500 mb-4">
                  {form.formState.errors.root?.message}
                </FormMessage>
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
                        className="bg-gray-800 border-gray-700 text-white"
                        autoComplete="email"
                      />
                    </div>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password" className="text-white">
                          Password
                        </Label>
                        <Link
                          href="/forgot-password"
                          className="text-sm text-blue-400 hover:text-blue-300"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        {...field}
                        className="bg-gray-800 border-gray-700 text-white"
                        autoComplete="current-password"
                      />
                    </div>
                  )}
                />
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  type="submit"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? "Signing in..." : "Log in"}
                </Button>
                <div className="text-center text-sm text-gray-400">
                  Don't have an account?{" "}
                  <Link
                    href="/signup"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    Sign up
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

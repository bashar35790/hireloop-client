"use client";

import React, { useState } from "react";
import {
    Envelope,
    LockOpen,
    CircleCheckFill,
    TriangleExclamationFill,
    ArrowRight
} from "@gravity-ui/icons";
import {
    Button,
    FieldError,
    Form,
    Input,
    Label,
    TextField
} from "@heroui/react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const router = useRouter();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage(null);
        setSuccessMessage(null);

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            // Better Auth sign in client method execution
            const { data, error } = await authClient.signIn.email({
                email,
                password,
                callbackURL: "/" // Un-comment and change to redirect after success
            });

            if (error) {
                setErrorMessage(error.message || "Invalid email or password.");
                return;
            }

            setSuccessMessage("Logged in successfully! Redirecting...");

        } catch (err: unknown) {
            setErrorMessage(
                err instanceof Error
                    ? err.message
                    : (err as { message?: string })?.message || "An unexpected error occurred."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-[#09090b] p-4 antialiased text-white">
            {/* Container matching Sign Up theme */}
            <div className="w-full max-w-[440px] rounded-2xl border border-zinc-800 bg-[#121214] p-6 shadow-2xl md:p-8">

                {/* Header Section */}
                <div className="mb-6 flex items-center justify-between border-b border-zinc-800 pb-4">
                    <div>
                        <h1 className="text-xl font-semibold tracking-tight text-zinc-100">Welcome Back</h1>
                        <p className="mt-1 text-xs text-zinc-400">Enter your details to access your account.</p>
                    </div>
                    <Link
                        href="/auth/signup"
                        className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
                    >
                        <span className="text-xs font-medium">Sign Up</span>
                    </Link>
                </div>

                {/* Global Alert Banners */}
                {errorMessage && (
                    <div className="mb-5 flex items-center gap-3 rounded-xl bg-red-950/40 border border-red-900/50 p-3 text-sm text-red-400">
                        <TriangleExclamationFill className="size-4 shrink-0" />
                        <p>{errorMessage}</p>
                    </div>
                )}

                {successMessage && (
                    <div className="mb-5 flex items-center gap-3 rounded-xl bg-emerald-950/40 border border-emerald-900/50 p-3 text-sm text-emerald-400">
                        <CircleCheckFill className="size-4 shrink-0" />
                        <p>{successMessage}</p>
                    </div>
                )}

                {/* Form Elements */}
                <Form className="flex flex-col gap-5" onSubmit={onSubmit}>

                    {/* Email Field Element */}
                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        validate={(value) => {
                            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                return "Please enter a valid email address";
                            }
                            return null;
                        }}
                    >
                        <Label className="text-zinc-300 text-xs font-medium mb-1.5 block">Email Address</Label>
                        <div className="relative flex items-center">
                            <Envelope className="absolute left-3 size-4 text-zinc-500" />
                            <Input
                                placeholder="john@example.com"
                                className="w-full rounded-xl bg-[#1a1a1e] border border-zinc-800 py-2 pl-9 pr-3 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700 transition"
                            />
                        </div>
                        <FieldError className="text-xs text-red-400 mt-1" />
                    </TextField>

                    {/* Password Field Element */}
                    <TextField isRequired name="password" type="password">
                        <div className="flex items-center justify-between mb-1.5">
                            <Label className="text-zinc-300 text-xs font-medium block">Password</Label>
                            <Link
                                href="/auth/forgot-password"
                                className="text-xs text-zinc-400 hover:text-white transition-colors"
                            >
                                Forgot password?
                            </Link>
                        </div>
                        <div className="relative flex items-center">
                            <LockOpen className="absolute left-3 size-4 text-zinc-500" />
                            <Input
                                placeholder="••••••••"
                                className="w-full rounded-xl bg-[#1a1a1e] border border-zinc-800 py-2 pl-9 pr-3 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700 transition"
                            />
                        </div>
                        <FieldError className="text-xs text-red-400 mt-1" />
                    </TextField>

                    {/* Action Footer Buttons */}
                    <div className="mt-2 flex items-center justify-end gap-3 border-t border-zinc-800 pt-5">
                        <Button
                            type="submit"
                            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-zinc-200 transition disabled:opacity-50"
                            isDisabled={loading}
                        >
                            {loading ? "Signing In..." : "Sign In"}
                            {!loading && <ArrowRight className="size-4" />}
                        </Button>
                    </div>
                </Form>

            </div>
        </div>
    );
}

"use client";

import React, { useState } from "react";
import {
    Person,
    Envelope,
    LockOpen,
    CloudArrowUpIn,
    ChevronsExpandVertical,
    CircleCheckFill,
    TriangleExclamationFill
} from "@gravity-ui/icons";
import {
    Button,
    Description,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
    Select,
    ListBox
} from "@heroui/react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";


async function uploadProfileImage(file: File): Promise<string> {
    const res = await fetch("/api/cloudinary/signature", { method: "POST" });
    if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Failed to prepare image upload");
    }

    const { cloudName, apiKey, signature, timestamp, folder } = await res.json();

    const body = new FormData();
    body.append("file", file);
    body.append("api_key", apiKey);
    body.append("timestamp", timestamp);
    body.append("signature", signature);
    body.append("folder", folder);

    const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: "POST", body }
    );

    if (!uploadRes.ok) {
        throw new Error("Failed to upload profile image");
    }

    const data = await uploadRes.json();
    return data.secure_url as string;
}

export default function SignUpPage() {
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const router = useRouter();

    // File Upload Preview Handler
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setErrorMessage("Image size should be less than 5MB");
                return;
            }
            if (!file.type.startsWith("image/")) {
                setErrorMessage("Please select a valid image file");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage(null);
        setSuccessMessage(null);

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const role = formData.get("role") as string;
        const imageFile = formData.get("image") as File;

        try {
            let imageUrl = "";
            if (imageFile && imageFile.size > 0) {
                setUploading(true);
                imageUrl = await uploadProfileImage(imageFile);
            }

            // Better Auth sign up client method execution
            const { error } = await authClient.signUp.email({
                email,
                password,
                name,
                image: imageUrl,
                // @ts-expect-error - role is a custom field passed to the schema profile
                role: role || "seeker", // passing custom fields via schema profiles
            });

            if (error) {
                setErrorMessage(error.message || "Something went wrong during sign up.");
                return;
            }

            // Dummy Simulation for demonstration
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setSuccessMessage("Account registered successfully! Welcome aboard.");
            await new Promise((resolve) => setTimeout(resolve, 1200));
            router.push("/auth/login");

        } catch (err: unknown) {
            setErrorMessage(err instanceof Error ? err.message : (err as { message?: string })?.message || "An unexpected error occurred.");
        } finally {
            setUploading(false);
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-[#09090b] p-4 antialiased text-white">
            {/* Container matching image container theme */}
            <div className="w-full max-w-[520px] rounded-2xl border border-zinc-800 bg-[#121214] p-6 shadow-2xl md:p-8">

                {/* Header styling matching the screenshot reference */}
                <div className="mb-6 flex items-center justify-between border-b border-zinc-800 pb-4">
                    <div>
                        <h1 className="text-xl font-semibold tracking-tight text-zinc-100">Create New Account</h1>
                        <p className="mt-1 text-xs text-zinc-400">Enter your credentials to get started on HireLoop.</p>
                    </div>
                    <Link
                        href="/auth/login"
                        className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
                    >
                        <span className="text-xs font-medium">Sign In</span>
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

                {/* Dynamic Form Setup using HeroUI Form & Input layouts */}
                <Form className="flex flex-col gap-5" onSubmit={onSubmit}>

                    {/* Two column grid layout layout setup for main information properties */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                        {/* Full Name field element */}
                        <TextField isRequired name="name" type="text">
                            <Label className="text-zinc-300 text-xs font-medium mb-1.5 block">Full Name</Label>
                            <div className="relative flex items-center">
                                <Person className="absolute left-3 size-4 text-zinc-500" />
                                <Input
                                    placeholder="e.g. John Doe"
                                    className="w-full rounded-xl bg-[#1a1a1e] border border-zinc-800 py-2 pl-9 pr-3 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700 transition"
                                />
                            </div>
                            <FieldError className="text-xs text-red-400 mt-1" />
                        </TextField>

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
                    </div>

                    {/* Password element fields built matching validation standards */}
                    <TextField
                        isRequired
                        minLength={8}
                        name="password"
                        type="password"
                        validate={(value) => {
                            if (value.length < 8) return "Password must be at least 8 characters";
                            if (!/[A-Z]/.test(value)) return "Password must contain an uppercase letter";
                            if (!/[0-9]/.test(value)) return "Password must contain a number";
                            return null;
                        }}
                    >
                        <Label className="text-zinc-300 text-xs font-medium mb-1.5 block">Password</Label>
                        <div className="relative flex items-center">
                            <LockOpen className="absolute left-3 size-4 text-zinc-500" />
                            <Input
                                placeholder="••••••••"
                                className="w-full rounded-xl bg-[#1a1a1e] border border-zinc-800 py-2 pl-9 pr-3 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700 transition"
                            />
                        </div>
                        <Description className="text-[11px] text-zinc-500 mt-1.5 block">
                            Must be at least 8 characters with 1 uppercase and 1 number
                        </Description>
                        <FieldError className="text-xs text-red-400 mt-1" />
                    </TextField>

                    {/* Role Choice Section mapping custom elements */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 items-start">

                        <Select name="role" className="w-full" placeholder="Select a role" defaultValue="candidate">
                            <Label className="text-zinc-300 text-xs font-medium mb-1.5 block">Account Role</Label>
                            <Select.Trigger className="w-full flex items-center justify-between rounded-xl bg-[#1a1a1e] border border-zinc-800 px-3 py-2 text-sm text-zinc-300 focus:outline-none transition">
                                <Select.Value />
                                <Select.Indicator className="size-3 text-zinc-500">
                                    <ChevronsExpandVertical />
                                </Select.Indicator>
                            </Select.Trigger>
                            <Select.Popover className="bg-[#121214] border border-zinc-800 rounded-xl shadow-xl mt-1 overflow-hidden">
                                <ListBox className="p-1 text-zinc-300 text-sm">
                                    <ListBox.Item id="candidate" textValue="Candidate" className="p-2 hover:bg-zinc-800 rounded-lg cursor-pointer">
                                        seeker
                                    </ListBox.Item>
                                    <ListBox.Item id="employer" textValue="Employer" className="p-2 hover:bg-zinc-800 rounded-lg cursor-pointer">
                                        recruiter
                                    </ListBox.Item>
                                </ListBox>
                            </Select.Popover>
                        </Select>

                        {/* Profile Picture Image Dropzone Element matched closely with uploaded design spec */}
                        <div>
                            <label className="text-zinc-300 text-xs font-medium mb-1.5 block">Profile Image</label>
                            <div className="flex items-center gap-3">
                                <label className="flex h-[42px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-zinc-700 bg-[#1a1a1e] px-3 text-xs text-zinc-400 transition hover:border-zinc-600 hover:bg-zinc-800/50">
                                    <CloudArrowUpIn className="size-4 text-zinc-500" />
                                    <span>PNG, JPG up to 5MB</span>
                                    <input
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageChange}
                                    />
                                </label>
                                {imagePreview && (
                                    <div className="h-[42px] w-[42px] shrink-0 rounded-xl border border-zinc-700 overflow-hidden bg-zinc-800">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Action Footer Buttons mirroring visual weights seen in reference */}
                    <div className="mt-4 flex items-center justify-end gap-3 border-t border-zinc-800 pt-5">
                        <Button
                            type="reset"
                            variant="secondary"
                            className="rounded-xl border border-zinc-800 bg-transparent px-4 py-2 text-sm font-medium text-zinc-400 hover:bg-zinc-900 hover:text-white transition"
                            onClick={() => setImagePreview(null)}
                        >
                            Reset
                        </Button>
                        <Button
                            type="submit"
                            className="rounded-xl bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-zinc-200 transition disabled:opacity-50"
                            isDisabled={loading}
                        >
                            {uploading ? "Uploading..." : loading ? "Creating..." : "Register Account"}
                        </Button>
                    </div>
                </Form>

            </div>
        </div>
    );
}

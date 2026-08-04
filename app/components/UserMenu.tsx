"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Person, SquareChartBar, ArrowRightFromSquare } from "@gravity-ui/icons";
import { authClient, useSession } from "@/lib/auth-client";

function getInitials(name?: string | null): string {
  if (!name) return "U";
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function UserMenu() {
  const { data, isPending } = useSession();
  const router = useRouter();

  const user = data?.user;

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => router.push("/"),
      },
    });
  };

  if (isPending) {
    return (
      <>
        <div className="hidden h-9 w-24 animate-pulse rounded-full bg-slate-800/60 md:block" aria-hidden="true" />
        <div className="h-9 w-full animate-pulse rounded-xl bg-slate-800/60 md:hidden" aria-hidden="true" />
      </>
    );
  }

  if (!user) {
    return (
      <>
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/auth/login"
            className="text-sm font-medium text-slate-200 transition hover:text-white"
          >
            Sign In
          </Link>
          <Link
            href="/auth/signup"
            className="inline-flex items-center rounded-full bg-linear-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:opacity-95"
          >
            Get Started
          </Link>
        </div>

        <div className="flex flex-col gap-3 md:hidden">
          <Link
            href="/auth/login"
            className="flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:text-white"
          >
            Sign In
          </Link>
          <Link
            href="/auth/signup"
            className="flex items-center justify-center rounded-full bg-linear-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:opacity-95"
          >
            Get Started
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="group relative hidden md:block">
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border-2 border-slate-700 bg-slate-800 text-sm font-semibold text-white transition hover:ring-2 hover:ring-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
          aria-haspopup="menu"
          aria-expanded="false"
        >
          {user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.image} alt={user.name ?? "User avatar"} className="h-full w-full object-cover" />
          ) : (
            <span>{getInitials(user.name)}</span>
          )}
        </button>

        <div className="invisible absolute right-0 top-full z-50 pt-3 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
          <div className="w-60 rounded-xl border border-slate-800 bg-slate-950/95 p-2 shadow-2xl shadow-black/50 backdrop-blur-xl" role="menu">
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-800 text-xs font-semibold text-white">
                {user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={user.image} alt="" className="h-full w-full object-cover" />
                ) : (
                  <span>{getInitials(user.name)}</span>
                )}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">{user.name}</p>
                <p className="truncate text-xs text-slate-400">{user.email}</p>
              </div>
            </div>

            <div className="my-2 h-px bg-slate-800" />

            <Link
              href="/dashboard"
              role="menuitem"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
            >
              <SquareChartBar className="size-4 shrink-0 text-slate-400" />
              Dashboard
            </Link>
            <Link
              href="/profile"
              role="menuitem"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
            >
              <Person className="size-4 shrink-0 text-slate-400" />
              Profile
            </Link>

            <div className="my-2 h-px bg-slate-800" />

            <button
              type="button"
              role="menuitem"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
            >
              <ArrowRightFromSquare className="size-4 shrink-0" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 p-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-800 text-sm font-semibold text-white">
            {user.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.image} alt="" className="h-full w-full object-cover" />
            ) : (
              <span>{getInitials(user.name)}</span>
            )}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">{user.name}</p>
            <p className="truncate text-xs text-slate-400">{user.email}</p>
          </div>
        </div>

        <div className="mt-3 flex flex-col gap-1">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-300 transition hover:bg-slate-900 hover:text-white"
          >
            <SquareChartBar className="size-4 shrink-0 text-slate-400" />
            Dashboard
          </Link>
          <Link
            href="/profile"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-300 transition hover:bg-slate-900 hover:text-white"
          >
            <Person className="size-4 shrink-0 text-slate-400" />
            Profile
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
          >
            <ArrowRightFromSquare className="size-4 shrink-0" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import LoadingDots from "@/app/[lang]/components/LoadingDots";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Box } from "@mui/material";

export default function Form() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <Box
      padding={{
        xs: 2,
        md: 8,
      }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
          signIn("credentials", {
            redirect: false,
            email: e.currentTarget.email.value,
            password: e.currentTarget.password.value,
            // @ts-ignore
          }).then(({ error }) => {
            if (error) {
              setLoading(false);
              toast.error(error);
            } else {
              router.refresh();
            }
          });
        }}
        className="flex flex-col space-y-4 py-4 px-4"
      >
        <div>
          <label
            htmlFor="email"
            className="block text-xs text-gray-600 uppercase"
          >
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="panic@thedis.co"
            autoComplete="email"
            required
            className="mt-1 block w-full appearance-none  border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-xs text-gray-600 uppercase"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
          />
        </div>
        <button
          disabled={loading}
          className={`${
            loading
              ? "cursor-not-allowed border-gray-200 bg-gray-100"
              : "border-black bg-black text-white hover:bg-white hover:text-black"
          } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
        >
          {loading ? <LoadingDots /> : <p>Sign In</p>}
        </button>
      </form>
    </Box>
  );
}

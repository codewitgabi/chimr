"use client";

import useAppStore from "@/utils/store";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";

interface ProductSearchFormProps {
  className?: string;
}

function ProductSearchForm({ className = "" }: ProductSearchFormProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const { setContactSearchQuery } = useAppStore((state) => state);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;

    const params = new URLSearchParams(searchParams);

    if (query) {
      params.set("product", query);
    } else {
      params.delete("product");
    }

    setContactSearchQuery(query);

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div
      className={twMerge(
        "bg-secondary rounded-lg w-full flex items-center gap-2 px-4 py-3",
        className
      )}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className=""
      >
        <path
          d="M7.88146 13.6134C11.0471 13.6134 13.6134 11.0471 13.6134 7.88146C13.6134 4.71578 11.0471 2.14949 7.88146 2.14949C4.71578 2.14949 2.14949 4.71578 2.14949 7.88146C2.14949 11.0471 4.71578 13.6134 7.88146 13.6134Z"
          stroke="var(--foreground)"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.0464 15.0464L11.9297 11.9297"
          stroke="var(--foreground)"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <input
        type="text"
        name="search"
        className="w-full outline-none border-none text-foreground placeholder:text-foreground placeholder:opacity-65 text-sm"
        id="chat-search-input"
        placeholder="Search products by name..."
        onChange={handleChange}
        defaultValue={searchParams.get("query")?.toString()}
      />
    </div>
  );
}

export default ProductSearchForm;

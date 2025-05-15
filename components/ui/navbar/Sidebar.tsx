"use client";

import Link from "next/link";
import LogoutButton from "@/components/ui/buttons/Logout";
import AppLogo from "../AppLogo";
import { usePathname } from "next/navigation";

function Sidebar() {
  const pathname = usePathname();

  console.log({ pathname });

  return (
    <aside className="w-[200px] h-full bg-secondary flex flex-col shrink-0 justify-between gap-12 overflow-y-auto max-[965px]:hidden">
      <div>
        {/* App Logo */}

        <div className="p-4">
          <AppLogo />
        </div>

        <div className="mt-4">
          {/* Dashboard link */}

          <Link
            href="/dashboard"
            className={`flex items-center gap-4 py-2 px-4 hover:bg-hover-effect transition-all duration-300 ${
              pathname.includes("/dashboard")
                ? "border-l-4 border-blue-500"
                : ""
            }`}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.66667 2.58773H2V8.58773H6.66667V2.58773Z"
                stroke="var(--light-black-dark-blue)"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 2.58773H9.33334V5.92106H14V2.58773Z"
                stroke="var(--light-black-dark-blue)"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 8.58773H9.33334V14.5877H14V8.58773Z"
                stroke="var(--light-black-dark-blue)"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.66667 11.2544H2V14.5877H6.66667V11.2544Z"
                stroke="var(--light-black-dark-blue)"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span className="text-sm text-light-black-dark-blue">
              Dashboard
            </span>
          </Link>

          {/* Product link */}

          <Link
            href="/products"
            className={`flex items-center gap-4 py-2 px-4 hover:bg-hover-effect transition-all duration-300 ${
              pathname.includes("/products") ? "border-l-4 border-blue-500" : ""
            }`}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.66668 9.4503H9.33334M13.3333 6.78364V12.7836C13.3333 13.1373 13.1929 13.4764 12.9428 13.7264C12.6928 13.9765 12.3536 14.117 12 14.117H4.00001C3.64639 14.117 3.30725 13.9765 3.0572 13.7264C2.80715 13.4764 2.66668 13.1373 2.66668 12.7836V6.78364H13.3333ZM13.3333 3.4503H2.66668C2.31305 3.4503 1.97392 3.59078 1.72387 3.84083C1.47382 4.09087 1.33334 4.43001 1.33334 4.78364V5.4503C1.33334 5.80392 1.47382 6.14306 1.72387 6.39311C1.97392 6.64316 2.31305 6.78364 2.66668 6.78364H13.3333C13.687 6.78364 14.0261 6.64316 14.2762 6.39311C14.5262 6.14306 14.6667 5.80392 14.6667 5.4503V4.78364C14.6667 4.43001 14.5262 4.09087 14.2762 3.84083C14.0261 3.59078 13.687 3.4503 13.3333 3.4503V3.4503Z"
                stroke="var(--light-black-dark-blue)"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span className="text-sm text-light-black-dark-blue">Product</span>
          </Link>

          {/* Order link */}

          <Link
            href=""
            className={`flex items-center gap-4 py-2 px-4 hover:bg-hover-effect transition-all duration-300 ${
              pathname.includes("/order") ? "border-l-4 border-blue-500" : ""
            }`}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.66666 4.97955H14"
                stroke="var(--light-black-dark-blue)"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.66666 8.97955H14"
                stroke="var(--light-black-dark-blue)"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.66666 12.9795H14"
                stroke="var(--light-black-dark-blue)"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2.66666 4.97955H3.33332V7.64621"
                stroke="var(--light-black-dark-blue)"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2.66666 7.64621H3.99999"
                stroke="var(--light-black-dark-blue)"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3.99999 12.9795H2.66666C2.66666 12.3129 3.99999 11.6462 3.99999 10.9795C3.99999 10.3129 3.33332 9.97954 2.66666 10.3129"
                stroke="var(--light-black-dark-blue)"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span className="text-sm text-light-black-dark-blue">Order</span>
          </Link>

          {/* Chat link */}

          <Link
            href="/"
            className={`flex items-center gap-4 py-2 px-4 hover:bg-hover-effect transition-all duration-300 ${
              pathname === "/" ? "border-l-4 border-blue-500" : ""
            }`}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 7.84212C14.0023 8.72203 13.7967 9.59005 13.4 10.3755C12.9296 11.3166 12.2065 12.1082 11.3116 12.6616C10.4168 13.215 9.3855 13.5084 8.33333 13.5088C7.45342 13.5111 6.58541 13.3055 5.8 12.9088L2 14.1755L3.26667 10.3755C2.86995 9.59005 2.66437 8.72203 2.66667 7.84212C2.66707 6.78996 2.96041 5.75869 3.51381 4.86382C4.06722 3.96895 4.85884 3.24583 5.8 2.77546C6.58541 2.37874 7.45342 2.17316 8.33333 2.17546H8.66667C10.0562 2.25212 11.3687 2.83863 12.3528 3.82269C13.3368 4.80676 13.9233 6.11922 14 7.50879V7.84212Z"
                stroke="var(--light-black-dark-blue)"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span className="flex items-center justify-between w-full">
              <span className="text-sm text-light-black-dark-blue">Chat</span>
              <span className="text-xs bg-red w-4 h-4 flex items-center justify-center pt-[3px] text-white rounded-full">
                9+
              </span>
            </span>
          </Link>

          {/* Document link */}

          <Link
            href=""
            className={`flex items-center gap-4 py-2 px-4 hover:bg-hover-effect transition-all duration-300 ${
              pathname.includes("/documents")
                ? "border-l-4 border-blue-500"
                : ""
            }`}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.66666 1.70469H3.99999C3.64637 1.70469 3.30723 1.84517 3.05718 2.09522C2.80713 2.34527 2.66666 2.6844 2.66666 3.03803V13.7047C2.66666 14.0583 2.80713 14.3975 3.05718 14.6475C3.30723 14.8976 3.64637 15.038 3.99999 15.038H12C12.3536 15.038 12.6927 14.8976 12.9428 14.6475C13.1928 14.3975 13.3333 14.0583 13.3333 13.7047V5.37136L9.66666 1.70469Z"
                stroke="var(--light-black-dark-blue)"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.33334 1.70469V5.70469H13.3333"
                stroke="var(--light-black-dark-blue)"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10.6667 9.03802H5.33334"
                stroke="var(--light-black-dark-blue)"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10.6667 11.7047H5.33334"
                stroke="var(--light-black-dark-blue)"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.66668 6.37136H5.33334"
                stroke="var(--light-black-dark-blue)"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span className="text-sm text-light-black-dark-blue">Document</span>
          </Link>

          {/* Settings link */}

          <Link
            href=""
            className={`flex items-center gap-4 py-2 px-4 hover:bg-hover-effect transition-all duration-300 ${
              pathname.includes("/accounts") ? "border-l-4 border-blue-500" : ""
            }`}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.14667 1.90059H7.85333C7.49971 1.90059 7.16057 2.04106 6.91053 2.29111C6.66048 2.54116 6.52 2.8803 6.52 3.23392V3.35392C6.51976 3.58774 6.45804 3.81738 6.34103 4.01981C6.22401 4.22225 6.05583 4.39035 5.85333 4.50726L5.56667 4.67392C5.36398 4.79095 5.13405 4.85256 4.9 4.85256C4.66595 4.85256 4.43603 4.79095 4.23333 4.67392L4.13333 4.62059C3.82738 4.4441 3.46389 4.39622 3.12267 4.48746C2.78145 4.5787 2.49037 4.80161 2.31333 5.10726L2.16667 5.36059C1.99018 5.66655 1.9423 6.03003 2.03354 6.37125C2.12478 6.71248 2.34769 7.00355 2.65333 7.18059L2.75333 7.24726C2.95485 7.3636 3.12241 7.53065 3.23937 7.73181C3.35632 7.93297 3.4186 8.16124 3.42 8.39392V8.73392C3.42093 8.96887 3.35977 9.19989 3.2427 9.40359C3.12563 9.6073 2.95681 9.77645 2.75333 9.89392L2.65333 9.95392C2.34769 10.131 2.12478 10.422 2.03354 10.7633C1.9423 11.1045 1.99018 11.468 2.16667 11.7739L2.31333 12.0273C2.49037 12.3329 2.78145 12.5558 3.12267 12.6471C3.46389 12.7383 3.82738 12.6904 4.13333 12.5139L4.23333 12.4606C4.43603 12.3436 4.66595 12.282 4.9 12.282C5.13405 12.282 5.36398 12.3436 5.56667 12.4606L5.85333 12.6273C6.05583 12.7442 6.22401 12.9123 6.34103 13.1147C6.45804 13.3171 6.51976 13.5468 6.52 13.7806V13.9006C6.52 14.2542 6.66048 14.5933 6.91053 14.8434C7.16057 15.0934 7.49971 15.2339 7.85333 15.2339H8.14667C8.50029 15.2339 8.83943 15.0934 9.08948 14.8434C9.33952 14.5933 9.48 14.2542 9.48 13.9006V13.7806C9.48024 13.5468 9.54196 13.3171 9.65898 13.1147C9.77599 12.9123 9.94418 12.7442 10.1467 12.6273L10.4333 12.4606C10.636 12.3436 10.866 12.282 11.1 12.282C11.334 12.282 11.564 12.3436 11.7667 12.4606L11.8667 12.5139C12.1726 12.6904 12.5361 12.7383 12.8773 12.6471C13.2186 12.5558 13.5096 12.3329 13.6867 12.0273L13.8333 11.7673C14.0098 11.4613 14.0577 11.0978 13.9665 10.7566C13.8752 10.4154 13.6523 10.1243 13.3467 9.94726L13.2467 9.89392C13.0432 9.77645 12.8744 9.6073 12.7573 9.40359C12.6402 9.19989 12.5791 8.96887 12.58 8.73392V8.40059C12.5791 8.16564 12.6402 7.93462 12.7573 7.73092C12.8744 7.52721 13.0432 7.35806 13.2467 7.24059L13.3467 7.18059C13.6523 7.00355 13.8752 6.71248 13.9665 6.37125C14.0577 6.03003 14.0098 5.66655 13.8333 5.36059L13.6867 5.10726C13.5096 4.80161 13.2186 4.5787 12.8773 4.48746C12.5361 4.39622 12.1726 4.4441 11.8667 4.62059L11.7667 4.67392C11.564 4.79095 11.334 4.85256 11.1 4.85256C10.866 4.85256 10.636 4.79095 10.4333 4.67392L10.1467 4.50726C9.94418 4.39035 9.77599 4.22225 9.65898 4.01981C9.54196 3.81738 9.48024 3.58774 9.48 3.35392V3.23392C9.48 2.8803 9.33952 2.54116 9.08948 2.29111C8.83943 2.04106 8.50029 1.90059 8.14667 1.90059V1.90059Z"
                stroke="var(--light-black-dark-blue)"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 10.5673C9.10457 10.5673 10 9.67182 10 8.56725C10 7.46268 9.10457 6.56725 8 6.56725C6.89543 6.56725 6 7.46268 6 8.56725C6 9.67182 6.89543 10.5673 8 10.5673Z"
                stroke="var(--light-black-dark-blue)"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span className="text-sm text-light-black-dark-blue">Settings</span>
          </Link>
        </div>
      </div>

      {/* Logout button */}

      <LogoutButton />
    </aside>
  );
}

export default Sidebar;

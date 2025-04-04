import Image from "next/image";
import DefaultAvatar from "@/assets/avatars/avatar-7.png";
import ToggleThemeButton from "../buttons/ToggleTheme";

interface HeaderProps {
  title: string;
}

function Header({ title }: HeaderProps) {
  return (
    <header className="shrink-0">
      <nav className="flex items-center justify-between gap-12">
        <h1 className="font-semibold text-lg">
          {title}
        </h1>

        <div className="flex items-center gap-4">
          <ToggleThemeButton />

          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
              stroke="var(--foreground)"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
              stroke="var(--foreground)"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <Image
            src={DefaultAvatar}
            alt="default-avatar"
            width={40}
            height={40}
          />

          <h1 className="text-sm">
            Leslie Alexander
          </h1>
        </div>
      </nav>
    </header>
  );
}

export default Header;

import { AppLogo } from "@/components/app-logo";
import { ThemeSwitcher } from "@/components/themes/theme-switcher";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React from "react";
import { FaGithub } from "react-icons/fa";
import { RootNavigationBarLinks } from "./root-navigation-links";
import { RootNavigationBarLinkItem } from "./root-navigation-link-item";

export const RootNavigationBar = () => {
  return (
    <nav className="w-full sticky top-0 h-[9vh] flex items-center border-b">
      <div className="w-full max-w-7xl mx-auto flex flex-row justify-between h-full px-8">
        <div className="flex flex-row items-center gap-x-10">
          <AppLogo />
          <div className="flex flex-row items-center gap-x-4 h-full">
            {RootNavigationBarLinks.map((item) => (
              <RootNavigationBarLinkItem item={item} key={item.title} />
            ))}
          </div>
        </div>
        <div className="ml-auto flex flex-row items-center gap-x-2.5">
          <Link
            href={"#"}
            className={buttonVariants({
              size: "icon",
              className: "w-8 h-8",
              variant: "ghost",
            })}
          >
            <FaGithub className="size-5" />
          </Link>
          <Separator className="h-6 w-[1px]" orientation="vertical" />
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
};

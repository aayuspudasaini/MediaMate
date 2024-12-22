"use client";

import Link from "next/link";
import React from "react";
import { iRootNavigationBarLinkProps } from "./root-navigation-links";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type iNavigationLinkItem = React.ComponentProps<"div"> & {
  item: iRootNavigationBarLinkProps;
};

export const RootNavigationBarLinkItem = ({
  item,
  ...props
}: iNavigationLinkItem) => {
  const pathname = usePathname();
  return (
    <div className="relative flex flex-col justify-center h-full" {...props}>
      <Link
        href={item.isActive ? item.url : "#"}
        className={cn("text-sm font-normal text-muted-foreground", {
          "text-primary": pathname === item.url,
        })}
      >
        {item.title}
      </Link>
      <span
        className={cn("h-[1px] w-full bg-transparent absolute bottom-0", {
          "bg-primary": pathname === item.url,
        })}
      />
    </div>
  );
};

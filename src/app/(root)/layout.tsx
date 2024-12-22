import { ScrollArea } from "@/components/ui/scroll-area";
import { RootNavigationBar } from "@/features/root/components/root-navigation-bar";
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-h-screen max-w-screen overflow-hidden">
      <RootNavigationBar />
      <ScrollArea className="h-[calc(100vh-9vh)] scroll-smooth">
        {children}
      </ScrollArea>
    </div>
  );
}

"use client"

import { ResizablePanel, ResizablePanelGroup, ResizableHandle } from "@/components/ui/resizable";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ChatLayoutProps {
    defaultLayout: number[] | undefined;
}

export default function ChatLayout({defaultLayout=[320, 480]}: ChatLayoutProps) {

    const [isMobile, setIsMobile] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

  return (
    <ResizablePanelGroup direction="horizontal" className="h-full items-stretch bg-background rounded-lg" onLayout={(sizes:number[]) => {
        document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`;
    }}>
      <ResizablePanel
        defaultSize={defaultLayout[0]}
        collapsible={true}
        collapsedSize={8}
        minSize={isMobile ? 0 : 24}
        maxSize={isMobile ? 8 : 30}
        onCollapse={() => {
            setIsCollapsed(true);
            document.cookie = `react-resizable-panels:collapsed=true`;
        }}
        onExpand={() => {
            setIsCollapsed(false);
            document.cookie = `react-resizable-panels:collapsed=false`;
        }}
        className={cn(isCollapsed && "min-w-[80px] transition-all duration-300 ease-in-out")}
      >Sidebar</ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>Right</ResizablePanel>
    </ResizablePanelGroup>
  );
}   
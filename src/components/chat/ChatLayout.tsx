"use client"

import { ResizablePanel, ResizablePanelGroup, ResizableHandle } from "@/components/ui/resizable";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Sidebar from '../Sidebar';
import MessageContainer from './MessageContainer';

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
      >
        <Sidebar isCollapsed={isCollapsed} />
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel
        defaultSize={defaultLayout[1]}        
      >
        {/* <div className="flex justify-center items-center h-full w-full px-10">
            <div className="flex flex-col justify-center items-center gap-4">
                <Image src="/images/logo.png" width={650} height={180} alt="logo" className="w-full md:w-2/3 lg:w-1/2" />
                <p className="text-muted-foreground text-center">Click on a chat to view the messages</p>
            </div>
        </div> */}
        <MessageContainer />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}   
"use client"

import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { MoonIcon, SunIcon } from 'lucide-react';
import { memo } from 'react';

function ThemeToggleButton({onToggle}: {onToggle: () => void}){
    const { theme } = useTheme();  
  
    return (
      <Button         
      variant="outline"
      size="icon"
      className="cursor-pointer"
      onClick={onToggle}
      >
     {theme === "light" ? (
        <MoonIcon className="size-[1.2rem] text-muted-foreground" />
      ) : (
        <SunIcon className="size-[1.2rem] text-muted-foreground" />
      )} 
    </Button>     
    )
  }

export const MemoizedThemeToggleButton = memo(ThemeToggleButton);
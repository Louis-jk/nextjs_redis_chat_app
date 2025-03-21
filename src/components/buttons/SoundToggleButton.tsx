import { usePreferences } from '@/store/usePreferences';
import { Button } from '../ui/button';
import { Volume2, VolumeX } from 'lucide-react';
import { memo } from 'react';

function SoundToggleButton({onToggle}: {onToggle: () => void}) {
    const { soundEnabled } = usePreferences();
  
    return (
      <Button variant="outline" size="icon" className="cursor-pointer" onClick={onToggle}>
        {soundEnabled ? (
            <VolumeX className="size-[1.2rem] text-muted-foreground" />
        ) : (
            <Volume2 className="size-[1.2rem] text-muted-foreground" />
        )}
      </Button>
    )
  }

export const MemoizedSoundToggleButton = memo(SoundToggleButton);
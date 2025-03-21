"use client";

import { useTheme } from "next-themes";
import { usePreferences } from "@/store/usePreferences";
import { useSound } from "use-sound";
import { useCallback } from 'react';
import { MemoizedThemeToggleButton } from "@/components/buttons/ThemeToggleButton";
import { MemoizedSoundToggleButton } from "@/components/buttons/SoundToggleButton";

const SOUND_CONFIG = {
  mouseClick: { src: "/sounds/mouse-click.mp3", volume: 1 },
  soundOn: { src: "/sounds/sound-on.mp3", volume: 0.3 },
  soundOff: { src: "/sounds/sound-off.mp3", volume: 0.3 },
}

export default function PreferencesTab() {

  const { theme, setTheme } = useTheme();
  const { soundEnabled, setSoundEnabled } = usePreferences();
  const [ playMouseClick ] = useSound(SOUND_CONFIG.mouseClick.src, SOUND_CONFIG.mouseClick.volume);
  const [ playSoundOn ] = useSound(SOUND_CONFIG.soundOn.src, SOUND_CONFIG.soundOn.volume);
  const [ playSoundOff ] = useSound(SOUND_CONFIG.soundOff.src, SOUND_CONFIG.soundOff.volume);

  const handleThemeToggle = useCallback(() => {
    playMouseClick();
    setTheme(theme === "light" ? "dark" : "light");
  }, [theme, setTheme, playMouseClick]);

  const handleSoundToggle = useCallback(() => {
    setSoundEnabled(!soundEnabled);
      
    if(soundEnabled) {
      playSoundOff() 
    } else {
      playSoundOn();
    }
  }, [soundEnabled, setSoundEnabled, playSoundOff, playSoundOn]);

  return (
    <div className="flex flex-wrap gap-2 px-1 md:px-2">      
      <MemoizedThemeToggleButton onToggle={handleThemeToggle} />
      <MemoizedSoundToggleButton onToggle={handleSoundToggle} />
    </div>
  );
}
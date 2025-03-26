'use client';

import { SmileIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import Picker from '@emoji-mart/react';
import data, { type Skin } from '@emoji-mart/data';
import { useTheme } from 'next-themes';

interface EmojiPickerProps {
    onChange: (emoji: string) => void;
}

const EmojiPicker = ({onChange}: EmojiPickerProps) => {

    const { theme } = useTheme();

    return (
        <Popover>
            <PopoverTrigger>
                <SmileIcon className="cursor-pointer text-muted-foreground transition size-5" />
            </PopoverTrigger>
            <PopoverContent className="w-full">
                <Picker 
                    data={data}                     
                    emojiSize={18} 
                    maxFrequentRows={1} 
                    theme={theme === 'dark' ? 'dark' : 'light'} 
                    onEmojiSelect={(emoji: Skin) => onChange(emoji.native)} />
            </PopoverContent>
        </Popover>
    );
};  

export default EmojiPicker;
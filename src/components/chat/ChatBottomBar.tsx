'use client';

import { Image as ImageIcon, Loader, SendHorizontal, ThumbsUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Textarea } from "../ui/textarea";
import { useState, useRef } from "react";
import EmojiPicker from "./EmojiPicker";
import { Button } from '../ui/button';

const ChatBottomBar = () => {
    const [message, setMessage] = useState('');
    const textAreaRef = useRef<HTMLTextAreaElement>(null);    
    const isPending = false;

	return <div className="p-2 flex justify-between w-full items-center gap-2">
        {!message.trim() && <ImageIcon size={20} className="cursor-pointer text-muted-foreground" />}
        <AnimatePresence>
            <motion.div 
                key="chat-input"
                layout
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1 }}
                transition={{ 
                    opacity: { duration: 0.5 },
                    layout: {
                        type: 'spring',
                        bounce: 0.15,
                    }
                 }}
                className="w-full relative"
            >
                <Textarea
                    ref={textAreaRef}
                    autoComplete="off"
                    placeholder="Aa"
                    rows={1}
                    className="w-full border rounded-full flex items-center h-9 resize-none overflow-hidden bg-background min-h-0"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <div className="absolute right-2 bottom-0.5">
                    <EmojiPicker
                        onChange={(emoji) => {
                            setMessage(message + emoji);
                            textAreaRef.current?.focus();
                        }}
                     />
                </div>
            </motion.div>
            
            {message.trim() ? (
                <Button                    
                    key="send-button"
                    className='size-9 dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0'
                    variant="ghost"
                    size="icon"
                >
                    <SendHorizontal size={20} className="text-muted-foreground" />
                </Button>
            ) : (
                <Button
                    key="thumbs-up-button"
                    className='size-9 dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0'
                    variant="ghost"
                    size="icon"
                >
                    {isPending ? <Loader size={20} className="animate-spin" /> : <ThumbsUp size={20} className="text-muted-foreground" />}
                </Button>
            )}
        </AnimatePresence>
    </div>;
};

export default ChatBottomBar;
'use client';

import { Image as ImageIcon, Loader, SendHorizontal, ThumbsUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Textarea } from "../ui/textarea";
import { useState, useRef } from "react";
import EmojiPicker from "./EmojiPicker";
import { Button } from '../ui/button';
import useSound from 'use-sound';
import { usePreferences } from '@/store/usePreferences';
import { useMutation } from "@tanstack/react-query";
import { sendMessageAction } from "@/actions/message.action";
import { useSelectedUser } from "@/store/useSelectedUser";
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import Image from 'next/image';

const ChatBottomBar = () => {
    const [message, setMessage] = useState('');
    const textAreaRef = useRef<HTMLTextAreaElement>(null);    
    const { soundEnabled } = usePreferences();
    const {selectedUser} = useSelectedUser();
    const [playSound1] = useSound("/sounds/keystroke1.mp3");
    const [playSound2] = useSound("/sounds/keystroke2.mp3");
    const [playSound3] = useSound("/sounds/keystroke3.mp3");
    const [playSound4] = useSound("/sounds/keystroke4.mp3");
    const [imageUrl, setImageUrl] = useState('');

    const playSoundFunctions = [playSound1, playSound2, playSound3, playSound4];

    const playRandomKeyStrokeSound = () => {
        if (soundEnabled) {
            const randomIndex = Math.floor(Math.random() * playSoundFunctions.length);
            playSoundFunctions[randomIndex]();
        }
    }

    const {mutate: sendMessage, isPending} = useMutation({
        mutationFn: sendMessageAction,
    })

    const handleSendMessage = () => {
        if(!message.trim() || !selectedUser) return;        

        sendMessage({
            content: message,
            messageType: "text",
            receiverId: selectedUser.id,
        })
        setMessage('');

        textAreaRef.current?.focus();
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if(e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }

        if(e.key === "Enter" && e.shiftKey) {
            e.preventDefault();
            setMessage(message + "\n");
        }
    }

    const handleThumbsUp = () => {
        if(!selectedUser) return;

        sendMessage({
            content: "👍",
            messageType: "text",
            receiverId: selectedUser.id,
        })
    }

    return <div className="p-2 flex justify-between w-full items-center gap-2">        
        {!message.trim() && (
            <CldUploadWidget 
                signatureEndpoint="/api/sign-cloudinary-params" 
                onSuccess={(result, {widget}) => {
                        setImageUrl((result.info as CloudinaryUploadWidgetInfo).secure_url);
                        widget.close();               
                }}>
            {({ open }) => {
              return (                
                 <ImageIcon size={20} className="cursor-pointer text-muted-foreground" onClick={() => open()} />
              );
            }}
          </CldUploadWidget>
        )}

        <Dialog>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Image Preview</DialogTitle>
                </DialogHeader>
                <Image src={imageUrl} alt="Uploaded Image" width={100} height={100} />
            </DialogContent>
        </Dialog>

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
                    onKeyDown={handleKeyDown}
                    onChange={(e) => {
                        setMessage(e.target.value);
                        playRandomKeyStrokeSound();
                    }}
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
                    className='size-9 dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0 cursor-pointer'
                    variant="ghost"
                    size="icon"
                    onClick={handleSendMessage}
                >
                    <SendHorizontal size={20} className="text-muted-foreground" />
                </Button>
            ) : (
                <Button
                    key="thumbs-up-button"
                    className='size-9 dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0 cursor-pointer'
                    variant="ghost"
                    size="icon"
                    onClick={!isPending ? handleThumbsUp : undefined}
                >
                    {isPending ? <Loader size={20} className="animate-spin" /> : <ThumbsUp size={20} className="text-muted-foreground" />}
                </Button>
            )}
        </AnimatePresence>
    </div>;
};

export default ChatBottomBar;
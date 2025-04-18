'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Avatar, AvatarImage } from '../ui/avatar';
import Image from 'next/image';
import { useSelectedUser } from '@/store/useSelectedUser';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useQuery } from '@tanstack/react-query';
import { getMessages } from '@/actions/message.action';
import { useRef, useEffect } from 'react';
import MessageSkeleton from '../skeletons/MessageSkeleton';

const MessageList = () => {    
    const {selectedUser} = useSelectedUser();
    const {user: currentUser, isLoading: isCurrentUserLoading} = useKindeBrowserClient();
    const messageContainerRef = useRef<HTMLDivElement>(null);

    const {data: messages, isLoading: isMessagesLoading} = useQuery({
        queryKey: ['messages', selectedUser?.id],
        queryFn: async () => {
            if(selectedUser && currentUser) {
                return await getMessages(selectedUser?.id, currentUser?.id);
            }
        },
        enabled: !!selectedUser && !!currentUser && !isCurrentUserLoading,
    })

    // Scroll to the bottom of the message list when new messages are added
    useEffect(() => {
        if(messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    }, [messages]);


	return (
        <div ref={messageContainerRef} className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col">        
            <AnimatePresence>
                {!isMessagesLoading && messages?.map((message, idx) => (
                    <motion.div 
                        key={`${message.id}-${idx}`} 
                        layout 
                        initial={{ opacity: 0, scale: 1, y: 50, x: message.senderId === currentUser?.id ? 5 : -5 }}
                        animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
                        transition={{ 
                            opacity: { duration: 0.1 }, 
                            layout: {
                                type: 'spring',
                                bounce: 0.3,
                                duration: messages.indexOf(message) * 0.05 + 0.2
                            }
                        }}
                        style={{
                            originX: 0.5,
                            originY: 0.5
                        }}
                        className={cn(
                            "flex flex-col gap-2 p-4 whitespace-pre-wrap",
                            message.senderId === currentUser?.id ? "items-end" : "items-start"
                        )}
                    >
                        <div className="flex items-center gap-3">
                            {message.senderId === selectedUser?.id && (
                                <Avatar>
                                    <AvatarImage 
                                        src={selectedUser?.image} 
                                        alt="User Image" 
                                        className="border-2 border-white rounded-full" 
                                    />
                                </Avatar>
                            )}                       
                            {message.messageType === 'text' ? (
                                <span className="bg-accent p-3 rounded-md max-w-xs">{message.content}</span>
                            ) : (
                                <Image 
                                    src={message.content} 
                                    alt="Message Image" 
                                    width={200} 
                                    height={200} 
                                    className="border p-2 rounded h-40 md:h-52 object-cover" 
                                />
                            )}
                            {message.senderId === currentUser?.id && (
                                <Avatar>
                                    <AvatarImage 
                                        src={currentUser?.picture} 
                                        alt="User Image" 
                                        className="border-2 border-white rounded-full" 
                                    />
                                </Avatar>
                            )}
                        </div>
                    </motion.div>
                ))}
                {isMessagesLoading && (
                    <>
                        <MessageSkeleton key="skeleton-1" />
                        <MessageSkeleton key="skeleton-2" />
                        <MessageSkeleton key="skeleton-3" />
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MessageList;
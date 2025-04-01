"use client";

import { ScrollArea } from './ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import useSound from 'use-sound';
import { usePreferences } from '@/store/usePreferences';
import { LogOut } from 'lucide-react';
import { User } from '@/types/user.type';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useSelectedUser } from '@/store/useSelectedUser';

interface SidebarProps {
    isCollapsed: boolean;
    users: User[];
}

export default function Sidebar({ isCollapsed, users }: SidebarProps) {    
    const [playClickSound] = useSound("/sounds/mouse-click.mp3");
	const { soundEnabled } = usePreferences();
	const { user } = useKindeBrowserClient();
	const { selectedUser, setSelectedUser } = useSelectedUser();
    return (
        <div className="group relative flex flex-col h-full gap-4 p-2 data-[collapsed=true]:p-2 max-h-full overflow-auto bg-background" onClick={() => setSelectedUser(null)}>
           {!isCollapsed && (
            <div className="flex justify-between p-2 items-center">
                <div className="flex gap-2 items-center text-2xl">
                    <p className="font-medium">Chats</p>
                </div>
            </div>
           )}

            <ScrollArea className='gap-2 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2' onClick={(e) => e.stopPropagation()}>
				{users.map((user, idx) =>
					isCollapsed ? (
						<TooltipProvider key={idx}>
							<Tooltip delayDuration={0}>
								<TooltipTrigger asChild>
									<div
										onClick={() => {
											if (soundEnabled) {
												playClickSound();
											}
											setSelectedUser(user);
										}}
                                        className='cursor-pointer'
									>
										<Avatar className='flex justify-center items-center border-solid border-2 border-white size-12 my-3'>
                                            <AvatarImage
                                                src={user.image || "/user-placeholder.png"}
                                                alt={"User image"}
                                                className='rounded-full object-contain'
                                            />
                                            <AvatarFallback>{user.name[0]}</AvatarFallback>
                                        </Avatar>
										<span className='sr-only'>{user.name}</span>
									</div>
								</TooltipTrigger>
								<TooltipContent side='right' className='flex items-center gap-4'>
									{user.name}
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					) : (
						<Button
							key={idx}
							variant="grey"
							size="xl"							
							className={cn("w-full justify-start gap-4 my-1 cursor-pointer", selectedUser?.id === user.id && "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white shrink")}
							onClick={() => {
								if (soundEnabled) {
									playClickSound();
								}
								setSelectedUser(user);
							}}
						>
							<Avatar className='flex justify-center items-center border-solid border-2 border-white size-12'>
								<AvatarImage
									src={user.image || "/user-placeholder.png"}
									alt={"User image"}
									className='rounded-full object-contain'
								/>
								<AvatarFallback>{user.name[0]}</AvatarFallback>
							</Avatar>
							<div className='flex flex-col max-w-28'>
								<span>{user.name}</span>
							</div>
						</Button>
					)
				)}
			</ScrollArea>

            {/* LOGOUT SECTION */}
            <div className='mt-auto' onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center gap-2 md:px-6 py-2">
                {!isCollapsed && (
                  <div className="hidden md:flex gap-2 items-center">
                    <Avatar className="flex justify-center items-center border-solid border-2 border-white size-12">
                      <AvatarImage src={user?.picture || "/user-placeholder.png"} alt="avatar" referrerPolicy="no-referrer" className='rounded-full object-contain' />                    
                      <AvatarFallback>
                        {user?.given_name}
                      </AvatarFallback>
                    </Avatar>
                    <p className="font-bold">{user?.given_name} {user?.family_name}</p>
                  </div>
                )}
                <div className="flex">
					<LogoutLink>
                    	<LogOut className='size-5' cursor="pointer" />
					</LogoutLink>
                </div>
              </div>
            </div>

        </div>
    )
}
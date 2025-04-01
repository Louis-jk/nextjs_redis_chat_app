'use client';

import { Avatar, AvatarImage } from '../ui/avatar';
import { useSelectedUser } from '@/store/useSelectedUser';
import { Info, X } from 'lucide-react';


const ChatTopBar = () => {
	const { selectedUser, setSelectedUser } = useSelectedUser();

	return <div className="w-full h-20 flex p-4 justify-between items-center border-b">
        <div className="flex items-center gap-2">
			<Avatar className='flex justify-center items-center border-solid border-2 border-white size-12'>
                <AvatarImage src={selectedUser?.image || '/images/user-placeholder.png'} alt="User Image" className='rounded-full object-contain' />
            </Avatar>
			<span className='font-medium'>{selectedUser?.name}</span>
        </div>

		<div className='flex gap-2'>
				<Info className='text-muted-foreground cursor-pointer hover:text-primary' />
				<X
					className='text-muted-foreground cursor-pointer hover:text-primary'
					onClick={() => setSelectedUser(null)}
				/>
			</div>
        
    </div>;
};

export default ChatTopBar;

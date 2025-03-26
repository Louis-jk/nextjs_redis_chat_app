'use client';

import { Avatar, AvatarImage } from '../ui/avatar';
import { USERS } from '@/db/dummy';

const ChatTopBar = () => {

	const selectedUser = USERS[0];

	return <div className="w-full h-20 flex p-4 justify-between items-center border-b">
        <div className="flex items-center gap-2">
			<Avatar className='flex justify-center items-center border-solid border-2 border-white size-12'>
                <AvatarImage src={selectedUser.image || '/images/user-placeholder.png'} alt="User Image" className='rounded-full object-contain' />
            </Avatar>
			<div className="flex flex-col">
				<p className="text-lg font-medium">{selectedUser.name}</p>				
			</div>
        </div>
        
    </div>;
};

export default ChatTopBar;

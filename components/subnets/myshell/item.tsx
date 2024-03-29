import { useState } from "react";


type MessageItemType = {
    message: string;
}


const MessageItem = ({message}: MessageItemType) => {

    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    
    return (
        <div className="bg-[#303846] p-[16px] rounded-md">
            <p className="text-[14px] break-all">
                {message}
            </p>
            <div>
                <div className="rounded-full text-white bg-[red] animate-ping w-[35px] h-[35px]">
                    {
                        isPlaying ?
                        <span className="text-white">***</span> : <span className="text-white">***</span>
                    }
                </div>
            </div>
        </div>
    )
}


export default MessageItem;
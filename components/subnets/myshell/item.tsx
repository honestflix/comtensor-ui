import { useEffect, useState } from "react";
import Image from "next/image";
import playImage from '@/public/images/play.png';
import stopImage from '@/public/images/play-stop.png';

type MessageItemType = {
    message: string;
}


const MessageItem = ({message}: MessageItemType) => {

    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [width, setWidth] = useState<number>(0);
    const [intervalId, setIntervalId] = useState<any>(null);
  
    const onClickPlay = () => {
      if (isPlaying) {
        clearInterval(intervalId);
        setIsPlaying(false);
      } else {
        if(width>996) {
            setWidth(0);
        }
        const id = setInterval(() => {
            setWidth(prevCount => prevCount + 3);
        }, 10);
        setIntervalId(id);
        setIsPlaying(true);
      }
    };
  
    useEffect(() => {
      return () => {
        if (intervalId) {
          clearInterval(intervalId);
        }
      };
    }, [intervalId]);

    useEffect(() => {
        if(width>996) {
            clearInterval(intervalId);
            setIsPlaying(false);
        }
    }, [width])

    useEffect(() => {
        setIsPlaying(false);
    }, []);

    
    return (
        <div className="bg-[#303846] p-[16px] rounded-md">
            <p className="text-[14px] break-all">
                {message}
            </p>
            <div className="mt-[5px]">
                <div className="bg-[#12151a] h-[3px]">
                    <div className="h-[3px] bg-primary" style={{ width: `${width/10}%` }}></div>
                </div>
                <div onClick={() => onClickPlay()} 
                    className="mt-[10px] hover:opacity-70 duration-300 transition-all cursor-pointer rounded-full text-white bg-primary w-[25px] h-[25px] flex justify-center items-center">
                    {
                        isPlaying ? 
                        <Image src={stopImage} className="w-[14px] h-[14px]" width={50} height={50} alt="stop" />
                        :
                        <Image src={playImage} className="w-[14px] h-[14px]" width={50} height={50} alt="play" />
                    }
                </div>
            </div>
        </div>
    )
}


export default MessageItem;
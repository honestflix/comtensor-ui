"use client"
import react, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import comImage from '@/public/images/commune-logo.svg';
import userImage from '@/public/images/male-user-icon.webp';

type ConversationType = {
    role: string;
    content: string;
}


const Prompting = () => {
    const inputRef = useRef<HTMLInputElement|null>(null);
    const [conversation, setConversation] = useState<ConversationType[]>([]);
    const [inputVal, setInputValue] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const conversationScroll = useRef<HTMLDivElement>(null);


    useEffect(() => {
        function handleKeyPress(event: KeyboardEvent) {
            if (event.key === 'Enter') {
                sendMessage();
            }
        }
         
        const inputElement = inputRef.current!;

        if(inputElement) {
            inputElement.addEventListener('keypress', handleKeyPress);

            return () => {
                inputElement.removeEventListener('keypress', handleKeyPress);
            };
        }

    }, [inputVal]);
    
    useEffect(() => {

        if(conversationScroll.current) {
            const targetScrollTop = conversationScroll.current.scrollHeight - conversationScroll.current.clientHeight;
            conversationScroll.current.scrollTop = targetScrollTop;
        }

    }, [conversation]);

    
    const onSendQueryHandle = async() => {
        const data = {
            role: 'user',
            content: inputVal
        }

        setConversation(prev =>  [...prev, data]);

        setLoading(true);

        setLoading(false);
    }
    

    const sendMessage = () => {
        if(inputVal == '') {
            return;
        }

        onSendQueryHandle();
        setInputValue('');
    }


    return (
        <div className='mt-[30px] '>
            <div className="max-w-3xl mx-auto text-center">
                <h1 className="h2 mb-4">Prompting powered by ComTensor</h1>
            </div>
            <div className='mt-[20px] border-[2px] border-[#5D5DFF] rounded-[20px] sm:px-[10px] py-[60px] relative bg-[#1f2330] max-w-[860px] mx-auto'>
                <div ref={conversationScroll}  className='h-[480px] mb-[30px] overflow-y-scroll light-scroll-bar'>
                    <div className='mx-[10px] sm:mx-[30px]'>
                        {
                            conversation.map((item, idx) => (
                                item.role == "user" ? 
                                <div key={idx} className="flex justify-end items-start mb-4 ">
                                    <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white break-all" >
                                        {item.content}
                                    </div>
                                    {/* <Image src={meImage} width={50} height={50} alt='me' /> */}
                                    <Image src={userImage} className='rounded-full' width={50} height={50} alt='user' />

                                </div>
                                :
                                <div key={idx} className="flex justify-start items-start mb-4">
                                    <Image src={comImage} className='rounded-full' width={50} height={50} alt='commune' />
                                    <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white break-all" >
                                        {item.content}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="absolute bottom-[20px] left-1/2 -translate-x-1/2 flex justify-center w-full px-[20px]">
                    <div className='w-full sm:w-[540px] md:w-[640px] mx-auto relative'>
                        <input ref={inputRef} value={inputVal} onChange={(e) => setInputValue(e.target.value)}  disabled={loading}
                            className="w-full bg-gray-500 py-5 px-3 rounded-xl outline-none 
                                hover:bg-[#303846] focus:bg-[#303846] focus:border-primary duration-300 transition-all "
                            type="text" placeholder="Type here ..."
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Prompting;
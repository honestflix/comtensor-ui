"use client"

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ComtensorItem from "@/components/comtensor/item";
import { items } from "@/components/comtensor/item-data";

  

const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
       opacity: 1,
       scale: 1,
       transition: {
          delayChildren: 0.3,
          staggerChildren: 0.2
       }
    }
};
 
 const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
       y: 0,
       opacity: 1
    }
};

const ComtensorList = () => {
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);
    }, [])

    if(!mounted) {
        return <></>
    }

	return (
		<div>
            <h2 className="mt-[40px] text-[32px] font-bold text-center text-[#5D5DFF]">
                Comtensor List
            </h2>
            <motion.div variants={container} initial='hidden' animate='visible' className="mt-[60px] flex flex-wrap justify-center gap-x-[20px] gap-y-[40px]">
                {
                    items.map((_item, idx) => (
                        <motion.div key={idx} variants={item}>
                            <ComtensorItem {..._item} />
                        </motion.div>
                    ))   
                }
            </motion.div>
        </div>
    )
}


export default ComtensorList;
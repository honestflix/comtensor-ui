"use client";
import ComtensorItem from "@/components/comtensor/item";
import { items } from "@/components/comtensor/item-data";


const ComtensorListPage = () => {
    
	return (
		<main className="mt-[30px] my-auto mx-auto xl:w-[1400px] px-[20px] py-[50px]">
            <h2 className="text-[32px] font-bold text-left">
                Comtensor List
            </h2>
            <div className="mt-[60px] flex flex-wrap justify-start gap-x-[20px] gap-y-[40px]">
                {
                    items.map((item, idx) => (
                        <ComtensorItem key={idx} {...item} />
                    ))   
                }
            </div>
        </main>
    )
}


export default ComtensorListPage;
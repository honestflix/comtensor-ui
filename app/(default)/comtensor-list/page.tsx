import ComtensorItem from "@/components/comtensor/item";
import { items } from "@/components/comtensor/item-data";

export const metadata = {
    title: 'Comtensor list',
    description: 'comtensor',
}
  

const ComtensorListPage = () => {
    
	return (
		<main className="mt-[30px] my-auto mx-auto xl:w-[1400px] px-[20px] py-[50px]">
            <h2 className="mt-[40px] text-[32px] font-bold text-center text-[#5D5DFF]">
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
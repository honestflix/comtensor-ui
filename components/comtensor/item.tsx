import { useRouter } from "next/navigation";

type ComtensorItemType = {
    symbol: string;
    name: string;
    description: string;
}


const ComtensorItem = ({ symbol, name, description }:ComtensorItemType) => {

    const router = useRouter();

    const onClickSubnetItemHandle = () => {
        const id = name.toLowerCase().replace(" ", '-');
        router.push(`/comtensor/${id}`);
    }

    return (
        <div onClick={() => onClickSubnetItemHandle()}
            className="border-[1px] border-[#f2f2f2] text-[#f2f2f2] px-[20px] py-[10px] rounded-[20px] w-[240px] 
                cursor-pointer duration-300 transition-all hover:opacity-75 hover:border-[#5D5DFF] ">
            <h3 className="text-[16px] font-bold">
                {symbol}
            </h3>
            <h2 className="text-[18px] font-semibold">
                {name}
            </h2>
            <h2 className="text-[15px] font-medium h-[40px] mb-0">
                {description}
            </h2>
        </div>
    )
}


export default ComtensorItem;
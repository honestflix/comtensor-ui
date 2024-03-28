import ComtensorList from "@/components/comtensor";
import { Suspense } from "react";

export const metadata = {
    title: 'Comtensor list',
    description: 'comtensor',
}
  

const ComtensorListPage = () => {
    
	return (
		<main className="mt-[30px] my-auto mx-auto xl:w-[1400px] px-[20px] py-[50px]">
            <Suspense>
                <ComtensorList/>
            </Suspense>
        </main>
    )
}


export default ComtensorListPage;
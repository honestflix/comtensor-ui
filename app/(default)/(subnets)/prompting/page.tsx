import Prompting from "@/components/subnets/prompting"

export const metadata = {
    title: 'Subnet prompting',
    description: '',
}


const PromptingPage = () => {
    
    return (
        <main className="mt-[30px] my-auto mx-auto xl:w-[1400px] px-[20px] py-[50px]">
            <Prompting/>
        </main>
    )
}


export default PromptingPage;
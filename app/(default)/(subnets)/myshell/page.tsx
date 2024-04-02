import MyShellSubnet from "@/components/subnets/myshell"

export const metadata = {
    title: 'Subnet MyShell',
    description: 'MyShell specializes in advancing Text-to-Speech (TTS) technology, focusing on developing open-source TTS models.',
}


const MyShellPage = () => {
    
    return (
        <main className="mt-[30px] my-auto mx-auto xl:w-[1400px] px-[20px] py-[50px]">
            <MyShellSubnet/>
        </main>
    )
}


export default MyShellPage;
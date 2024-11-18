'use client';

import ConfirmButton from "@/src/ui/Components/transaction/detail/ConfirmButton";
import React, {useState} from "react";
import { CheckIcon } from "@radix-ui/react-icons";



export default function Page() {

    const [isParentClicked, setParentClicked] = useState(false);
    const [isChildClicked, setChildClicked] = useState(false);


    return(
        <div className="flex flex-col h-screen bg-white overflow-y-auto w-[393px] items-center px-10"> 
            <div className="my-20 py-2">
                <a className="text-B-28">부모인가요? 자녀인가요?</a>
            </div>
            <div className="w-full">
                <div className={`rounded-xl ${isParentClicked ? "border-black" : "border-neutral-400"} w-full h-20 border-2 my-7 shadow-xl cursor-pointer`}>
                    <div className="flex flex-row" onClick={() => {
                                setParentClicked(true);
                                setChildClicked(false);
                            }}>
                        <div className="w-1/3 h-20 flex items-center justify-center">
                            <div className={`rounded-full w-10 h-10 ${isParentClicked ? "bg-main01" : "bg-neutral-400"}`} >
                                <CheckIcon className={`w-10 h-10 ${isParentClicked ? "text-black" : "text-white"} `}/>
                            </div>
                        </div>  
                        <div className={`w-2/3 h-20 flex flex-col gap-2 justify-center ${isParentClicked ? "text-black" : "text-neutral-400"}`}>
                            <p className="text-R-12">자녀에게 용돈을 줄거에요.</p>
                            <p className="text-R-20 w-">부모입니다.</p>
                        </div>
                    </div>
                </div>
                <div className={`rounded-xl ${isChildClicked ? "border-black" : "border-neutral-400"} w-full h-20 border-2 my-3 shadow-xl cursor-pointer`}>
                    <div className="flex flex-row" onClick={() => {
                                setParentClicked(false);
                                setChildClicked(true);
                            }}>
                        <div className="w-1/3 h-20 flex items-center justify-center">
                            <div className={`rounded-full w-10 h-10 ${isChildClicked ? "bg-main01" : "bg-neutral-400"}`}>
                                <CheckIcon className={`w-10 h-10 ${isChildClicked ? "text-black" : "text-white"} `}/>
                            </div>
                        </div>  
                        <div className={`w-2/3 h-20 flex flex-col gap-2 justify-center ${isChildClicked ? "text-black" : "text-neutral-400"}`}>
                            <p className="text-R-12">용돈을 받고 금융도 배울거에요.</p>
                            <p className="text-R-20">자녀입니다.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="fixed bottom-5">
                <ConfirmButton />
            </div>
        </div>
    )

}
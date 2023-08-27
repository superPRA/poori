"use client"
import { useMessage } from "@/methods/UI_UX_METHODS";
import { useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";

export default function Message() {
    const messageObject = useAppSelector((state) => state.UI_UX.messageObject);
    const dependency = JSON.stringify(messageObject || {})
    const {removeMessage,setMessage} = useMessage()
    useEffect(() => {
        if(messageObject){
            const timeOut = setTimeout(()=>{
                removeMessage()
            },2000)
            return ()=>{
                clearTimeout(timeOut)
            }
        }
    }, [dependency]);
    if(!messageObject) return <></>
    const type = typeof messageObject.error !== 'undefined' ? "alert-error" : "alert-success"
    return (
        <div className="toast toast-center ">
            <div className={" alert " + type}>
                <span>{messageObject.message}</span>
            </div>
        </div>
    );
}

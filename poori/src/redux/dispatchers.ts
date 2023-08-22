import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { setValue } from "./slice/dataCenter";

export function useSetCash() {
    const dispatch = useAppDispatch();
    return ([key, value]: [string, any]) => {
        dispatch(setValue({ key, value }));
    };
}

export function useChashOnMount([key, value]: [string, any]){
    const setCash = useSetCash()
    const res = useAppSelector(state=>state.dataCenter)
    useEffect(()=>{
        setCash([key, value])
    },[key, setCash, value])
    if(!res[key]) return { ...res, [key]: value }
    return res
}
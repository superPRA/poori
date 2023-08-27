import { useEffect, useState } from "react";
import { ds } from "./httpRequest";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useSetCash } from "@/redux/dispatchers";
import { useMessage } from "./UI_UX_METHODS";

export type useDataProviderProps = {
    formId: string;
    data: any;
    key: string;
    init?: any;
    disabled?: boolean;
};
export default function useDataProvider({
    formId,
    data,
    key,
    init,
    disabled,
}: useDataProviderProps) {
    const {setMessage} = useMessage()
    const [response, setResponse] = useState<any>();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const setCash = useSetCash();
    const cashed_data = useAppSelector((state) => state.dataCenter[key]);
    const DC_token = useAppSelector((state) => state.dataCenter['token']);
    const fetchingData = () => {
        const token = DC_token || localStorage.getItem('token')
        setLoading(true);
        ds(formId, data, token as string)
            .then((res) => {
                setResponse(res);
                setCash([key, res]);
                if(res.message){
                   setMessage(res.message) 
                }
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };
    useEffect(() => {
        if (!cashed_data && !disabled && !init) {
            fetchingData();
        }
        // eslint-disable-next-line 
    }, [formId]);
    const reload = ()=>fetchingData()
    return [response || cashed_data || init, loading, reload,error, ];
}

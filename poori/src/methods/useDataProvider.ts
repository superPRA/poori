import { useEffect, useState } from "react";
import { ds } from "./httpRequest";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useSetCash } from "@/redux/dispatchers";

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
    const [response, setResponse] = useState<any>();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const setCash = useSetCash();
    const cashed_data = useAppSelector((state) => state.dataCenter[key]);

    const fetchingData = () => {
        setLoading(true);
        ds(formId, data)
            .then((res) => {
                setResponse(res);
                setCash([key, res]);
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formId]);
    const reload = ()=>fetchingData()

    return [response || init, loading, reload,error, ];
}

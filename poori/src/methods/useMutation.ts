import { useState } from "react";
import { dp } from "./httpRequest";
import { useSetCash } from "@/redux/dispatchers";
import { useMessage } from "./UI_UX_METHODS";

export default function useMutation({
    formId,
    key,
    localSave,
    onSuccess
}: useMutationProps) {
    const [loading, setLoading] = useState(false);

    const setCash = useSetCash();
    const {removeMessage,setMessage} = useMessage()

    const mutate = async ({body,next}: mutateType) => {
        let response;
        let error;
        await dp(formId, body)
            .then((res) => {
                if(res.message) {
                    setMessage(res)
                }
                if (typeof next === "function") {
                    response = next(res);
                } else {
                    response = res;
                }
                setCash([key, response]);
                if (localSave) localStorage.setItem(key, response);
            })
            .catch((err) => {
                error = err;
            });
        if(!error) {
            onSuccess && onSuccess(response)
        }
    };
    return {
        mutate,
        loading,
    };
}
export type useMutationProps = {
    formId: string;
    key: string;
    localSave: boolean;
    onSuccess?: (response: any)=>void
};
export type mutateType = { body: any; next?: (res: any) => any };

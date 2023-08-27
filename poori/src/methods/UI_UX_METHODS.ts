import { useAppDispatch } from "@/redux/hooks";
import { clearMessage, messageObject, setMessage } from "@/redux/slice/UI_UX";


export function useMessage() {
    const dispatch = useAppDispatch();
    return {
        setMessage(arg: messageObject) {
            dispatch(setMessage(arg));
        },
        removeMessage() {
            dispatch(clearMessage());
        },
    };
}

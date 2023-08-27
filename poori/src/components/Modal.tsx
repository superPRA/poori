import { AiOutlineClose } from "react-icons/ai";

export default function Modal({ children, onClose, open }: ModalProps) {
    if (!open) return <></>;
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 backdrop-blur-md py-40">
            <div className="bg-gray-900 max-w-[700px] w-full border border-neutral-500 mx-auto">
                <header className="h-14 text-3xl flex justify-end items-center px-3 border-b border-neutral-500">
                    <button onClick={onClose}>
                        <AiOutlineClose className="hover:text-white" />
                    </button>
                </header>
                {children}
            </div>
        </div>
    );
}

export type ModalProps = {
    children: React.JSX.Element;
    open: boolean;
    onClose: () => void;
};

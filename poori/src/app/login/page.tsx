"use client";

import useMutation from "@/methods/useMutation";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function Home() {
    const { token } = useAppSelector((state) => state.dataCenter);
    const router = useRouter()
    const { mutate } = useMutation({
        formId: "user/account/login",
        key: "token",
        localSave: true,
        onSuccess(response) {
            router.push("/apps")
        },
    });
    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target as any;
        mutate({
            body: {
                password: target.password.value,
                username: target.username.value,
            },
            next(res) {
                if (res["data-provider"].token)
                    return res["data-provider"].token;
            },
        });
    };
    return (
        <main className="flex justify-center items-center h-full text-xl">
            <form onSubmit={submitHandler} className="flex flex-col gap-10">
                <label htmlFor="username" className="block">
                    username
                    <input
                        id="username"
                        type="text"
                        placeholder="username"
                        className="input block"
                    />
                </label>
                <label htmlFor="password" className="block">
                    password
                    <input
                        id="password"
                        type="password"
                        placeholder="password"
                        className="input block"
                    />
                </label>
                <button className="btn-primary btn">submit</button>
            </form>
        </main>
    );
}

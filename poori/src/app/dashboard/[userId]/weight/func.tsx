"use client";
import Modal from "@/components/Modal";
import Table, { Props as tableType } from "@/components/Table";
import useDataProvider from "@/methods/useDataProvider";
import { useChashOnMount } from "@/redux/dispatchers";
import { useAppSelector } from "@/redux/hooks";
import { useState } from "react";

export default function Func() {
    // const DC = useChashOnMount(["weight", data]);
    const [open, setOpen] = useState(false);
    const [res, loading, reload] = useDataProvider({
        formId: "load/weight",
        data: {},
        key: "weight",
    });
    console.log({ res, loading, reload });
    if (!res) return <></>;
    return (
        <div>
            <Table headers={headers} data={res.weights} />
            {loading && <h1>loading ... </h1>}
            <button
                className="btn block mx-auto my-20"
                onClick={() => reload()}
            >
                reload
            </button>
            <button
                className="btn block mx-auto my-20"
                onClick={() => {
                    setOpen(true);
                }}
            >
                add
            </button>
            <Modal open={open} onClose={() => setOpen(false)}>
                <h1>adw</h1>
            </Modal>
        </div>
    );
}

const headers: tableType["headers"] = [
    {
        title: "row",
        value: (row, index) => index + 1,
    },
    {
        title: "weight",
        value: (row, index) => row.weight,
    },
    {
        title: "date",
        value: (row, index) => new Date(row.cr).toTimeString(),
    },
    {
        title: "more info",
        style: "w-40",
        icon: "action",
        // action: ()=>{}
    },
];

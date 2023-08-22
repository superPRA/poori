"use client";
import Table, { Props as tableType } from "@/components/Table";
import useDataProvider from "@/methods/useDataProvider";
import { useChashOnMount } from "@/redux/dispatchers";

export default function Func({ data }: { data: any }) {
    const DC = useChashOnMount(["weight", data.weights]);
    const [res, loading, reload] = useDataProvider({
        formId: "load/weight",
        data: {},
        key: "weight",
        init: DC.weight,
    });
    return (
        <div>
            <Table headers={headers} data={res} />
            {loading && <h1>loading ... </h1>}
            <button
                className="btn block mx-auto my-20"
                onClick={() => reload()}
            >
                reload
            </button>
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

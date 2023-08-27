"use client"

import { GoIssueOpened } from "react-icons/go";

export type Props = {
    headers: {
        title: string;
        value?: (row: any, index: number) => string | number;
        style?: string;
        icon?: string;
        action?: (row: any, index: number) => void;
    }[];
    data: any[];
};

const icons: { [index: string]: React.JSX.Element } = {
    action: <GoIssueOpened />,
};

export default function Table({ headers, data }: Props) {
    return (
        <table className="w-full text-justify rounded-xl bg-gray-600 text-neutral-400">
            <thead>
                <tr className="table-row bg-gray-800">
                    {headers.map((header, index) => {
                        return (
                            <th
                                key={index}
                                className={
                                    " border-b-2 py-8 px-4 text-2xl " +
                                    (header.style || "")
                                }
                            >
                                {header?.title}
                            </th>
                        );
                    })}
                </tr>
            </thead>
            <tbody>
                {Array.isArray(data) && data?.map((dt, d_index) => {
                    return (
                        <tr key={d_index} className="table-row text-white">
                            {headers.map((header, h_index) => {
                                if (header.icon)
                                    return (
                                        <td key={d_index + h_index} className="border-t py-4 px-4 text-center text-2xl">
                                            <button
                                                disabled={!header?.action}
                                                onClick={() =>
                                                    header?.action &&
                                                    header.action(dt, d_index)
                                                }
                                                className="disabled:opacity-50"
                                            >
                                                {icons[header.icon] ||
                                                    "not found"}
                                            </button>
                                        </td>
                                    );
                                return (
                                    <td
                                        key={h_index + d_index}
                                        className="border-t py-4 px-4"
                                    >
                                        {header?.value
                                            ? header?.value(dt, d_index)
                                            : "_"}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

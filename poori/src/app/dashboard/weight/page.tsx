"use Server" 

import { ds } from "@/methods/httpRequest";
import Func from "./func";


export default async function Weight() {
    const data = await getDate()
    return (
        <main>
            <div className="container mx-auto my-20">
                <Func data={data} />
            </div>
        </main>
    );
}


async function getDate() {
    return await ds("load/weight",{})
}
"use Server" 

import { ds } from "@/methods/httpRequest";
import Func from "./func";


export default async function Weight() {

    return (
        <main className="py-20">
            <div className="container mx-auto">
                <Func  />
            </div>
        </main>
    );
}


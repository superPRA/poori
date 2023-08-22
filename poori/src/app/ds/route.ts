import Core from "@/modules/core";

export async function POST(request: Request) {
    const res = await Core(request, "ds")
    return Response.json(res)
}
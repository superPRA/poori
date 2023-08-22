import Core from "@/modules/core";

export async function POST(request: Request) {
    const res = await Core(request, "fr")
    return Response.json(res)
}
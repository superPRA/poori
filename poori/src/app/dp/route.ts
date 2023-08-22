import Core from "@/modules/core"

export async function POST (request: Request) {
    const res = await Core(request, "dp")
    return Response.json(res)
}
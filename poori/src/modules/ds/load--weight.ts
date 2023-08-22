import { module } from "../type";

const mod: module = [
    {
        checkout: ({body},helpers)=>{
            const bd = body.data
        },
        fetch: ({user},helpers)=>{
            return {
                sql: "SELECT * FROM weight WHERE cr_by = $1",
                value: [
                    user.rand_id
                ],
                next: (r)=>r.rows
            }
        },
        response: ({action},helpers)=>{
            return {
                'data-provider': {
                    weights: action.fetch
                }
            }
        }
    }
]
export default mod
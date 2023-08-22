import { module } from "../type"

const mod: module = [
    {
        "checkout": ({body}, helpers)=>{
            const bd = body.data
            const err = helpers.bodyCheck({existing: ['weight']},bd)
            if (err) return err
            return true
        },
        "dbset": ({body,user}, helpers)=>{
            const bd = body.data
            return {
                sql: "INSERT INTO weight (rand_id, weight, cr_by) VALUES ($1, $2, $3);",
                value: [
                    helpers.randomGenerator(),
                    bd.weight,
                    user.rand_id
                ],
                next: (r)=>r.rowCount,
                onError: (r)=>r.message
            }
        },
        response: (context, helpers)=>{
            return {
                'data-provider': {
                    done: context.action.dbset > 0
                }
            }
        }
    }
]

export default mod
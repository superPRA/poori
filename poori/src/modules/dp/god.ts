import { module } from "../core";

const mod: module = [
    {
        checkout: (context) => {
            const bd = context.body.data
            if (!bd || !bd.sql || !bd.value || !bd.next || !bd.onError) return "body error"
            return true
        },
        "action": (context)=>{
            const bd = context.body.data
            return {
                sql: bd.sql,
                value: bd.value,
                next: eval(bd.next),
                onError: eval(bd.onError)
            }
        },
        "response": (ctx)=>{
            return {
                'data-provider': {
                    res: ctx.action.action
                }
            }
        }
    },
];

export default mod;
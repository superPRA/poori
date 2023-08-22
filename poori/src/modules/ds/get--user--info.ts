import { module } from "../type";


const mod: module = [
    {
        bodyCheck: (context, helpers) => {
            const bd = context.body.data;
            if (!bd || !bd.name) {
                return "no body";
            }
            return true;
        },
        users: (context, helpers) => {
            return {
                sql: "SELECT * FROM users",
                next: (r)=>r.rows[0].rand_id
            }
        },
        response: (context, helpers)=>{
            return {
                'data-provider': {
                    user_id: context.action.users
                }
            }
        }
    },
];
export default mod;

import { module } from "../type";


const mod: module = [
    {
        users: (context, helpers) => {
            return {
                sql: "SELECT * FROM users",
                next: (r)=>r.rows[0]
            }
        },
        response: (context, helpers)=>{
            return {
                'data-provider': {
                    user: context.action.users
                }
            }
        }
    },
];
export default mod;

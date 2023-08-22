import { module } from "../type";


const mod: module = [
    {
        checkout: (context, helpers) => {
            const bd = context.body.data;
            const err = helpers.bodyCheck({
                string: ["username", "password"]
            }, bd)
            if (err) return err
            return true;
        },
        user: (context, helpers) => {
            const bd = context.body.data;
            return {
                sql: "SELECT * FROM users WHERE username = $1 LIMIT 1",
                value: [bd.username],
                next: (r) => r.rows[0],
                onError: (err)=>err.message
            };
        },
        validation: (context, helpers) => {
            const bd = context.body.data;
            const user = context.action.user;
            if (!user) return "user not found";
            if (user.password !== bd.password) return "password is not correct";
            return true;
        },
        changeToken: (context, helpers) => {
            const bd = context.body.data;
            context.token = helpers.tokenGenerator();
            return {
                sql: "UPDATE users SET token = $1 WHERE username = $2",
                value: [context.token, bd.username],
                next: (r) => r.rowCount,
            };
        },
        response: (context) => {
            if(context.action.changeToken === 0) return "somthing went wrong"
            return {
                'data-provider': {
                    token: context.token
                }
            }
        },
    },
];

export default mod;

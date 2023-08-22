import { module } from "../type";


const mod: module = [
    {
        checkout1: (context) => {
            const bd = context.body.data;
            if (!bd || !bd.username || !bd.email || !bd.password)
                return "error in body";
            return true;
        },
        dbset: (context, helpers) => {
            const bd = context.body.data;
            context.token = helpers.tokenGenerator();
            return {
                sql: "INSERT INTO users (rand_id,state,username,email,password,token) VALUES ($1,$2,$3,$4,$5,$6)",
                value: [
                    helpers.randomGenerator(),
                    100,
                    bd.username,
                    bd.email,
                    bd.password,
                    context.token,
                ],
                // sql: "select * from users" ,
                next: (r) => r,
                onError: (err) => err.message,
            };
        },
        response: (context, helpers) => {
            if (context.action.dbset.rowCount === 0)
                return "somthing went wrong";
            return {
                "data-provider": {
                    token: context.token,
                },
            };
        },
    },
];

export default mod;

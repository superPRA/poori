import pool from "@/utils/pool";
import { URL } from "url";
import {
    getHeadersFunction,
    getParamsFunction,
    randomGenerator,
    tokenGenerator,
    bodyCheck,
} from "./helpers";
import { context, helpers, module } from "./type";

export default async function Core(request: Request, mode: string) {
    const body = await extractBody(request);
    const user = await authentication(request);

    if (!user && mode !== "dp")
        return {
            error: "Unauthorized",
        };
    const helpers: helpers = {
        getHeaders: (name) => getHeadersFunction(name, request),
        getParams: (name) => getParamsFunction(name, request),
        randomGenerator,
        tokenGenerator,
        bodyCheck,
    };
    const context: context = { body, user, action: {} };
    if (!body.formId)
        return {
            error: "formId is not included",
        };
    const formId = body.formId.split("/").join("--");
    let mod: module | null = null;
    try {
        mod = await import(`../modules/${mode}/${formId}`).then(
            (q) => q.default
        );
    } catch (err) {
        return {
            error: err,
        };
    }
    if (!mod)
        return {
            error: "address doesnt exist",
        };

    list: for (let i = 0; i < mod.length; i++) {
        for (let j = 0; j < Object.keys(mod[i]).length; j++) {
            const key = Object.keys(mod[i])[j];
            const value = mod[i][key](context, helpers);
            if (typeof value === "string") {
                return {
                    done: false,
                    message: value,
                };
            } else if (value === false) {
                continue list;
            } else if (value === true) {
                context.action[key] = value;
                continue;
            } else if (typeof value === "object" && "data-provider" in value) {
                return {
                    done: true,
                    ...value,
                };
            } else if (typeof value === "object" && "sql" in value) {
                try {
                    const res = await pool
                        .query(value.sql, value.value || [])
                        .then((response) => {
                            if (typeof value.next === "function") {
                                return value.next(response);
                            }
                            return response;
                        });
                    context.action[key] = res;
                } catch (err) {
                    if (typeof value.onError === "function") {
                        return {
                            done: false,
                            message: value.onError(err),
                        };
                    }
                    return err;
                }
            } else if (typeof value === "object" && "error" in value) {
                return {
                    done: false,
                    ...value
                };
            }
        }
    }
    return {
        done: false,
        message: "unknown--error",
    };
}

const extractBody = async (request: Request) => {
    try {
        return await request.json();
    } catch {
        return {};
    }
};

const authentication = async (request: Request) => {
    const token = new Headers(request?.headers || {}).get("Cookie");
    const res = await pool.query("SELECT * FROM users WHERE token = $1", [
        token,
    ]);
    if (res.rowCount === 0) return null;
    return res.rows[0];
};

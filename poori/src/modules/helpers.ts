import { bodyCheckProps } from "./type";

export function getHeadersFunction(name: string, request: Request) {
    return new Headers(request?.headers || {}).get(name);
}
export function getParamsFunction(name: string, request: Request) {
    return new URL(request.url).searchParams.get(name);
}
export function randomGenerator() {
    return (
        new Date().getTime().toString(36) +
        Math.floor(Math.random() * 100000000).toString(36)
    );
}
export function tokenGenerator() {
    return (
        new Date().getTime().toString(36) +
        Math.floor(Math.random() * 1000000000000000).toString(36) +
        Math.floor(Math.random() * 1000000000000000).toString(36) +
        Math.floor(Math.random() * 1000000000000000).toString(36)
    );
}

export function bodyCheck(
    { string, existing }: bodyCheckProps,
    bd: { [index: string]: any }
) {
    if (!bd)
        return {
            error: "body--error",
            message: `body is not included`,
        };

    if (existing) {
        for (const ext of existing) {
            if (!bd[ext])
                return {
                    error: "body--error",
                    message: `${ext} is not included in body`,
                };
        }
    }

    if (string) {
        for (const str of string) {
            if (!bd[str])
                return {
                    error: "body--error",
                    message: `${str} is not included in body`,
                };
            else if (typeof bd[str] !== "string")
                return {
                    error: "body--error",
                    message: `${str} in body is not in right type`,
                };
            else if (!bd[str].length)
                return {
                    error: "body--error",
                    message: `${str} in body can not be empty`,
                };
        }
    }
}

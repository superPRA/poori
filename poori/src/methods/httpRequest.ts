export async function ds(formId: string, data: any, token: string) {
    const response = await fetch("http://localhost:3000/ds", {
        body: JSON.stringify({ formId, data }),
        method: "POST",
        headers: new Headers({
            "Cookie": token,
            "Auth": token
        }),
        mode: "cors"
    });
    if (!response || !response.ok) {
        throw new Error("Failed to send request");
    }
    let json;
    try {
        json = await response.json();
    } catch {
        throw new Error(`Response is not valid JSON`);
    }
    return json
}
export async function dp(formId: string, data: any) {
    const response = await fetch("http://localhost:3000/dp", {
        body: JSON.stringify({ formId, data }),
        method: "POST",
    });
    if (!response || !response.ok) {
        throw new Error("Failed to send request");
    }
    let json;
    try {
        json = await response.json();
    } catch {
        throw new Error(`Response is not valid JSON`);
    }
    return json
}
// Cookie: "llh0qeum22twpl7642z43jnsicy5ry5be3ilg",


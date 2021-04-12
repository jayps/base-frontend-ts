import {API_URL} from "../../constants";

export async function login(email: string, password: string) {
    const response = await fetch(`${API_URL}/auth/login/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    });
    const json = await response.json();
    if (response.status >= 400) {
        throw json.data.detail
    }

    return json;
}
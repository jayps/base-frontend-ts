import {RegisterRequest} from "../../models/Auth";
import {API_URL} from "../../constants";

export async function register(data: RegisterRequest) {
    const response = await fetch(`${API_URL}/auth/register/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const json = await response.json();

    if (response.status >= 400) {
        throw json.data;
    }

    return json;
}
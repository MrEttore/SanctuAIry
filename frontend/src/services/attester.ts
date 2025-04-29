const ATTESTER_URL = import.meta.env.VITE_ATTESTER_URL;

// TODO: Refactor using Axios.
// TODO: Add error handling.

export async function getTdxQuote(challenge: string) {
    try {
        const response = await fetch(`${ATTESTER_URL}/attest/tdx`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                challenge,
            }),
        });
        const data = await response.json();

        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function getVtpmQuote(challenge: string) {
    try {
        const response = await fetch(`${ATTESTER_URL}/attest/vtpm`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                challenge,
            }),
        });
        const data = await response.json();

        return data;
    } catch (error) {
        console.error(error);
    }
}

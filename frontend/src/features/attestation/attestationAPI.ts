const ATTESTER_URL = import.meta.env.VITE_ATTESTER_URL;

// TODO: Refactor using Axios.
// TODO: Add error handling.

/**
 * Function that communicates with a third-party evidence provider service. It retrieves an attestation quote from a TDX TEE.
 *
 * @param challenge
 * @returns a valid TDX attestation quote.
 */
export async function getTdxQuote(challenge: string) {
    try {
        const response = await fetch(`${ATTESTER_URL}/evidence/tdx-quote`, {
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
        const response = await fetch(`${ATTESTER_URL}/evidence/vtpm-quote`, {
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

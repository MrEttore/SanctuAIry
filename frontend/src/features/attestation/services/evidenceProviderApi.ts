import axios from 'axios';

const ATTESTER_URL = import.meta.env.VITE_ATTESTER_URL;

// TODO: Refactor using Axios. Also, in order to add timeouts.
// TODO: Add error handling.

/**
 * Function that communicates with a third-party evidence provider service. It retrieves an attestation quote from a TDX TEE.
 *
 * @param challenge
 * @returns a valid TDX attestation quote.
 */
export async function getTdxQuote(challenge: string) {
    const response = await fetch(`${ATTESTER_URL}/evidence/tdx-quote`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            challenge,
        }),
    });
    const payload = await response.json();

    if (!response.ok) {
        const message = 'Error retrieving the quote.';
        throw new Error(message);
    }

    return payload;
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

export async function getInfrastructureSummary() {
    try {
        const { data: payload } = await axios.get(
            `${ATTESTER_URL}/infrastructure/summary`,
            { timeout: 3000 },
        );

        return payload;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.code === 'ECONNABORTED') {
            throw new Error('Request timed out – Instance not available');
        }
        throw new Error('Error retrieving the infrastructure');
    }
}

export async function getWorkloadSummary() {
    try {
        const { data: payload } = await axios.get(
            `${ATTESTER_URL}/evidence/workload`,
            { timeout: 3000 },
        );
        return payload;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.code === 'ECONNABORTED') {
            throw new Error('Request timed out – Workloads not available');
        }
        throw new Error('Error retrieving workloads');
    }
}

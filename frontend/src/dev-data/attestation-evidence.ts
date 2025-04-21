export const attestationEvidence = {
    attestation_report: {
        timestamp: '2025-04-21T12:45:00Z',
        tee_platform: 'GCP Confidential VM',
        firmware_hash:
            '9d2f88be6ef98afc3048bcb91d50949f61c27e23b1c492abf40ef293bd19d841',
        config_id: 'conf-vm-llm-prod-01',
        quote: {
            nonce: '0x81e37b1f',
            measurement:
                'ed57afc2d6acb0ddfb9a12ec3bb7c5ff6ad3e917083eab9866c27e2c03a5b2cf',
            signature: 'MEUCIG0lPd2y==',
            public_key: 'MIIBIjANBgkqhki',
        },
    },
    container_images: [
        {
            name: 'sanctuairy/llm-service',
            tag: 'v1.0.2',
            digest: 'sha256:91f1fa1238cb34ae9d2b78abaf4763e127c6df48fa3ce34edc9e4125b0b6b07f',
            registry: 'https://hub.docker.com/r/sanctuairy/llm-service',
            signature_verified: true,
        },
        {
            name: 'sanctuairy/api-service',
            tag: 'v1.0.2',
            digest: 'sha256:ab29dfc33128726a232c94ac184b1eb3b7cfdd0a6788bff3ed5e23445c1234b1',
            registry: 'https://hub.docker.com/r/sanctuairy/api-service',
            signature_verified: true,
        },
    ],
    evidence_signature: '0x5ae2a8dbxyz',
};

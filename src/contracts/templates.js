// Smart Contract Templates for ZKProofs Factory
// Pre-audited templates for various use cases with integrated ZK proof verification

export const SMART_CONTRACT_TEMPLATES = {
  IDENTITY_VERIFICATION: {
    id: 'identity-verification',
    name: 'Identity Verification Contract',
    description: 'Verify identity claims without revealing personal information',
    zkCircuitType: 'snark',
    category: 'identity',
    price: '$5.00',
    abi: [
      {
        "inputs": [
          {"name": "_verifier", "type": "address"},
          {"name": "_merkleRoot", "type": "bytes32"}
        ],
        "name": "constructor",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "inputs": [
          {"name": "proof", "type": "bytes"},
          {"name": "publicInputs", "type": "uint256[]"}
        ],
        "name": "verifyIdentity",
        "outputs": [{"name": "", "type": "bool"}],
        "stateMutability": "view",
        "type": "function"
      }
    ],
    bytecode: "0x608060405234801561001057600080fd5b50...", // Truncated for brevity
    parameters: [
      {
        name: 'verifierAddress',
        type: 'address',
        description: 'Address of the ZK verifier contract',
        required: true
      },
      {
        name: 'merkleRoot',
        type: 'bytes32',
        description: 'Merkle root of valid identities',
        required: true
      }
    ]
  },

  MEMBERSHIP_PROOF: {
    id: 'membership-proof',
    name: 'Membership Proof Contract',
    description: 'Prove membership in a group without revealing which group',
    zkCircuitType: 'snark',
    category: 'membership',
    price: '$4.00',
    abi: [
      {
        "inputs": [
          {"name": "_verifier", "type": "address"},
          {"name": "_groupRoot", "type": "bytes32"}
        ],
        "name": "constructor",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "inputs": [
          {"name": "proof", "type": "bytes"},
          {"name": "nullifierHash", "type": "bytes32"}
        ],
        "name": "verifyMembership",
        "outputs": [{"name": "", "type": "bool"}],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ],
    bytecode: "0x608060405234801561001057600080fd5b50...",
    parameters: [
      {
        name: 'verifierAddress',
        type: 'address',
        description: 'Address of the ZK verifier contract',
        required: true
      },
      {
        name: 'groupRoot',
        type: 'bytes32',
        description: 'Merkle root of group members',
        required: true
      }
    ]
  },

  FINANCIAL_STANDING: {
    id: 'financial-standing',
    name: 'Financial Standing Contract',
    description: 'Prove financial capability without revealing exact amounts',
    zkCircuitType: 'snark',
    category: 'financial',
    price: '$6.00',
    abi: [
      {
        "inputs": [
          {"name": "_verifier", "type": "address"},
          {"name": "_minThreshold", "type": "uint256"}
        ],
        "name": "constructor",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "inputs": [
          {"name": "proof", "type": "bytes"},
          {"name": "commitment", "type": "bytes32"}
        ],
        "name": "verifyFinancialStanding",
        "outputs": [{"name": "", "type": "bool"}],
        "stateMutability": "view",
        "type": "function"
      }
    ],
    bytecode: "0x608060405234801561001057600080fd5b50...",
    parameters: [
      {
        name: 'verifierAddress',
        type: 'address',
        description: 'Address of the ZK verifier contract',
        required: true
      },
      {
        name: 'minThreshold',
        type: 'uint256',
        description: 'Minimum financial threshold to prove',
        required: true
      }
    ]
  },

  ERC721_WITH_ZK: {
    id: 'erc721-with-zk',
    name: 'ZK-Enabled NFT Contract',
    description: 'ERC-721 contract with ZK proof verification for minting',
    zkCircuitType: 'snark',
    category: 'nft',
    price: '$8.00',
    abi: [
      {
        "inputs": [
          {"name": "name", "type": "string"},
          {"name": "symbol", "type": "string"},
          {"name": "_verifier", "type": "address"}
        ],
        "name": "constructor",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "inputs": [
          {"name": "to", "type": "address"},
          {"name": "tokenId", "type": "uint256"},
          {"name": "proof", "type": "bytes"}
        ],
        "name": "zkMint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ],
    bytecode: "0x608060405234801561001057600080fd5b50...",
    parameters: [
      {
        name: 'name',
        type: 'string',
        description: 'Name of the NFT collection',
        required: true
      },
      {
        name: 'symbol',
        type: 'string',
        description: 'Symbol of the NFT collection',
        required: true
      },
      {
        name: 'verifierAddress',
        type: 'address',
        description: 'Address of the ZK verifier contract',
        required: true
      }
    ]
  },

  ERC1155_WITH_ZK: {
    id: 'erc1155-with-zk',
    name: 'ZK-Enabled Multi-Token Contract',
    description: 'ERC-1155 contract with ZK proof verification for minting',
    zkCircuitType: 'snark',
    category: 'token',
    price: '$7.00',
    abi: [
      {
        "inputs": [
          {"name": "uri", "type": "string"},
          {"name": "_verifier", "type": "address"}
        ],
        "name": "constructor",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "inputs": [
          {"name": "to", "type": "address"},
          {"name": "id", "type": "uint256"},
          {"name": "amount", "type": "uint256"},
          {"name": "proof", "type": "bytes"}
        ],
        "name": "zkMint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ],
    bytecode: "0x608060405234801561001057600080fd5b50...",
    parameters: [
      {
        name: 'uri',
        type: 'string',
        description: 'Base URI for token metadata',
        required: true
      },
      {
        name: 'verifierAddress',
        type: 'address',
        description: 'Address of the ZK verifier contract',
        required: true
      }
    ]
  }
};

// Helper functions for template management
export const getTemplateById = (id) => {
  return Object.values(SMART_CONTRACT_TEMPLATES).find(template => template.id === id);
};

export const getTemplatesByCategory = (category) => {
  return Object.values(SMART_CONTRACT_TEMPLATES).filter(template => template.category === category);
};

export const getAllTemplates = () => {
  return Object.values(SMART_CONTRACT_TEMPLATES);
};

export const validateTemplateParameters = (templateId, parameters) => {
  const template = getTemplateById(templateId);
  if (!template) {
    return { valid: false, errors: ['Template not found'] };
  }

  const errors = [];
  
  template.parameters.forEach(param => {
    if (param.required && !parameters[param.name]) {
      errors.push(`${param.name} is required`);
    }
    
    // Type validation
    if (parameters[param.name]) {
      switch (param.type) {
        case 'address':
          if (!/^0x[a-fA-F0-9]{40}$/.test(parameters[param.name])) {
            errors.push(`${param.name} must be a valid Ethereum address`);
          }
          break;
        case 'uint256':
          if (isNaN(parameters[param.name]) || parameters[param.name] < 0) {
            errors.push(`${param.name} must be a positive number`);
          }
          break;
        case 'bytes32':
          if (!/^0x[a-fA-F0-9]{64}$/.test(parameters[param.name])) {
            errors.push(`${param.name} must be a valid bytes32 value`);
          }
          break;
        case 'string':
          if (typeof parameters[param.name] !== 'string' || parameters[param.name].length === 0) {
            errors.push(`${param.name} must be a non-empty string`);
          }
          break;
      }
    }
  });

  return { valid: errors.length === 0, errors };
};

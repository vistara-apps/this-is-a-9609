// Data Models as specified in the PRD

/**
 * User Entity
 * @typedef {Object} User
 * @property {string} userId - Unique identifier for the user
 * @property {string} email - User's email address
 * @property {string} walletAddress - User's Web3 wallet address
 * @property {string} subscriptionTier - User's subscription level (free, pro, enterprise)
 * @property {Date} createdAt - Account creation timestamp
 */

/**
 * ProofRequest Entity
 * @typedef {Object} ProofRequest
 * @property {string} proofRequestId - Unique identifier for the proof request
 * @property {string} userId - ID of the user who created the request
 * @property {string} templateId - ID of the template used
 * @property {Object} parameters - Input parameters for proof generation
 * @property {string} status - Current status (pending, generating, completed, failed)
 * @property {string} generatedProofHash - Hash of the generated proof
 * @property {Date} createdAt - Request creation timestamp
 */

/**
 * TokenRequest Entity
 * @typedef {Object} TokenRequest
 * @property {string} tokenId - Unique identifier for the token
 * @property {string} userId - ID of the user who created the token
 * @property {Object} assetDetails - Details about the real-world asset
 * @property {string} tokenName - Name of the token
 * @property {string} tokenSymbol - Symbol of the token
 * @property {number} totalSupply - Total supply of tokens
 * @property {string} contractAddress - Deployed contract address
 * @property {Date} createdAt - Token creation timestamp
 */

/**
 * Template Entity
 * @typedef {Object} Template
 * @property {string} templateId - Unique identifier for the template
 * @property {string} name - Human-readable name of the template
 * @property {string} description - Description of what the template does
 * @property {string} zkCircuitType - Type of ZK circuit (SNARK, STARK, etc.)
 * @property {Object} smartContractAbi - ABI of the associated smart contract
 * @property {string} smartContractBytecode - Bytecode for contract deployment
 */

// Enums and Constants
export const SUBSCRIPTION_TIERS = {
  FREE: 'free',
  PRO: 'pro',
  ENTERPRISE: 'enterprise'
};

export const PROOF_STATUS = {
  PENDING: 'pending',
  GENERATING: 'generating',
  COMPLETED: 'completed',
  FAILED: 'failed'
};

export const ZK_CIRCUIT_TYPES = {
  SNARK: 'snark',
  STARK: 'stark',
  PLONK: 'plonk'
};

export const TOKEN_STANDARDS = {
  ERC721: 'erc721',
  ERC1155: 'erc1155'
};

// Default values and validation
export const DEFAULT_USER = {
  subscriptionTier: SUBSCRIPTION_TIERS.FREE,
  createdAt: new Date()
};

export const DEFAULT_PROOF_REQUEST = {
  status: PROOF_STATUS.PENDING,
  parameters: {},
  createdAt: new Date()
};

export const DEFAULT_TOKEN_REQUEST = {
  totalSupply: 1,
  createdAt: new Date()
};

// Validation functions
export const validateUser = (user) => {
  const errors = [];
  
  if (!user.email || !/\S+@\S+\.\S+/.test(user.email)) {
    errors.push('Valid email is required');
  }
  
  if (!user.walletAddress || !/^0x[a-fA-F0-9]{40}$/.test(user.walletAddress)) {
    errors.push('Valid wallet address is required');
  }
  
  if (!Object.values(SUBSCRIPTION_TIERS).includes(user.subscriptionTier)) {
    errors.push('Valid subscription tier is required');
  }
  
  return errors;
};

export const validateProofRequest = (proofRequest) => {
  const errors = [];
  
  if (!proofRequest.userId) {
    errors.push('User ID is required');
  }
  
  if (!proofRequest.templateId) {
    errors.push('Template ID is required');
  }
  
  if (!proofRequest.parameters || typeof proofRequest.parameters !== 'object') {
    errors.push('Parameters object is required');
  }
  
  return errors;
};

export const validateTokenRequest = (tokenRequest) => {
  const errors = [];
  
  if (!tokenRequest.userId) {
    errors.push('User ID is required');
  }
  
  if (!tokenRequest.tokenName || tokenRequest.tokenName.length < 1) {
    errors.push('Token name is required');
  }
  
  if (!tokenRequest.tokenSymbol || tokenRequest.tokenSymbol.length < 1) {
    errors.push('Token symbol is required');
  }
  
  if (!tokenRequest.totalSupply || tokenRequest.totalSupply < 1) {
    errors.push('Total supply must be at least 1');
  }
  
  return errors;
};

export const validateTemplate = (template) => {
  const errors = [];
  
  if (!template.name || template.name.length < 1) {
    errors.push('Template name is required');
  }
  
  if (!template.description || template.description.length < 1) {
    errors.push('Template description is required');
  }
  
  if (!Object.values(ZK_CIRCUIT_TYPES).includes(template.zkCircuitType)) {
    errors.push('Valid ZK circuit type is required');
  }
  
  return errors;
};

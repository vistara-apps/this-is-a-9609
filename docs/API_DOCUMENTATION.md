# ZKProofs Factory API Documentation

## Overview

The ZKProofs Factory API provides endpoints for generating zero-knowledge proofs, tokenizing assets, and deploying smart contracts on the Base network. This RESTful API supports micro-transaction payments and provides comprehensive proof generation capabilities.

## Base URL

```
https://api.zkproofs-factory.com
```

## Authentication

All API requests require authentication using Bearer tokens:

```
Authorization: Bearer <your-token>
```

## Rate Limits

- **Free Tier**: 10 requests per minute
- **Pro Tier**: 100 requests per minute  
- **Enterprise Tier**: 1000 requests per minute

## Core Endpoints

### User Management

#### Create User
```http
POST /users
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "walletAddress": "0x742d35Cc6634C0532925a3b8D0C9e3e4c413c123",
  "subscriptionTier": "free"
}
```

**Response:**
```json
{
  "userId": "usr_1234567890",
  "email": "user@example.com",
  "walletAddress": "0x742d35Cc6634C0532925a3b8D0C9e3e4c413c123",
  "subscriptionTier": "free",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

#### Get User Profile
```http
GET /users/profile
```

**Response:**
```json
{
  "userId": "usr_1234567890",
  "email": "user@example.com",
  "walletAddress": "0x742d35Cc6634C0532925a3b8D0C9e3e4c413c123",
  "subscriptionTier": "free",
  "createdAt": "2024-01-15T10:30:00Z",
  "totalProofs": 5,
  "totalTokens": 2
}
```

### ZK Proof Generation

#### Get Available Templates
```http
GET /templates
```

**Response:**
```json
[
  {
    "templateId": "identity-verification",
    "name": "Identity Verification",
    "description": "Verify identity claims without revealing personal information",
    "zkCircuitType": "snark",
    "parameters": ["age", "location", "citizenship"],
    "price": "$1.00"
  },
  {
    "templateId": "membership-proof",
    "name": "Membership Proof", 
    "description": "Prove membership in a group without revealing which group",
    "zkCircuitType": "snark",
    "parameters": ["groupId", "membershipLevel", "validUntil"],
    "price": "$2.00"
  }
]
```

#### Generate ZK Proof
```http
POST /proofs/generate
```

**Request Body:**
```json
{
  "userId": "usr_1234567890",
  "templateId": "identity-verification",
  "parameters": {
    "age": "25",
    "location": "US",
    "citizenship": "US"
  }
}
```

**Response:**
```json
{
  "proofRequestId": "proof_abcd1234",
  "status": "generating",
  "estimatedTime": "2-5 minutes",
  "createdAt": "2024-01-15T10:35:00Z"
}
```

#### Get Proof Status
```http
GET /proofs/{proofId}
```

**Response:**
```json
{
  "proofRequestId": "proof_abcd1234",
  "status": "completed",
  "generatedProofHash": "0x8f7e2b1a9c3d4e5f6789abcdef123456...",
  "publicInputs": ["0x1234", "0x5678"],
  "verificationKey": "0xabcdef123456789...",
  "createdAt": "2024-01-15T10:35:00Z",
  "completedAt": "2024-01-15T10:37:30Z"
}
```

#### Verify ZK Proof
```http
POST /proofs/verify
```

**Request Body:**
```json
{
  "proof": "0x8f7e2b1a9c3d4e5f6789abcdef123456...",
  "publicInputs": ["0x1234", "0x5678"],
  "verificationKey": "0xabcdef123456789..."
}
```

**Response:**
```json
{
  "valid": true,
  "verificationTime": "0.5s",
  "verifiedAt": "2024-01-15T10:40:00Z"
}
```

### Asset Tokenization

#### Create Token
```http
POST /tokens
```

**Request Body:**
```json
{
  "userId": "usr_1234567890",
  "assetDetails": {
    "name": "Vintage Guitar Collection",
    "description": "1965 Fender Stratocaster",
    "image": "https://example.com/guitar.jpg",
    "category": "collectible"
  },
  "tokenName": "VintageGuitar",
  "tokenSymbol": "VG",
  "totalSupply": 1,
  "tokenStandard": "erc721"
}
```

**Response:**
```json
{
  "tokenId": "token_xyz789",
  "userId": "usr_1234567890",
  "tokenName": "VintageGuitar",
  "tokenSymbol": "VG",
  "totalSupply": 1,
  "status": "created",
  "createdAt": "2024-01-15T11:00:00Z"
}
```

#### Deploy Token Contract
```http
POST /tokens/{tokenId}/deploy
```

**Response:**
```json
{
  "tokenId": "token_xyz789",
  "contractAddress": "0x9876543210abcdef...",
  "transactionHash": "0xfedcba0987654321...",
  "blockNumber": 18500000,
  "gasUsed": 250000,
  "deployedAt": "2024-01-15T11:05:00Z"
}
```

#### Mint Tokens
```http
POST /tokens/{tokenId}/mint
```

**Request Body:**
```json
{
  "to": "0x742d35Cc6634C0532925a3b8D0C9e3e4c413c123",
  "amount": 1,
  "metadata": {
    "name": "Vintage Guitar #1",
    "description": "1965 Fender Stratocaster",
    "image": "https://example.com/guitar.jpg"
  }
}
```

**Response:**
```json
{
  "transactionHash": "0x123456789abcdef...",
  "tokenId": "1",
  "to": "0x742d35Cc6634C0532925a3b8D0C9e3e4c413c123",
  "amount": 1,
  "mintedAt": "2024-01-15T11:10:00Z"
}
```

### Smart Contract Templates

#### Get Contract Templates
```http
GET /contracts/templates
```

**Response:**
```json
[
  {
    "templateId": "identity-verification",
    "name": "Identity Verification Contract",
    "description": "Verify identity claims without revealing personal information",
    "category": "identity",
    "price": "$5.00",
    "parameters": [
      {
        "name": "verifierAddress",
        "type": "address",
        "description": "Address of the ZK verifier contract",
        "required": true
      }
    ]
  }
]
```

#### Deploy Smart Contract
```http
POST /contracts/deploy
```

**Request Body:**
```json
{
  "templateId": "identity-verification",
  "parameters": {
    "verifierAddress": "0x1234567890abcdef...",
    "merkleRoot": "0xabcdef1234567890..."
  },
  "userId": "usr_1234567890"
}
```

**Response:**
```json
{
  "contractId": "contract_def456",
  "contractAddress": "0xabcdef123456...",
  "transactionHash": "0x987654321fedcba...",
  "blockNumber": 18500100,
  "gasUsed": 450000,
  "deployedAt": "2024-01-15T11:15:00Z"
}
```

### Base Network Integration

#### Get Gas Price
```http
GET /base/gas-price
```

**Response:**
```json
{
  "gasPrice": "0.000000001",
  "gasPriceGwei": "1",
  "fast": "0.000000002",
  "standard": "0.000000001",
  "safe": "0.0000000008"
}
```

#### Estimate Gas
```http
POST /base/estimate-gas
```

**Request Body:**
```json
{
  "to": "0x742d35Cc6634C0532925a3b8D0C9e3e4c413c123",
  "data": "0x123456789abcdef...",
  "value": "0"
}
```

**Response:**
```json
{
  "gasEstimate": 21000,
  "gasCost": "0.000021",
  "gasCostUSD": "0.05"
}
```

#### Get Transaction Status
```http
GET /base/transaction/{txHash}
```

**Response:**
```json
{
  "transactionHash": "0x123456789abcdef...",
  "status": "confirmed",
  "blockNumber": 18500200,
  "gasUsed": 21000,
  "confirmations": 12,
  "timestamp": "2024-01-15T11:20:00Z"
}
```

### Payment Integration

#### Create Payment Session
```http
POST /payments/session
```

**Request Body:**
```json
{
  "amount": "$2.00",
  "description": "ZK Proof Generation - Membership Proof"
}
```

**Response:**
```json
{
  "sessionId": "pay_session_123",
  "amount": "$2.00",
  "status": "pending",
  "expiresAt": "2024-01-15T11:45:00Z",
  "paymentUrl": "https://payments.vistara.dev/session/pay_session_123"
}
```

#### Confirm Payment
```http
POST /payments/session/{sessionId}/confirm
```

**Request Body:**
```json
{
  "transactionHash": "0xpayment123456...",
  "walletAddress": "0x742d35Cc6634C0532925a3b8D0C9e3e4c413c123"
}
```

**Response:**
```json
{
  "sessionId": "pay_session_123",
  "status": "confirmed",
  "amount": "$2.00",
  "confirmedAt": "2024-01-15T11:25:00Z"
}
```

## Error Responses

All endpoints return consistent error responses:

```json
{
  "error": {
    "code": "INVALID_PARAMETERS",
    "message": "The provided parameters are invalid",
    "details": {
      "field": "age",
      "reason": "Age must be between 0 and 150"
    }
  },
  "timestamp": "2024-01-15T11:30:00Z",
  "requestId": "req_abc123"
}
```

### Common Error Codes

- `INVALID_PARAMETERS` - Request parameters are invalid
- `UNAUTHORIZED` - Authentication required or invalid
- `FORBIDDEN` - Insufficient permissions
- `NOT_FOUND` - Resource not found
- `RATE_LIMITED` - Too many requests
- `PAYMENT_REQUIRED` - Payment required for this operation
- `INTERNAL_ERROR` - Server error

## SDKs and Libraries

### JavaScript/TypeScript
```bash
npm install @zkproofs-factory/sdk
```

### Python
```bash
pip install zkproofs-factory
```

### Go
```bash
go get github.com/zkproofs-factory/go-sdk
```

## Webhooks

Configure webhooks to receive real-time updates:

### Proof Generation Complete
```json
{
  "event": "proof.completed",
  "data": {
    "proofRequestId": "proof_abcd1234",
    "userId": "usr_1234567890",
    "status": "completed",
    "generatedProofHash": "0x8f7e2b1a9c3d4e5f6789abcdef123456..."
  },
  "timestamp": "2024-01-15T11:35:00Z"
}
```

### Contract Deployed
```json
{
  "event": "contract.deployed",
  "data": {
    "contractId": "contract_def456",
    "contractAddress": "0xabcdef123456...",
    "userId": "usr_1234567890"
  },
  "timestamp": "2024-01-15T11:40:00Z"
}
```

## Support

- **Documentation**: https://docs.zkproofs-factory.com
- **API Status**: https://status.zkproofs-factory.com
- **Support Email**: support@zkproofs-factory.com
- **Discord**: https://discord.gg/zkproofs-factory

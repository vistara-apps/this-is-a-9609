# ZKProofs Factory 🏭

> Generate Zero-Knowledge Proofs & Tokenize Assets Instantly

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.1-purple.svg)](https://vitejs.dev/)
[![Base Network](https://img.shields.io/badge/Base-Network-blue.svg)](https://base.org/)

## 🚀 Overview

ZKProofs Factory is a revolutionary web application that democratizes access to zero-knowledge proof technology and asset tokenization. Built for the Base network, it enables non-technical users to generate ZK proofs and tokenize real-world assets through an intuitive, guided workflow.

### ✨ Key Features

- **🔐 No-Code ZK Proof Generator** - Generate zero-knowledge proofs without writing code
- **🪙 Asset Tokenization Workflow** - Convert real-world assets into digital tokens
- **📋 Smart Contract Templates** - Pre-audited templates with integrated ZK verification
- **💰 Micro-Transaction Payments** - Pay-per-proof pricing model ($1-$5 per proof)
- **🌐 Base Network Integration** - Low-cost deployment and transactions
- **🔗 Web3 Wallet Support** - RainbowKit integration for seamless wallet connection

## 🏗️ Architecture

### Tech Stack

- **Frontend**: React 18 + Vite + Tailwind CSS
- **Web3**: RainbowKit + Wagmi + Viem
- **Blockchain**: Base Network (EVM-compatible)
- **Payment**: x402-axios for micro-transactions
- **ZK Circuits**: SNARK, STARK, PLONK support
- **Token Standards**: ERC-721, ERC-1155

### Data Models

```typescript
// Core entities as specified in PRD
User {
  userId: string
  email: string
  walletAddress: string
  subscriptionTier: 'free' | 'pro' | 'enterprise'
  createdAt: Date
}

ProofRequest {
  proofRequestId: string
  userId: string
  templateId: string
  parameters: object
  status: 'pending' | 'generating' | 'completed' | 'failed'
  generatedProofHash: string
  createdAt: Date
}

TokenRequest {
  tokenId: string
  userId: string
  assetDetails: object
  tokenName: string
  tokenSymbol: string
  totalSupply: number
  contractAddress: string
  createdAt: Date
}
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn
- Web3 wallet (MetaMask, Coinbase Wallet, etc.)
- Base network testnet ETH for transactions

### Installation

```bash
# Clone the repository
git clone https://github.com/vistara-apps/zkproofs-factory.git
cd zkproofs-factory

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Start development server
npm run dev
```

### Environment Variables

```bash
VITE_API_BASE_URL=https://api.zkproofs-factory.com
VITE_WALLETCONNECT_PROJECT_ID=your_project_id
VITE_BASE_RPC_URL=https://developer-rpc.base.org
```

## 📖 Usage Guide

### 1. Connect Your Wallet

Click "Connect Wallet" and select your preferred Web3 wallet. Ensure you're connected to the Base network.

### 2. Generate ZK Proofs

1. Click "Generate ZK Proof"
2. Select a proof template (Identity, Membership, Financial)
3. Fill in the required parameters
4. Pay the micro-transaction fee ($1-$5)
5. Wait for proof generation (2-5 minutes)
6. Download or copy your generated proof

### 3. Tokenize Assets

1. Click "Tokenize Asset"
2. Enter asset details (name, description, image)
3. Choose token standard (ERC-721 or ERC-1155)
4. Configure token parameters
5. Pay deployment fee
6. Deploy contract to Base network
7. Mint tokens to your wallet

### 4. Deploy Smart Contracts

1. Click "Smart Contract Templates"
2. Browse available templates by category
3. Select and configure template parameters
4. Pay deployment fee
5. Deploy to Base network
6. Interact with your deployed contract

## 🔧 Development

### Project Structure

```
src/
├── components/          # React components
│   ├── Button.jsx      # Enhanced button component
│   ├── InputForm.jsx   # Form input components
│   ├── ProgressBar.jsx # Progress indicators
│   ├── Modal.jsx       # Modal dialogs
│   └── ...
├── contracts/          # Smart contract templates
│   └── templates.js    # Pre-audited contract templates
├── hooks/              # Custom React hooks
│   └── usePaymentContext.js
├── services/           # API and business logic
│   ├── api.js         # API client configuration
│   └── zkProofService.js # ZK proof generation service
├── types/              # TypeScript definitions
│   └── models.js      # Data model definitions
└── App.jsx            # Main application component
```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run test         # Run tests
```

### Design System

The application uses a consistent design system with:

- **Colors**: Primary (hsl(217, 91%, 60%)), Accent (hsl(180, 64%, 52%))
- **Typography**: Inter font family with responsive sizing
- **Components**: Modular, reusable components with variants
- **Animations**: Smooth transitions and micro-interactions

## 🔌 API Integration

### Base API URL
```
https://api.zkproofs-factory.com
```

### Key Endpoints

- `POST /proofs/generate` - Generate ZK proof
- `POST /tokens` - Create token
- `POST /contracts/deploy` - Deploy smart contract
- `GET /templates` - Get available templates

See [API Documentation](docs/API_DOCUMENTATION.md) for complete reference.

## 🏪 Business Model

### Micro-Transaction Pricing

- **ZK Proof Generation**: $1-$5 per proof
- **Smart Contract Deployment**: $4-$8 per contract
- **Asset Tokenization**: $2-$3 per token

### Subscription Tiers

- **Free**: 10 proofs/month, basic templates
- **Pro**: 100 proofs/month, advanced templates, priority support
- **Enterprise**: Unlimited proofs, custom templates, dedicated support

## 🔒 Security

- **Audited Smart Contracts**: All templates are pre-audited
- **Secure ZK Circuits**: Industry-standard SNARK/STARK implementations
- **Web3 Security**: Non-custodial wallet integration
- **API Security**: Rate limiting, authentication, input validation

## 🌐 Deployment

### Production Build

```bash
npm run build
```

### Docker Deployment

```bash
docker build -t zkproofs-factory .
docker run -p 3000:3000 zkproofs-factory
```

### Environment Configuration

- **Development**: Local development with mock APIs
- **Staging**: Base testnet integration
- **Production**: Base mainnet with full API integration

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [docs.zkproofs-factory.com](https://docs.zkproofs-factory.com)
- **Discord**: [Join our community](https://discord.gg/zkproofs-factory)
- **Email**: support@zkproofs-factory.com
- **GitHub Issues**: [Report bugs](https://github.com/vistara-apps/zkproofs-factory/issues)

## 🗺️ Roadmap

### Phase 1 (Current)
- ✅ ZK Proof Generator
- ✅ Asset Tokenization
- ✅ Smart Contract Templates
- ✅ Base Network Integration

### Phase 2 (Q2 2024)
- 🔄 Asset Marketplace
- 🔄 Advanced ZK Circuits
- 🔄 Multi-chain Support
- 🔄 Mobile App

### Phase 3 (Q3 2024)
- 🔄 Enterprise Features
- 🔄 API Partnerships
- 🔄 Advanced Analytics
- 🔄 Governance Token

## 🙏 Acknowledgments

- [Base](https://base.org/) for the excellent L2 infrastructure
- [RainbowKit](https://www.rainbowkit.com/) for Web3 wallet integration
- [Vite](https://vitejs.dev/) for the blazing-fast build tool
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

---

**Built with ❤️ for the Web3 community**

[Website](https://zkproofs-factory.com) • [Documentation](https://docs.zkproofs-factory.com) • [Discord](https://discord.gg/zkproofs-factory) • [Twitter](https://twitter.com/zkproofsfactory)

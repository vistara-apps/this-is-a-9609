import { useState } from 'react';
import { Shield, Coins, Sparkles, Zap } from 'lucide-react';
import Header from './components/Header';
import FeatureCard from './components/FeatureCard';
import Modal from './components/Modal';
import ZKProofGenerator from './components/ZKProofGenerator';
import AssetTokenizer from './components/AssetTokenizer';

export default function App() {
  const [activeModal, setActiveModal] = useState(null);

  const features = [
    {
      icon: Shield,
      title: "ZK Proof Generator",
      description: "Generate zero-knowledge proofs without writing code. Choose from templates for identity, membership, and financial verification.",
      onClick: () => setActiveModal('zkproof')
    },
    {
      icon: Coins,
      title: "Asset Tokenization",
      description: "Convert real-world assets into digital tokens with a guided workflow. Deploy ERC-721 or ERC-1155 contracts instantly.",
      onClick: () => setActiveModal('tokenize')
    },
    {
      icon: Sparkles,
      title: "Smart Contract Templates",
      description: "Access pre-audited smart contract templates for various use cases with integrated ZK proof verification.",
      onClick: () => alert('Coming soon! Smart contract templates will be available in the next update.')
    },
    {
      icon: Zap,
      title: "Asset Marketplace",
      description: "Trade tokenized assets in a decentralized marketplace with built-in liquidity and discovery features.",
      onClick: () => alert('Coming soon! The asset marketplace is under development.')
    }
  ];

  return (
    <div className="min-h-screen bg-bg">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-primary to-accent animate-float">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            ZKProofs Factory
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Generate Zero-Knowledge Proofs & Tokenize Assets Instantly. 
            Democratizing access to ZK technology and asset tokenization for everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setActiveModal('zkproof')}
              className="px-8 py-4 bg-primary hover:bg-primary/80 text-white font-medium rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <Shield className="w-5 h-5" />
              <span>Generate ZK Proof</span>
            </button>
            <button
              onClick={() => setActiveModal('tokenize')}
              className="px-8 py-4 bg-accent hover:bg-accent/80 text-white font-medium rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <Coins className="w-5 h-5" />
              <span>Tokenize Asset</span>
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              onClick={feature.onClick}
              disabled={index > 1} // Disable marketplace and templates for now
            />
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="text-center p-6 glass-effect rounded-xl">
            <div className="text-3xl font-bold text-primary mb-2">$1-5</div>
            <div className="text-gray-300">Per ZK Proof</div>
          </div>
          <div className="text-center p-6 glass-effect rounded-xl">
            <div className="text-3xl font-bold text-accent mb-2">ERC-721/1155</div>
            <div className="text-gray-300">Token Standards</div>
          </div>
          <div className="text-center p-6 glass-effect rounded-xl">
            <div className="text-3xl font-bold text-primary mb-2">Base Network</div>
            <div className="text-gray-300">Low-Cost Deployment</div>
          </div>
        </div>

        {/* How It Works */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto text-white font-bold">1</div>
              <h3 className="text-lg font-semibold text-white">Connect Wallet</h3>
              <p className="text-gray-400">Connect your Web3 wallet to get started with payments and contract deployment.</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto text-white font-bold">2</div>
              <h3 className="text-lg font-semibold text-white">Choose Service</h3>
              <p className="text-gray-400">Select ZK proof generation or asset tokenization with guided workflows.</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto text-white font-bold">3</div>
              <h3 className="text-lg font-semibold text-white">Deploy & Use</h3>
              <p className="text-gray-400">Pay micro-transaction fees and get your proofs or tokens instantly deployed.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <Modal
        isOpen={activeModal === 'zkproof'}
        onClose={() => setActiveModal(null)}
        title="ZK Proof Generator"
      >
        <ZKProofGenerator 
          isOpen={activeModal === 'zkproof'}
          onClose={() => setActiveModal(null)}
        />
      </Modal>

      <Modal
        isOpen={activeModal === 'tokenize'}
        onClose={() => setActiveModal(null)}
        title="Asset Tokenization"
      >
        <AssetTokenizer 
          isOpen={activeModal === 'tokenize'}
          onClose={() => setActiveModal(null)}
        />
      </Modal>
    </div>
  );
}
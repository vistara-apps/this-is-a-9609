import { useState } from 'react';
import { Coins, Loader2, Check, ExternalLink } from 'lucide-react';
import { usePaymentContext } from '../hooks/usePaymentContext';

const TOKEN_TYPES = [
  {
    id: 'erc721',
    name: 'ERC-721 (NFT)',
    description: 'Unique, non-fungible tokens for one-of-a-kind assets',
    price: '$3.00'
  },
  {
    id: 'erc1155',
    name: 'ERC-1155 (Multi-Token)',
    description: 'Semi-fungible tokens for assets with multiple copies',
    price: '$2.00'
  }
];

export default function AssetTokenizer({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [assetData, setAssetData] = useState({
    name: '',
    description: '',
    image: '',
    type: '',
    tokenName: '',
    tokenSymbol: '',
    totalSupply: '1'
  });
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployedContract, setDeployedContract] = useState(null);
  const [hasPaid, setHasPaid] = useState(false);
  const { createSession } = usePaymentContext();

  const handleInputChange = (field, value) => {
    setAssetData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handlePayment = async () => {
    try {
      const selectedType = TOKEN_TYPES.find(t => t.id === assetData.type);
      await createSession(selectedType.price);
      setHasPaid(true);
    } catch (error) {
      alert('Payment failed: ' + error.message);
    }
  };

  const handleDeploy = async () => {
    if (!hasPaid) {
      await handlePayment();
      return;
    }

    setIsDeploying(true);
    try {
      // Simulate contract deployment
      await new Promise(resolve => setTimeout(resolve, 4000));
      
      const mockContract = {
        address: `0x${Math.random().toString(16).substr(2, 40)}`,
        txHash: `0x${Math.random().toString(16).substr(2, 64)}`,
        network: 'Base',
        tokenId: '1',
        timestamp: new Date().toISOString()
      };
      
      setDeployedContract(mockContract);
      setCurrentStep(4);
    } catch (error) {
      alert('Deployment failed: ' + error.message);
    } finally {
      setIsDeploying(false);
    }
  };

  const resetFlow = () => {
    setCurrentStep(1);
    setAssetData({
      name: '',
      description: '',
      image: '',
      type: '',
      tokenName: '',
      tokenSymbol: '',
      totalSupply: '1'
    });
    setDeployedContract(null);
    setHasPaid(false);
  };

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="flex items-center space-x-2">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step <= currentStep ? 'bg-primary text-white' : 'bg-gray-600 text-gray-300'
            }`}>
              {step}
            </div>
            {step < 4 && (
              <div className={`w-12 h-1 ${
                step < currentStep ? 'bg-primary' : 'bg-gray-600'
              }`} />
            )}
          </div>
        ))}
      </div>

      {currentStep === 1 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Asset Details</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Asset Name</label>
            <input
              type="text"
              value={assetData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-3 py-2 bg-bg border border-white/10 rounded-lg text-white focus:border-primary focus:outline-none"
              placeholder="e.g., Vintage Guitar Collection"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea
              value={assetData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 bg-bg border border-white/10 rounded-lg text-white focus:border-primary focus:outline-none"
              placeholder="Describe your asset in detail..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Image URL (Optional)</label>
            <input
              type="url"
              value={assetData.image}
              onChange={(e) => handleInputChange('image', e.target.value)}
              className="w-full px-3 py-2 bg-bg border border-white/10 rounded-lg text-white focus:border-primary focus:outline-none"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <button
            onClick={handleNext}
            disabled={!assetData.name || !assetData.description}
            className="w-full bg-primary hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Next: Select Token Type
          </button>
        </div>
      )}

      {currentStep === 2 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Select Token Type</h3>
          
          {TOKEN_TYPES.map((type) => (
            <div
              key={type.id}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                assetData.type === type.id 
                  ? 'border-primary bg-primary/10' 
                  : 'border-white/10 hover:border-primary/50'
              }`}
              onClick={() => handleInputChange('type', type.id)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-white">{type.name}</h4>
                  <p className="text-sm text-gray-400 mt-1">{type.description}</p>
                </div>
                <span className="text-accent font-medium">{type.price}</span>
              </div>
            </div>
          ))}

          <div className="flex space-x-3">
            <button
              onClick={handleBack}
              className="flex-1 bg-gray-600 hover:bg-gray-500 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={!assetData.type}
              className="flex-1 bg-primary hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              Next: Token Settings
            </button>
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Token Configuration</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Token Name</label>
            <input
              type="text"
              value={assetData.tokenName}
              onChange={(e) => handleInputChange('tokenName', e.target.value)}
              className="w-full px-3 py-2 bg-bg border border-white/10 rounded-lg text-white focus:border-primary focus:outline-none"
              placeholder="e.g., Vintage Guitar Token"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Token Symbol</label>
            <input
              type="text"
              value={assetData.tokenSymbol}
              onChange={(e) => handleInputChange('tokenSymbol', e.target.value.toUpperCase())}
              className="w-full px-3 py-2 bg-bg border border-white/10 rounded-lg text-white focus:border-primary focus:outline-none"
              placeholder="e.g., VGT"
              maxLength={6}
            />
          </div>

          {assetData.type === 'erc1155' && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Total Supply</label>
              <input
                type="number"
                value={assetData.totalSupply}
                onChange={(e) => handleInputChange('totalSupply', e.target.value)}
                className="w-full px-3 py-2 bg-bg border border-white/10 rounded-lg text-white focus:border-primary focus:outline-none"
                min="1"
              />
            </div>
          )}

          <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
            <h4 className="font-medium text-white mb-2">Review Your Asset</h4>
            <div className="space-y-2 text-sm">
              <div><span className="text-gray-400">Name:</span> <span className="text-white">{assetData.name}</span></div>
              <div><span className="text-gray-400">Type:</span> <span className="text-white">{TOKEN_TYPES.find(t => t.id === assetData.type)?.name}</span></div>
              <div><span className="text-gray-400">Symbol:</span> <span className="text-white">{assetData.tokenSymbol}</span></div>
              <div><span className="text-gray-400">Supply:</span> <span className="text-white">{assetData.totalSupply}</span></div>
              <div><span className="text-gray-400">Cost:</span> <span className="text-accent">{TOKEN_TYPES.find(t => t.id === assetData.type)?.price}</span></div>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={handleBack}
              className="flex-1 bg-gray-600 hover:bg-gray-500 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleDeploy}
              disabled={isDeploying || !assetData.tokenName || !assetData.tokenSymbol}
              className="flex-1 flex items-center justify-center space-x-2 bg-primary hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              {isDeploying ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Deploying Contract...</span>
                </>
              ) : (
                <>
                  <Coins className="w-4 h-4" />
                  <span>{hasPaid ? 'Deploy Contract' : 'Pay & Deploy'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {currentStep === 4 && deployedContract && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-green-400">
            <Check className="w-5 h-5" />
            <span className="font-medium">Asset Successfully Tokenized!</span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Contract Address</label>
              <div className="flex items-center space-x-2">
                <code className="flex-1 px-3 py-2 bg-bg border border-white/10 rounded-lg text-accent text-sm font-mono">
                  {deployedContract.address}
                </code>
                <a
                  href={`https://basescan.org/address/${deployedContract.address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </a>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Transaction Hash</label>
              <div className="flex items-center space-x-2">
                <code className="flex-1 px-3 py-2 bg-bg border border-white/10 rounded-lg text-accent text-sm font-mono">
                  {deployedContract.txHash}
                </code>
                <a
                  href={`https://basescan.org/tx/${deployedContract.txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </a>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Network</label>
              <div className="px-3 py-2 bg-bg border border-white/10 rounded-lg text-gray-300 text-sm">
                {deployedContract.network}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Token ID</label>
              <div className="px-3 py-2 bg-bg border border-white/10 rounded-lg text-gray-300 text-sm">
                {deployedContract.tokenId}
              </div>
            </div>
          </div>

          <button
            onClick={resetFlow}
            className="w-full bg-accent hover:bg-accent/80 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Tokenize Another Asset
          </button>
        </div>
      )}
    </div>
  );
}
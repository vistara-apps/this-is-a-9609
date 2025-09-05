import { useState, useEffect } from 'react';
import { Code, Shield, Users, DollarSign, Coins, FileText, ExternalLink, Copy, Check } from 'lucide-react';
import { getAllTemplates, getTemplatesByCategory, validateTemplateParameters } from '../contracts/templates';
import Button from './Button';
import InputForm from './InputForm';
import ProgressBar from './ProgressBar';
import { usePaymentContext } from '../hooks/usePaymentContext';

const CATEGORY_ICONS = {
  identity: Shield,
  membership: Users,
  financial: DollarSign,
  nft: Coins,
  token: FileText
};

const SmartContractTemplates = ({ isOpen, onClose }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [parameters, setParameters] = useState({});
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployProgress, setDeployProgress] = useState(0);
  const [deployedContract, setDeployedContract] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [hasPaid, setHasPaid] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  
  const { createSession } = usePaymentContext();
  const templates = getAllTemplates();
  const categories = ['all', ...new Set(templates.map(t => t.category))];

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : getTemplatesByCategory(selectedCategory);

  useEffect(() => {
    if (selectedTemplate) {
      // Reset form when template changes
      setParameters({});
      setValidationErrors({});
      setHasPaid(false);
      setDeployedContract(null);
    }
  }, [selectedTemplate]);

  const handleParameterChange = (paramName, value) => {
    setParameters(prev => ({ ...prev, [paramName]: value }));
    
    // Clear validation error for this field
    if (validationErrors[paramName]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[paramName];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    if (!selectedTemplate) return false;
    
    const validation = validateTemplateParameters(selectedTemplate.id, parameters);
    
    if (!validation.valid) {
      const errors = {};
      validation.errors.forEach(error => {
        const paramName = error.split(' ')[0];
        errors[paramName] = error;
      });
      setValidationErrors(errors);
      return false;
    }
    
    setValidationErrors({});
    return true;
  };

  const handlePayment = async () => {
    if (!validateForm()) return;
    
    try {
      await createSession(selectedTemplate.price);
      setHasPaid(true);
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    }
  };

  const handleDeploy = async () => {
    if (!hasPaid || !validateForm()) return;
    
    setIsDeploying(true);
    setDeployProgress(0);
    
    try {
      // Simulate deployment progress
      const progressSteps = [
        { step: 'Compiling contract...', progress: 20 },
        { step: 'Estimating gas...', progress: 40 },
        { step: 'Deploying to Base network...', progress: 70 },
        { step: 'Verifying deployment...', progress: 90 },
        { step: 'Contract deployed successfully!', progress: 100 }
      ];
      
      for (const { step, progress } of progressSteps) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        setDeployProgress(progress);
      }
      
      // Mock deployed contract data
      const mockContractAddress = `0x${Math.random().toString(16).substr(2, 40)}`;
      setDeployedContract({
        address: mockContractAddress,
        transactionHash: `0x${Math.random().toString(16).substr(2, 64)}`,
        blockNumber: Math.floor(Math.random() * 1000000) + 18000000,
        gasUsed: Math.floor(Math.random() * 500000) + 100000,
        template: selectedTemplate,
        parameters: parameters,
        deployedAt: new Date().toISOString()
      });
      
    } catch (error) {
      console.error('Deployment failed:', error);
      alert('Deployment failed. Please try again.');
    } finally {
      setIsDeploying(false);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const resetForm = () => {
    setSelectedTemplate(null);
    setParameters({});
    setValidationErrors({});
    setHasPaid(false);
    setDeployedContract(null);
    setDeployProgress(0);
  };

  if (!isOpen) return null;

  return (
    <div className="space-y-6">
      {!selectedTemplate ? (
        // Template Selection View
        <>
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-surface text-gray-300 hover:bg-surface/80'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTemplates.map(template => {
              const IconComponent = CATEGORY_ICONS[template.category] || Code;
              
              return (
                <div
                  key={template.id}
                  className="p-6 glass-effect rounded-xl hover:bg-surface/20 transition-colors cursor-pointer"
                  onClick={() => setSelectedTemplate(template)}
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-primary/20 rounded-lg">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {template.name}
                      </h3>
                      <p className="text-gray-300 text-sm mb-3">
                        {template.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-accent font-medium">
                          {template.price}
                        </span>
                        <span className="text-xs text-gray-400 bg-surface px-2 py-1 rounded">
                          {template.zkCircuitType.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : deployedContract ? (
        // Success View
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
            <Check className="w-8 h-8 text-green-500" />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Contract Deployed Successfully!
            </h3>
            <p className="text-gray-300">
              Your {selectedTemplate.name} has been deployed to the Base network.
            </p>
          </div>

          <div className="bg-surface p-6 rounded-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Contract Address:</span>
              <div className="flex items-center space-x-2">
                <code className="text-accent font-mono text-sm">
                  {deployedContract.address}
                </code>
                <button
                  onClick={() => copyToClipboard(deployedContract.address)}
                  className="p-1 hover:bg-surface/50 rounded transition-colors"
                >
                  {copiedAddress ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Transaction Hash:</span>
              <code className="text-accent font-mono text-sm">
                {deployedContract.transactionHash.slice(0, 10)}...
              </code>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Gas Used:</span>
              <span className="text-white">{deployedContract.gasUsed.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex space-x-4">
            <Button
              variant="outline"
              onClick={resetForm}
              className="flex-1"
            >
              Deploy Another
            </Button>
            <Button
              variant="primary"
              icon={ExternalLink}
              onClick={() => window.open(`https://basescan.org/address/${deployedContract.address}`, '_blank')}
              className="flex-1"
            >
              View on BaseScan
            </Button>
          </div>
        </div>
      ) : (
        // Configuration View
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSelectedTemplate(null)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ← Back
            </button>
            <div>
              <h3 className="text-xl font-bold text-white">
                {selectedTemplate.name}
              </h3>
              <p className="text-gray-300 text-sm">
                {selectedTemplate.description}
              </p>
            </div>
          </div>

          {isDeploying ? (
            <div className="text-center space-y-6">
              <ProgressBar 
                progress={deployProgress} 
                variant="linear" 
                animated={true}
                className="mb-4"
              />
              <p className="text-gray-300">
                Deploying your smart contract to Base network...
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white">
                  Contract Parameters
                </h4>
                
                {selectedTemplate.parameters.map(param => (
                  <InputForm
                    key={param.name}
                    label={param.name}
                    variant={param.type === 'string' ? 'text' : param.type === 'uint256' ? 'number' : 'text'}
                    placeholder={param.description}
                    value={parameters[param.name] || ''}
                    onChange={(value) => handleParameterChange(param.name, value)}
                    error={validationErrors[param.name]}
                    required={param.required}
                    helperText={param.description}
                  />
                ))}
              </div>

              <div className="bg-surface p-4 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300">Deployment Cost:</span>
                  <span className="text-accent font-bold text-lg">
                    {selectedTemplate.price}
                  </span>
                </div>
                <p className="text-gray-400 text-sm">
                  Includes contract deployment, verification, and gas fees on Base network.
                </p>
              </div>

              <div className="flex space-x-4">
                {!hasPaid ? (
                  <Button
                    variant="primary"
                    onClick={handlePayment}
                    disabled={!validateForm()}
                    className="flex-1"
                  >
                    Pay & Deploy Contract
                  </Button>
                ) : (
                  <Button
                    variant="success"
                    onClick={handleDeploy}
                    loading={isDeploying}
                    className="flex-1"
                  >
                    Deploy to Base Network
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SmartContractTemplates;

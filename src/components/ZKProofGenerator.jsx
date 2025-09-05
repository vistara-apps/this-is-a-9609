import { useState } from 'react';
import { Shield, Loader2, Check, Copy } from 'lucide-react';
import { usePaymentContext } from '../hooks/usePaymentContext';

const ZK_TEMPLATES = [
  {
    id: 'identity',
    name: 'Identity Verification',
    description: 'Prove your identity without revealing personal information',
    parameters: ['age', 'location', 'citizenship'],
    price: '$1.00'
  },
  {
    id: 'membership',
    name: 'Membership Proof',
    description: 'Prove membership in a group without revealing which group',
    parameters: ['groupId', 'membershipLevel', 'validUntil'],
    price: '$2.00'
  },
  {
    id: 'financial',
    name: 'Financial Standing',
    description: 'Prove financial capability without revealing exact amounts',
    parameters: ['minBalance', 'creditScore', 'income'],
    price: '$3.00'
  }
];

export default function ZKProofGenerator({ isOpen, onClose }) {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [parameters, setParameters] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedProof, setGeneratedProof] = useState(null);
  const [hasPaid, setHasPaid] = useState(false);
  const { createSession } = usePaymentContext();

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setParameters({});
    setGeneratedProof(null);
    setHasPaid(false);
  };

  const handleParameterChange = (param, value) => {
    setParameters(prev => ({ ...prev, [param]: value }));
  };

  const handlePayment = async () => {
    try {
      await createSession(selectedTemplate.price);
      setHasPaid(true);
    } catch (error) {
      alert('Payment failed: ' + error.message);
    }
  };

  const handleGenerateProof = async () => {
    if (!hasPaid) {
      await handlePayment();
      return;
    }

    setIsGenerating(true);
    try {
      // Simulate ZK proof generation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockProof = {
        proof: `0x${Math.random().toString(16).substr(2, 64)}`,
        publicInputs: Object.values(parameters),
        verificationKey: `0x${Math.random().toString(16).substr(2, 40)}`,
        timestamp: new Date().toISOString()
      };
      
      setGeneratedProof(mockProof);
    } catch (error) {
      alert('Proof generation failed: ' + error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      {!selectedTemplate ? (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white mb-4">Select a ZK Proof Template</h3>
          {ZK_TEMPLATES.map((template) => (
            <div
              key={template.id}
              className="p-4 border border-white/10 rounded-lg hover:border-primary/50 cursor-pointer transition-colors"
              onClick={() => handleTemplateSelect(template)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-white">{template.name}</h4>
                  <p className="text-sm text-gray-400 mt-1">{template.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {template.parameters.map((param) => (
                      <span key={param} className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">
                        {param}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="text-accent font-medium">{template.price}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSelectedTemplate(null)}
              className="text-accent hover:text-accent/80 text-sm"
            >
              ← Back to Templates
            </button>
          </div>

          <div className="border border-white/10 rounded-lg p-4">
            <h4 className="font-medium text-white">{selectedTemplate.name}</h4>
            <p className="text-sm text-gray-400 mt-1">{selectedTemplate.description}</p>
            <span className="text-accent font-medium text-sm">Price: {selectedTemplate.price}</span>
          </div>

          {!generatedProof ? (
            <div className="space-y-4">
              <h4 className="font-medium text-white">Input Parameters</h4>
              {selectedTemplate.parameters.map((param) => (
                <div key={param}>
                  <label className="block text-sm font-medium text-gray-300 mb-2 capitalize">
                    {param.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <input
                    type="text"
                    value={parameters[param] || ''}
                    onChange={(e) => handleParameterChange(param, e.target.value)}
                    className="w-full px-3 py-2 bg-bg border border-white/10 rounded-lg text-white focus:border-primary focus:outline-none"
                    placeholder={`Enter ${param}`}
                  />
                </div>
              ))}

              <button
                onClick={handleGenerateProof}
                disabled={isGenerating || Object.keys(parameters).length !== selectedTemplate.parameters.length}
                className="w-full flex items-center justify-center space-x-2 bg-primary hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Generating Proof...</span>
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4" />
                    <span>{hasPaid ? 'Generate ZK Proof' : `Pay ${selectedTemplate.price} & Generate`}</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-green-400">
                <Check className="w-5 h-5" />
                <span className="font-medium">ZK Proof Generated Successfully!</span>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Proof Hash</label>
                  <div className="flex items-center space-x-2">
                    <code className="flex-1 px-3 py-2 bg-bg border border-white/10 rounded-lg text-accent text-sm font-mono">
                      {generatedProof.proof}
                    </code>
                    <button
                      onClick={() => copyToClipboard(generatedProof.proof)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <Copy className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Verification Key</label>
                  <div className="flex items-center space-x-2">
                    <code className="flex-1 px-3 py-2 bg-bg border border-white/10 rounded-lg text-accent text-sm font-mono">
                      {generatedProof.verificationKey}
                    </code>
                    <button
                      onClick={() => copyToClipboard(generatedProof.verificationKey)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <Copy className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Generated At</label>
                  <div className="px-3 py-2 bg-bg border border-white/10 rounded-lg text-gray-300 text-sm">
                    {new Date(generatedProof.timestamp).toLocaleString()}
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedTemplate(null);
                  setGeneratedProof(null);
                  setHasPaid(false);
                }}
                className="w-full bg-accent hover:bg-accent/80 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                Generate Another Proof
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
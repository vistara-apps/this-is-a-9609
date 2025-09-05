import { zkProofAPI } from './api';

// ZK Proof Generation Service
// Handles the complex process of generating zero-knowledge proofs

export class ZKProofService {
  constructor() {
    this.supportedCircuits = ['snark', 'stark', 'plonk'];
    this.templates = new Map();
  }

  // Initialize the service with available templates
  async initialize() {
    try {
      const response = await zkProofAPI.getTemplates();
      response.data.forEach(template => {
        this.templates.set(template.id, template);
      });
      return true;
    } catch (error) {
      console.error('Failed to initialize ZK Proof Service:', error);
      return false;
    }
  }

  // Get all available proof templates
  getAvailableTemplates() {
    return Array.from(this.templates.values());
  }

  // Get a specific template by ID
  getTemplate(templateId) {
    return this.templates.get(templateId);
  }

  // Validate proof parameters against template requirements
  validateParameters(templateId, parameters) {
    const template = this.getTemplate(templateId);
    if (!template) {
      return { valid: false, errors: ['Template not found'] };
    }

    const errors = [];
    
    // Check required parameters
    template.parameters.forEach(param => {
      if (param.required && !parameters[param]) {
        errors.push(`${param} is required`);
      }
    });

    // Type-specific validation
    if (templateId === 'identity') {
      if (parameters.age && (parameters.age < 0 || parameters.age > 150)) {
        errors.push('Age must be between 0 and 150');
      }
      if (parameters.location && typeof parameters.location !== 'string') {
        errors.push('Location must be a string');
      }
    }

    if (templateId === 'membership') {
      if (parameters.membershipLevel && !['basic', 'premium', 'vip'].includes(parameters.membershipLevel)) {
        errors.push('Membership level must be basic, premium, or vip');
      }
    }

    if (templateId === 'financial') {
      if (parameters.minBalance && parameters.minBalance < 0) {
        errors.push('Minimum balance must be positive');
      }
      if (parameters.creditScore && (parameters.creditScore < 300 || parameters.creditScore > 850)) {
        errors.push('Credit score must be between 300 and 850');
      }
    }

    return { valid: errors.length === 0, errors };
  }

  // Generate a ZK proof
  async generateProof(templateId, parameters, userId) {
    try {
      // Validate parameters first
      const validation = this.validateParameters(templateId, parameters);
      if (!validation.valid) {
        throw new Error(`Invalid parameters: ${validation.errors.join(', ')}`);
      }

      // Create proof request
      const proofRequest = {
        userId,
        templateId,
        parameters,
        status: 'pending'
      };

      // Submit to API
      const response = await zkProofAPI.generateProof(proofRequest);
      
      return {
        success: true,
        proofId: response.data.proofId,
        status: response.data.status,
        estimatedTime: response.data.estimatedTime || '2-5 minutes'
      };

    } catch (error) {
      console.error('Proof generation failed:', error);
      return {
        success: false,
        error: error.message || 'Failed to generate proof'
      };
    }
  }

  // Check proof generation status
  async checkProofStatus(proofId) {
    try {
      const response = await zkProofAPI.getProof(proofId);
      return {
        success: true,
        status: response.data.status,
        proof: response.data.generatedProofHash,
        publicInputs: response.data.publicInputs,
        verificationKey: response.data.verificationKey
      };
    } catch (error) {
      console.error('Failed to check proof status:', error);
      return {
        success: false,
        error: error.message || 'Failed to check proof status'
      };
    }
  }

  // Verify a ZK proof
  async verifyProof(proof, publicInputs, verificationKey) {
    try {
      const response = await zkProofAPI.verifyProof({
        proof,
        publicInputs,
        verificationKey
      });

      return {
        success: true,
        valid: response.data.valid,
        verificationTime: response.data.verificationTime
      };
    } catch (error) {
      console.error('Proof verification failed:', error);
      return {
        success: false,
        error: error.message || 'Failed to verify proof'
      };
    }
  }

  // Get user's proof history
  async getUserProofs(userId) {
    try {
      const response = await zkProofAPI.getUserProofs(userId);
      return {
        success: true,
        proofs: response.data.map(proof => ({
          id: proof.proofRequestId,
          templateId: proof.templateId,
          status: proof.status,
          createdAt: proof.createdAt,
          parameters: proof.parameters,
          proofHash: proof.generatedProofHash
        }))
      };
    } catch (error) {
      console.error('Failed to get user proofs:', error);
      return {
        success: false,
        error: error.message || 'Failed to get proof history'
      };
    }
  }

  // Estimate proof generation cost
  estimateCost(templateId, parameters) {
    const template = this.getTemplate(templateId);
    if (!template) {
      return { error: 'Template not found' };
    }

    // Base costs by template type
    const baseCosts = {
      identity: 1.00,
      membership: 2.00,
      financial: 3.00
    };

    let cost = baseCosts[templateId] || 2.00;

    // Add complexity multipliers
    const paramCount = Object.keys(parameters).length;
    if (paramCount > 3) {
      cost *= 1.2; // 20% increase for complex proofs
    }

    return {
      baseCost: baseCosts[templateId] || 2.00,
      complexityMultiplier: paramCount > 3 ? 1.2 : 1.0,
      totalCost: cost,
      currency: 'USD'
    };
  }

  // Format proof for display
  formatProofForDisplay(proof) {
    if (!proof) return null;

    return {
      hash: proof.slice(0, 10) + '...' + proof.slice(-10),
      fullHash: proof,
      length: proof.length,
      algorithm: 'SNARK', // Default, could be determined from proof structure
      verified: false // Would need to check verification status
    };
  }

  // Export proof data
  exportProof(proofData, format = 'json') {
    const exportData = {
      proof: proofData.proof,
      publicInputs: proofData.publicInputs,
      verificationKey: proofData.verificationKey,
      templateId: proofData.templateId,
      generatedAt: new Date().toISOString(),
      version: '1.0'
    };

    switch (format) {
      case 'json':
        return JSON.stringify(exportData, null, 2);
      case 'base64':
        return btoa(JSON.stringify(exportData));
      default:
        return exportData;
    }
  }
}

// Create singleton instance
export const zkProofService = new ZKProofService();

// Initialize on module load
zkProofService.initialize().catch(console.error);

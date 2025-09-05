import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <header className="glass-effect border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-primary to-accent animate-glow">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">ZKProofs Factory</h1>
              <p className="text-xs text-gray-400">Generate Zero-Knowledge Proofs & Tokenize Assets</p>
            </div>
          </div>
          <ConnectButton />
        </div>
      </div>
    </header>
  );
}
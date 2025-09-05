import { ArrowRight } from 'lucide-react';

export default function FeatureCard({ icon: Icon, title, description, onClick, disabled = false }) {
  return (
    <div 
      className={`gradient-border cursor-pointer transform transition-all duration-200 hover:scale-105 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={!disabled ? onClick : undefined}
    >
      <div className="gradient-border-inner p-6 h-full flex flex-col">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-3 rounded-lg bg-primary/20">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
        <p className="text-gray-300 mb-4 flex-grow">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-accent text-sm font-medium">Get Started</span>
          <ArrowRight className="w-4 h-4 text-accent" />
        </div>
      </div>
    </div>
  );
}
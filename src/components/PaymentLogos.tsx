import React from 'react';
import { Smartphone } from 'lucide-react';

interface PaymentLogosProps {
  color: string;
}

export default function PaymentLogos({ color }: PaymentLogosProps) {
  return (
    <div className="border-t pt-4" style={{ borderColor: color + '20' }}>
      <p className="text-center text-sm mb-2" style={{ color }}>
        Supported Apps
      </p>
      <div className="flex justify-center items-center space-x-4">
        <div className="flex flex-col items-center">
          <Smartphone className="h-6 w-6" style={{ color: '#00C853' }} />
          <span className="text-xs mt-1" style={{ color }}>GPay</span>
        </div>
        <div className="flex flex-col items-center">
          <Smartphone className="h-6 w-6" style={{ color: '#673AB7' }} />
          <span className="text-xs mt-1" style={{ color }}>PhonePe</span>
        </div>
        <div className="flex flex-col items-center">
          <Smartphone className="h-6 w-6" style={{ color: '#2196F3' }} />
          <span className="text-xs mt-1" style={{ color }}>Paytm</span>
        </div>
        <div className="flex flex-col items-center">
          <Smartphone className="h-6 w-6" style={{ color: '#FF9900' }} />
          <span className="text-xs mt-1" style={{ color }}>Amazon</span>
        </div>
      </div>
    </div>
  );
}
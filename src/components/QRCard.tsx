import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Copy, Download } from 'lucide-react';
import PaymentLogos from './PaymentLogos';
import { downloadQRCard } from '../utils/download';
import type { QRStyle, CardStyle } from './StyleCustomizer';

interface QRCardProps {
  merchantName: string;
  amount: string;
  description: string;
  qrValue: string;
  qrStyle: QRStyle;
  cardStyle: CardStyle;
  onCopy: () => void;
}

export default function QRCard({
  merchantName,
  amount,
  description,
  qrValue,
  qrStyle,
  cardStyle,
  onCopy,
}: QRCardProps) {
  const handleDownload = () => {
    downloadQRCard('qr-card', `${merchantName}-qr-card.png`);
  };

  return (
    <div className="p-6 md:w-1/2 bg-gray-50 flex flex-col items-center justify-center">
      <div 
        id="qr-card" 
        className="p-6 rounded-lg shadow-sm w-full max-w-sm"
        style={{ backgroundColor: cardStyle.bgColor }}
      >
        <div className="text-center mb-4">
          <h3 
            className="font-semibold text-lg"
            style={{ color: cardStyle.textColor }}
          >
            {merchantName}
          </h3>
          <p 
            className="text-2xl font-bold"
            style={{ color: cardStyle.accentColor }}
          >
            ₹{amount}
          </p>
          {description && (
            <p 
              className="text-sm mt-1"
              style={{ color: cardStyle.textColor }}
            >
              {description}
            </p>
          )}
        </div>
        
        <div className="flex justify-center mb-4">
          <QRCodeSVG
            value={qrValue}
            size={qrStyle.size}
            level="H"
            includeMargin={true}
            fgColor={qrStyle.fgColor}
            bgColor={qrStyle.bgColor}
            style={{
              borderRadius: qrStyle.cornerType === 'rounded' ? '10px' : '0',
            }}
          />
        </div>

        <PaymentLogos color={cardStyle.textColor} />
      </div>

      <div className="mt-4 flex justify-center space-x-2">
        <button
          onClick={handleDownload}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Download className="h-4 w-4 mr-2" />
          Download QR Card
        </button>
        <button
          onClick={onCopy}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Copy className="h-4 w-4 mr-2" />
          Copy UPI Link
        </button>
      </div>
    </div>
  );
}
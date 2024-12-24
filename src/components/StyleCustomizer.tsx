import React from 'react';
import { Palette } from 'lucide-react';

interface StyleCustomizerProps {
  qrStyle: QRStyle;
  cardStyle: CardStyle;
  onStyleChange: (type: 'qr' | 'card', style: Partial<QRStyle | CardStyle>) => void;
}

export interface QRStyle {
  fgColor: string;
  bgColor: string;
  cornerType: 'square' | 'rounded';
  size: number;
}

export interface CardStyle {
  bgColor: string;
  textColor: string;
  accentColor: string;
}

export default function StyleCustomizer({ qrStyle, cardStyle, onStyleChange }: StyleCustomizerProps) {
  return (
    <div className="border-t mt-6 pt-6">
      <div className="flex items-center gap-2 mb-4">
        <Palette className="h-5 w-5 text-indigo-600" />
        <h3 className="font-medium text-gray-900">Customize Style</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">QR Code Style</h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Foreground Color</label>
              <input
                type="color"
                value={qrStyle.fgColor}
                onChange={(e) => onStyleChange('qr', { fgColor: e.target.value })}
                className="h-8 w-full"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Background Color</label>
              <input
                type="color"
                value={qrStyle.bgColor}
                onChange={(e) => onStyleChange('qr', { bgColor: e.target.value })}
                className="h-8 w-full"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs text-gray-500 mb-1">Corner Style</label>
              <select
                value={qrStyle.cornerType}
                onChange={(e) => onStyleChange('qr', { cornerType: e.target.value as 'square' | 'rounded' })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm p-2 border"
              >
                <option value="square">Square</option>
                <option value="rounded">Rounded</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Card Style</h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Background Color</label>
              <input
                type="color"
                value={cardStyle.bgColor}
                onChange={(e) => onStyleChange('card', { bgColor: e.target.value })}
                className="h-8 w-full"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Text Color</label>
              <input
                type="color"
                value={cardStyle.textColor}
                onChange={(e) => onStyleChange('card', { textColor: e.target.value })}
                className="h-8 w-full"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs text-gray-500 mb-1">Accent Color</label>
              <input
                type="color"
                value={cardStyle.accentColor}
                onChange={(e) => onStyleChange('card', { accentColor: e.target.value })}
                className="h-8 w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
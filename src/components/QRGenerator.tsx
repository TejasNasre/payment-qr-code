import React, { useState } from "react";
import { QrCode } from "lucide-react";
import QRCard from "./QRCard";
import QRSkeleton from "./QRSkeleton";
import StyleCustomizer, { QRStyle, CardStyle } from "./StyleCustomizer";

interface FormData {
  merchantName: string;
  paymentType: string;
  paymentAddress: string;
  amount: string;
  description: string;
}

export default function QRGenerator() {
  const [formData, setFormData] = useState<FormData>({
    merchantName: "",
    paymentType: "upi",
    paymentAddress: "",
    amount: "",
    description: "",
  });

  const [qrStyle, setQRStyle] = useState<QRStyle>({
    fgColor: "#000000",
    bgColor: "#ffffff",
    cornerType: "square",
    size: 200,
  });

  const [cardStyle, setCardStyle] = useState<CardStyle>({
    bgColor: "#ffffff",
    textColor: "#1f2937",
    accentColor: "#4f46e5",
  });

  const [isLoading, setIsLoading] = useState(false);

  const generateUPIString = () => {
    const upiString = `upi://pay?pa=${
      formData.paymentAddress
    }&pn=${encodeURIComponent(formData.merchantName)}&am=${formData.amount}${
      formData.description
        ? `&tn=${encodeURIComponent(formData.description)}`
        : ""
    }`;
    return upiString;
  };

  const handleInputChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const newFormData = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    setFormData(newFormData);

    if (
      newFormData.merchantName &&
      newFormData.paymentAddress &&
      newFormData.amount
    ) {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsLoading(false);
    }
  };

  const handleStyleChange = (
    type: "qr" | "card",
    style: Partial<QRStyle | CardStyle>
  ) => {
    if (type === "qr") {
      setQRStyle((prev) => ({ ...prev, ...style }));
    } else {
      setCardStyle((prev) => ({ ...prev, ...style }));
    }
  };

  const copyUPIString = () => {
    navigator.clipboard.writeText(generateUPIString());
  };

  const showQR =
    formData.merchantName && formData.paymentAddress && formData.amount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <QrCode className="mx-auto h-12 w-12 text-indigo-600" />
          <h1 className="mt-3 text-3xl font-bold text-gray-900">
            BHIM UPI QR Generator
          </h1>
          <p className="mt-2 text-gray-600">
            Generate QR codes for UPI payments compatible with all major apps
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden md:flex">
          <div className="p-6 md:w-1/2">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Merchant Name
                </label>
                <input
                  type="text"
                  name="merchantName"
                  value={formData.merchantName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  placeholder="Enter merchant name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Payment Type
                </label>
                <select
                  name="paymentType"
                  value={formData.paymentType}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                >
                  <option value="upi">UPI ID</option>
                  <option value="mobile">Mobile Number</option>
                  <option value="bank">Bank Account</option>
                  <option value="aadhar">Aadhar Number</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Payment Address
                </label>
                <input
                  type="text"
                  name="paymentAddress"
                  value={formData.paymentAddress}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  placeholder="Enter UPI ID / Mobile / Account Number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Amount (₹)
                </label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  placeholder="Enter amount"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description (Optional)
                </label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  placeholder="Enter payment description"
                />
              </div>

              <StyleCustomizer
                qrStyle={qrStyle}
                cardStyle={cardStyle}
                onStyleChange={handleStyleChange}
              />
            </div>
          </div>

          {showQR &&
            (isLoading ? (
              <QRSkeleton />
            ) : (
              <QRCard
                merchantName={formData.merchantName}
                amount={formData.amount}
                description={formData.description}
                qrValue={generateUPIString()}
                qrStyle={qrStyle}
                cardStyle={cardStyle}
                onCopy={copyUPIString}
              />
            ))}
        </div>
      </div>
      <div
        style={{
          backgroundColor: "#f0f0f0",
          padding: "10px",
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        <p className="font-mono">
          Crafted with 💖 by{" "}
          <a
            href="https://tejasnasre.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:underline"
          >
            Tejas Nasre
          </a>{" "}
          and powered by AI. Enjoy seamless UPI payments!
        </p>
      </div>
    </div>
  );
}

import html2canvas from 'html2canvas';

export const downloadQRCard = async (elementId: string, fileName: string = 'upi-qr-card.png') => {
  try {
    const element = document.getElementById(elementId);
    if (!element) return;

    const canvas = await html2canvas(element, {
      backgroundColor: '#ffffff',
      scale: 2, // Higher quality
    });

    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = fileName;
    link.href = url;
    link.click();
  } catch (error) {
    console.error('Error downloading QR card:', error);
  }
};
import en from '@/translations/en.json';
import QRCodeContent from './content'

export const metadata = {
  title: en.Tools.QRCode.Name,
  description: 'Generate QR codes from text or URLs. Customize size and error correction, then download PNG/SVG for web or print.',
  keywords: [
    'devtools',
    'qr code generator',
    'qr generator online',
    'qrcode from url',
    'qr code png',
    'create qr code',
    'qr code download',
    'qr code generator free',
    'generate qrcode',
    'text to qr code',
    'custom qr code',
    'qr code svg',
    'qr code maker',
    'free qr code generator',
    'qr code creator',
    'qr code tool',
    'qr code utility',
    'qr code image',
    'qr code online',
    'qr code generator tool',
    'qr code generator utility',
    'qr code generator free online',
    'dynamic qr code generator',
    'static qr code generator',
    'high resolution qr code',
    'printable qr code',
    'qr code size customization',
    'qr code error correction',
    'qr code encoding',
    'qr code generation online',
    'qr code download png svg',
    'qr code for web',
    'qr code for print',
    'qr code quick generator',
    'fast qr code generator',
    'easy qr code generator',
    'qr code no signup',
    'qr code free download',
    'qr code high quality',
  ],
  openGraph: {
    title: en.Tools.QRCode.Name,
    description: 'Generate QR codes from text or URLs. Customize size and error correction, then download PNG/SVG for web or print.'
  },
  twitter: {
    title: en.Tools.QRCode.Name,
    description: 'Generate QR codes from text or URLs. Customize size and error correction, then download PNG/SVG for web or print.'
  },
};

export default function QRCodePage() {
  return <QRCodeContent />;
}

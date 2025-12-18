import en from '@/translations/en.json';
import QRCodeContent from './content'

export const metadata = {
  title: en.Tools.QRCode.Name,
  description: en.Tools.QRCode.Description,
  keywords: ['devtools', 'qrcode', 'qr', 'barcode'],
  openGraph: {
    title: en.Tools.QRCode.Name,
    description: en.Tools.QRCode.Description
  },
  twitter: {
    title: en.Tools.QRCode.Name,
    description: en.Tools.QRCode.Description
  },
};

export default function QRCodePage() {
  return <QRCodeContent />;
}

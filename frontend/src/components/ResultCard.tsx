import Image from 'next/image';
import { Download, AlertTriangle } from 'lucide-react';

export type GenerationResult = {
  status: 'success';
  prompt: string;
  branding_image_url: string;
} | {
  status: 'error';
  message: string;
};

type Props = {
  result: GenerationResult;
};

export default function ResultCard({ result }: Props) {
  if (result.status === 'error') {
    return (
      <div className="text-center text-red-600">
        <AlertTriangle className="mx-auto h-12 w-12 text-red-400" />
        <h3 className="mt-2 text-lg font-medium">Generation Failed</h3>
        <p className="mt-1 text-sm">{result.message}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="aspect-square w-full relative mb-4 rounded-lg overflow-hidden shadow-lg">
        <Image src={result.branding_image_url} alt="Generated branding image" layout="fill" objectFit="cover" unoptimized />
      </div>
      <a href={result.branding_image_url} download="branding-image.png" target="_blank" rel="noopener noreferrer" className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
        <Download size={16} /> Download
      </a>
      <p className="text-xs text-gray-500 mt-3 italic p-2 bg-gray-100 rounded">
        <strong>Prompt Used:</strong> {result.prompt}
      </p>
    </div>
  );
}
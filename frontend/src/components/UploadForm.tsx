'use client';
import { useState, FormEvent, ChangeEvent } from 'react';
import { Upload, Sparkles, AlertCircle } from 'lucide-react';

type Props = {
  onSubmit: (formData: FormData) => void;
  isLoading: boolean;
};

const CATEGORIES = [
  { value: 'electronics', label: 'Electronics' },
  { value: 'fashion', label: 'Fashion' },
  { value: 'beauty', label: 'Beauty & Cosmetics' },
  { value: 'food', label: 'Food & Beverage' },
  { value: 'home_decor', label: 'Home Decor' },
  { value: 'fitness', label: 'Fitness' },
  { value: 'generic', label: 'Generic' },
];

const SIZES = [
    { value: '1:1', label: 'Square (1024x1024)' },
    { value: '16:9', label: 'Landscape (1536x864)' },
    { value: '9:16', label: 'Portrait (864x1536)' },
];

const STYLES = [
    { value: 'none', label: 'Default' },
    { value: 'photorealistic', label: 'Photorealistic' },
    { value: 'cinematic', label: 'Cinematic' },
    { value: 'anime', label: 'Anime / Manga' },
    { value: 'minimalist', label: 'Minimalist' },
];


export default function UploadForm({ onSubmit, isLoading }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('electronics');
  const [size, setSize] = useState('1:1');
  const [style, setStyle] = useState('none');
  const [error, setError] = useState('');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) { setFile(e.target.files[0]); }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!file) { setError('Please upload a product image.'); return; }
    if (!description.trim()) { setError('Please enter a product description.'); return; }
    setError('');
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('size', size);
    formData.append('style', style);
    
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md flex items-center gap-3">
          <AlertCircle size={20} /><p>{error}</p>
        </div>
      )}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">1. Upload Image</label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-brand-accent hover:text-brand-accent-hover focus-within:outline-none">
                <span>Upload a file</span>
                <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/png, image/jpeg" onChange={handleFileChange} />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">{file ? file.name : 'PNG, JPG up to 10MB'}</p>
          </div>
        </div>
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">2. Description</label>
        <textarea id="description" name="description" rows={2} className="shadow-sm focus:ring-brand-accent focus:border-brand-accent block w-full sm:text-sm border-gray-300 rounded-md" placeholder="e.g., A sleek, wireless pair of black headphones." value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">3. Category</label>
            <select id="category" name="category" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-brand-accent focus:border-brand-accent sm:text-sm rounded-md" value={category} onChange={(e) => setCategory(e.target.value)}>
              {CATEGORIES.map(cat => (<option key={cat.value} value={cat.value}>{cat.label}</option>))}
            </select>
        </div>
        <div>
            <label htmlFor="style" className="block text-sm font-medium text-gray-700">4. Style</label>
            <select id="style" name="style" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-brand-accent focus:border-brand-accent sm:text-sm rounded-md" value={style} onChange={(e) => setStyle(e.target.value)}>
                {STYLES.map(s => (<option key={s.value} value={s.value}>{s.label}</option>))}
            </select>
        </div>
      </div>

      <div>
        <label htmlFor="size" className="block text-sm font-medium text-gray-700">5. Image Size</label>
        <select id="size" name="size" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-brand-accent focus:border-brand-accent sm:text-sm rounded-md" value={size} onChange={(e) => setSize(e.target.value)}>
            {SIZES.map(s => (<option key={s.value} value={s.value}>{s.label}</option>))}
        </select>
      </div>

      <div>
        <button type="submit" disabled={isLoading} className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-accent hover:bg-brand-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent disabled:bg-gray-400 disabled:cursor-not-allowed">
          <Sparkles size={18} />
          {isLoading ? 'Generating...' : 'Generate Image'}
        </button>
      </div>
    </form>
  );
}
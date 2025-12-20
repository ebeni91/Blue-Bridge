import { useState } from 'react';
import { Plus, Search, MapPin, Tag, Upload, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface SwapOffer {
  id: number;
  title: string;
  amharicName: string;
  category: string;
  image: string;
  estimatedValue: number;
  quantity: string;
  condition: string;
  location: string;
  owner: string;
  lookingFor: string[];
  description: string;
}

const CATEGORIES = [
  { name: 'Grains & Cereals', emoji: '🌾', value: 'grains' },
  { name: 'Vegetables', emoji: '🥬', value: 'vegetables' },
  { name: 'Fruits', emoji: '🍎', value: 'fruits' },
  { name: 'Spices & Herbs', emoji: '🌶️', value: 'spices' },
  { name: 'Pulses & Legumes', emoji: '🫘', value: 'pulses' },
  { name: 'Coffee & Tea', emoji: '☕', value: 'coffee' },
  { name: 'Livestock', emoji: '🐄', value: 'livestock' },
];

const MOCK_SWAP_OFFERS: SwapOffer[] = [
  {
    id: 1,
    title: 'Organic Wheat Seeds',
    amharicName: 'የስንዴ ዘር',
    category: 'grains',
    image: 'https://images.unsplash.com/photo-1663025293688-322e16b6cb66?w=400',
    estimatedValue: 2500,
    quantity: '50 kg',
    condition: 'New',
    location: 'Addis Ababa',
    owner: 'Abebe Kebede',
    lookingFor: ['vegetables', 'fruits'],
    description: 'Premium quality wheat seeds, perfect for planting season',
  },
  {
    id: 2,
    title: 'Fresh Tomatoes',
    amharicName: 'ቲማቲም',
    category: 'vegetables',
    image: 'https://images.unsplash.com/photo-1700064165267-8fa68ef07167?w=400',
    estimatedValue: 1800,
    quantity: '40 kg',
    condition: 'Like-New',
    location: 'Bahir Dar',
    owner: 'Almaz Tadesse',
    lookingFor: ['grains', 'spices'],
    description: 'Fresh organic tomatoes harvested yesterday',
  },
  {
    id: 3,
    title: 'Coffee Beans',
    amharicName: 'ቡና',
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400',
    estimatedValue: 3200,
    quantity: '25 kg',
    condition: 'Good',
    location: 'Jimma',
    owner: 'Dawit Haile',
    lookingFor: ['vegetables', 'pulses'],
    description: 'Premium Ethiopian coffee beans from Jimma region',
  },
  {
    id: 4,
    title: 'Red Onions',
    amharicName: 'ቀይ ሽንኩርት',
    category: 'vegetables',
    image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400',
    estimatedValue: 1500,
    quantity: '30 kg',
    condition: 'Good',
    location: 'Hawassa',
    owner: 'Sara Bekele',
    lookingFor: ['fruits', 'grains'],
    description: 'High quality red onions, fresh from farm',
  },
];

export function SwapInterface() {
  const [activeView, setActiveView] = useState<'marketplace' | 'create'>('marketplace');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [formData, setFormData] = useState({
    title: '',
    amharicName: '',
    category: '',
    estimatedValue: '',
    quantity: '',
    condition: 'New',
    description: '',
    lookingFor: [] as string[],
  });
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const filteredOffers = MOCK_SWAP_OFFERS.filter(offer => {
    const matchesSearch = offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         offer.amharicName.includes(searchTerm);
    const matchesCategory = selectedCategory === 'all' || offer.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryName = (value: string) => {
    const category = CATEGORIES.find(c => c.value === value);
    return category ? `${category.emoji} ${category.name}` : value;
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleLookingFor = (category: string) => {
    setFormData(prev => ({
      ...prev,
      lookingFor: prev.lookingFor.includes(category)
        ? prev.lookingFor.filter(c => c !== category)
        : [...prev.lookingFor, category]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Swap offer created:', formData);
    setActiveView('marketplace');
    // Reset form
    setFormData({
      title: '',
      amharicName: '',
      category: '',
      estimatedValue: '',
      quantity: '',
      condition: 'New',
      description: '',
      lookingFor: [],
    });
    setUploadedImage(null);
  };

  return (
    <div>
      {/* Header with tabs and actions */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveView('marketplace')}
            className={`px-6 py-2 rounded-lg transition-all ${
              activeView === 'marketplace'
                ? 'bg-emerald-600 text-white'
                : 'bg-white text-emerald-700 hover:bg-emerald-50 border-2 border-emerald-200'
            }`}
          >
            Marketplace
          </button>
          <button
            onClick={() => setActiveView('create')}
            className={`px-6 py-2 rounded-lg transition-all flex items-center gap-2 ${
              activeView === 'create'
                ? 'bg-emerald-600 text-white'
                : 'bg-white text-emerald-700 hover:bg-emerald-50 border-2 border-emerald-200'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Create Offer</span>
          </button>
        </div>
      </div>

      {/* Create Offer View */}
      {activeView === 'create' && (
        <div className="bg-white rounded-2xl p-8 border-2 border-emerald-100">
          <h2 className="text-emerald-900 mb-6">Create Swap Offer</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category Selection */}
            <div>
              <label className="block text-emerald-700 mb-3">Category *</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {CATEGORIES.map(category => (
                  <button
                    key={category.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, category: category.value })}
                    className={`p-4 rounded-xl border-2 transition-all text-center ${
                      formData.category === category.value
                        ? 'border-emerald-600 bg-emerald-50'
                        : 'border-emerald-200 hover:border-emerald-300'
                    }`}
                  >
                    <div className="text-3xl mb-2">{category.emoji}</div>
                    <div className="text-sm text-emerald-900">{category.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-emerald-700 mb-3">Product Image *</label>
              <div className="relative">
                {uploadedImage ? (
                  <div className="relative">
                    <img
                      src={uploadedImage}
                      alt="Uploaded"
                      className="w-full h-64 object-cover rounded-xl border-2 border-emerald-200"
                    />
                    <button
                      type="button"
                      onClick={() => setUploadedImage(null)}
                      className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="border-2 border-dashed border-emerald-300 rounded-xl p-12 flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500 transition-all bg-emerald-50/30">
                    <Upload className="w-12 h-12 text-emerald-600 mb-3" />
                    <p className="text-emerald-700 mb-2">Click to upload product image</p>
                    <p className="text-emerald-600 text-sm">PNG, JPG up to 10MB</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      required
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Product Details */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-emerald-700 mb-2">Product Name *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:outline-none focus:border-emerald-500"
                  placeholder="e.g., Organic Wheat Seeds"
                />
              </div>

              <div>
                <label className="block text-emerald-700 mb-2">Amharic Name *</label>
                <input
                  type="text"
                  value={formData.amharicName}
                  onChange={(e) => setFormData({ ...formData, amharicName: e.target.value })}
                  required
                  className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:outline-none focus:border-emerald-500"
                  placeholder="የአማርኛ ስም"
                />
              </div>

              <div>
                <label className="block text-emerald-700 mb-2">Estimated Value (ETB) *</label>
                <input
                  type="number"
                  value={formData.estimatedValue}
                  onChange={(e) => setFormData({ ...formData, estimatedValue: e.target.value })}
                  required
                  className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:outline-none focus:border-emerald-500"
                  placeholder="2500"
                />
              </div>

              <div>
                <label className="block text-emerald-700 mb-2">Quantity *</label>
                <input
                  type="text"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  required
                  className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:outline-none focus:border-emerald-500"
                  placeholder="e.g., 50 kg"
                />
              </div>
            </div>

            {/* Condition */}
            <div>
              <label className="block text-emerald-700 mb-2">Condition *</label>
              <select
                value={formData.condition}
                onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:outline-none focus:border-emerald-500"
              >
                <option value="New">New</option>
                <option value="Like-New">Like-New</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
              </select>
            </div>

            {/* Looking For */}
            <div>
              <label className="block text-emerald-700 mb-3">Looking For *</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {CATEGORIES.map(category => (
                  <button
                    key={category.value}
                    type="button"
                    onClick={() => toggleLookingFor(category.value)}
                    className={`p-3 rounded-xl border-2 transition-all text-center ${
                      formData.lookingFor.includes(category.value)
                        ? 'border-emerald-600 bg-emerald-50'
                        : 'border-emerald-200 hover:border-emerald-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">{category.emoji}</div>
                    <div className="text-xs text-emerald-900">{category.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-emerald-700 mb-2">Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows={4}
                className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:outline-none focus:border-emerald-500"
                placeholder="Describe your product in detail..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl transition-all"
            >
              Create Swap Offer
            </button>
          </form>
        </div>
      )}

      {/* Marketplace View */}
      {activeView === 'marketplace' && (
        <div>
          {/* Search and Filter */}
          <div className="mb-6 space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600 w-5 h-5" />
              <input
                type="text"
                placeholder="Search swap offers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-emerald-200 rounded-xl focus:outline-none focus:border-emerald-500 bg-white"
              />
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                }`}
              >
                All
              </button>
              {CATEGORIES.map(category => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    selectedCategory === category.value
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                  }`}
                >
                  {category.emoji} {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Swap Offers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOffers.map(offer => (
              <div
                key={offer.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-emerald-100"
              >
                <div className="relative h-48 overflow-hidden bg-emerald-50">
                  <ImageWithFallback
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 px-3 py-1 rounded-full text-sm">
                    {getCategoryName(offer.category)}
                  </div>
                  <div className="absolute top-3 right-3 bg-emerald-600 text-white px-3 py-1 rounded-full">
                    {offer.condition}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-emerald-900 mb-1">{offer.title}</h3>
                  <p className="text-emerald-600 text-sm mb-3">{offer.amharicName}</p>

                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-900">{offer.estimatedValue} ETB</span>
                    <span className="text-emerald-600 text-sm">• {offer.quantity}</span>
                  </div>

                  <div className="flex items-center gap-1 text-emerald-700 mb-3">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{offer.location} • {offer.owner}</span>
                  </div>

                  <div className="mb-4">
                    <p className="text-emerald-600 text-sm mb-2">Looking for:</p>
                    <div className="flex flex-wrap gap-1">
                      {offer.lookingFor.map(category => (
                        <span
                          key={category}
                          className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-lg text-xs"
                        >
                          {getCategoryName(category)}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg transition-all">
                    Propose Swap
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredOffers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-emerald-600">No swap offers found matching your criteria</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

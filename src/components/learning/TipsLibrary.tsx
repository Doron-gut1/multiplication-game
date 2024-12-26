// src/components/learning/TipsLibrary.tsx
import React, { useState } from 'react';
import { tips, TipCategory, Tip } from '../../types/tips';
import TipCard from './TipCard';
import TipDialog from './TipDialog';
import { Search } from 'lucide-react';

const TipsLibrary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TipCategory | 'all'>('all');
  const [selectedTip, setSelectedTip] = useState<Tip | null>(null);

  const filteredTips = tips.filter(tip => {
    const matchesSearch = tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tip.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || tip.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* סרגל חיפוש וסינון */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="חיפוש טיפים..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value as TipCategory | 'all')}
          className="p-2 border rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">כל הקטגוריות</option>
          <option value="basic">בסיסי</option>
          <option value="intermediate">בינוני</option>
          <option value="advanced">מתקדם</option>
        </select>
      </div>

      {/* רשימת הטיפים */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTips.map(tip => (
          <TipCard
            key={tip.id}
            tip={tip}
            onClick={() => setSelectedTip(tip)}
          />
        ))}
      </div>

      {/* הודעה כשאין תוצאות */}
      {filteredTips.length === 0 && (
        <div className="text-center text-gray-500 py-10">
          לא נמצאו טיפים מתאימים לחיפוש שלך
        </div>
      )}

      {/* מודל תצוגה מורחבת */}
      <TipDialog
        tip={selectedTip}
        isOpen={selectedTip !== null}
        onClose={() => setSelectedTip(null)}
      />
    </div>
  );
};

export default TipsLibrary;
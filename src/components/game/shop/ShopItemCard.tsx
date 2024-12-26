// src/components/game/shop/ShopItemCard.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../../ui/card';
import { ShopItem } from '../../../types/rewards';
import { Star, Coins } from 'lucide-react';

interface ShopItemCardProps {
  item: ShopItem;
  isOwned: boolean;
  canAfford: boolean;
  onSelect: () => void;
}

const ShopItemCard: React.FC<ShopItemCardProps> = ({
  item,
  isOwned,
  canAfford,
  onSelect
}) => {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'bg-gray-100 text-gray-700';
      case 'rare':
        return 'bg-blue-100 text-blue-700';
      case 'epic':
        return 'bg-purple-100 text-purple-700';
      case 'legendary':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card 
        className="cursor-pointer overflow-hidden"
        onClick={onSelect}
      >
        <CardContent className="p-4">
          {/* תג נדירות */}
          <div className="flex justify-end mb-2">
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-bold ${getRarityColor(item.rarity)}`}>
              {item.rarity}
            </span>
          </div>

          {/* תמונת הפריט */}
          <div className="w-full h-32 bg-gray-50 rounded-lg flex items-center justify-center mb-4">
            <span className="text-4xl" role="img" aria-label={item.name}>
              {item.icon || '🎁'}
            </span>
          </div>

          {/* פרטי הפריט */}
          <div>
            <h3 className="font-bold text-lg text-gray-900 text-right mb-2">
              {item.name}
            </h3>
            <p className="text-sm text-gray-600 text-right mb-4 min-h-[40px]">
              {item.description}
            </p>

            <div className="flex justify-between items-center">
              {/* מחיר */}
              <div className="flex gap-2">
                {item.price.coins && (
                  <div className="flex items-center gap-1 text-yellow-600">
                    <Coins size={16} />
                    <span className="font-bold">{item.price.coins}</span>
                  </div>
                )}
                {item.price.stars && (
                  <div className="flex items-center gap-1 text-blue-600">
                    <Star size={16} />
                    <span className="font-bold">{item.price.stars}</span>
                  </div>
                )}
              </div>

              {/* סטטוס */}
              {isOwned ? (
                <span className="text-green-600 text-sm font-bold">בבעלותך</span>
              ) : !canAfford ? (
                <span className="text-red-600 text-sm font-bold">אין מספיק מטבעות</span>
              ) : null}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ShopItemCard;
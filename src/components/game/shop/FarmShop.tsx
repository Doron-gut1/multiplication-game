// src/components/game/shop/FarmShop.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Draggable from 'react-draggable';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { ShopItem, Currency } from '../../../types/rewards';
import { shopItems } from '../../../data/shopItems';
import { Star, Coins, X, GripHorizontal } from 'lucide-react';
import ShopItemCard from './ShopItemCard';
import ItemDetailsDialog from './ItemDetailsDialog';

interface FarmShopProps {
  isOpen: boolean;
  onClose: () => void;
  playerCurrency: Currency;
  onPurchase: (item: ShopItem) => void;
  ownedItems: string[];
}

const FarmShop: React.FC<FarmShopProps> = ({
  isOpen,
  onClose,
  playerCurrency,
  onPurchase,
  ownedItems
}) => {
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'הכל' },
    { id: 'accessory', name: 'אביזרים' },
    { id: 'background', name: 'רקעים' },
    { id: 'special', name: 'מיוחדים' }
  ];

  const filteredItems = shopItems.filter(item => 
    activeCategory === 'all' || item.type === activeCategory
  );

  const canAfford = (item: ShopItem): boolean => {
    return (
      (!item.price.coins || playerCurrency.coins >= item.price.coins) &&
      (!item.price.stars || playerCurrency.stars >= item.price.stars)
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <div className="fixed inset-0 bg-black/50" />
      <div className="fixed inset-0 flex items-center justify-center">
        <Draggable handle=".dialog-handle">
          <DialogContent className="relative max-w-3xl bg-white rounded-lg shadow-xl overflow-hidden h-[600px]">
            <div className="flex flex-col h-full">
              <DialogHeader className="border-b pb-4 px-6 pt-4">
                <div className="dialog-handle flex items-center justify-between cursor-move">
                  <GripHorizontal className="h-6 w-6 text-gray-400" />
                  <DialogTitle className="text-2xl font-bold text-gray-900 text-right flex-grow pl-10">
                    חנות החווה
                  </DialogTitle>
                  <button 
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <X size={24} className="text-gray-600" />
                  </button>
                </div>
                
                <div className="flex gap-4 mt-4">
                  <div className="flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full">
                    <Coins size={20} />
                    <span className="font-bold">{playerCurrency.coins}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
                    <Star size={20} />
                    <span className="font-bold">{playerCurrency.stars}</span>
                  </div>
                </div>
              </DialogHeader>

              <div className="flex gap-2 p-4 border-b bg-gray-50">
                {categories.map(category => (
                  <Button
                    key={category.id}
                    variant={activeCategory === category.id ? 'default' : 'outline'}
                    onClick={() => setActiveCategory(category.id)}
                    className="min-w-[100px]"
                  >
                    {category.name}
                  </Button>
                ))}
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence>
                    {filteredItems.map(item => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ShopItemCard
                          item={item}
                          isOwned={ownedItems.includes(item.id)}
                          canAfford={canAfford(item)}
                          onSelect={() => setSelectedItem(item)}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </DialogContent>
        </Draggable>
      </div>

      {selectedItem && (
        <ItemDetailsDialog
          item={selectedItem}
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          onPurchase={(item: ShopItem) => {
            onPurchase(item);
            setSelectedItem(null);
          }}
          isOwned={ownedItems.includes(selectedItem.id)}
          canAfford={canAfford(selectedItem)}
        />
      )}
    </Dialog>
  );
};

export default FarmShop;
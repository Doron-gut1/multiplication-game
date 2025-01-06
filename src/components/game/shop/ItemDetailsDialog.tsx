import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { ShopItem } from '../../../types/rewards';
import { Star, Coins, X } from 'lucide-react';
import PurchaseAnimation from '../animations/PurchaseAnimation';

interface ItemDetailsDialogProps {
  item: ShopItem;
  isOpen: boolean;
  onClose: () => void;
  onPurchase: (item: ShopItem) => void;
  isOwned: boolean;
  canAfford: boolean;
}

const ItemDetailsDialog: React.FC<ItemDetailsDialogProps> = ({
  item,
  isOpen,
  onClose,
  onPurchase,
  isOwned,
  canAfford
}) => {
  const [showPurchaseAnimation, setShowPurchaseAnimation] = useState(false);

  const handlePurchase = () => {
    if (!isOwned && canAfford) {
      setShowPurchaseAnimation(true);
    }
  };

  const handleAnimationComplete = () => {
    setShowPurchaseAnimation(false);
    onPurchase(item);
    onClose();
  };

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
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-lg shadow-xl">
          <DialogHeader className="relative border-b pb-4">
            <DialogTitle className="text-2xl font-bold text-gray-900 text-center">
              {item.name}
            </DialogTitle>
            <button 
              onClick={onClose}
              className="absolute left-2 top-2 p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </DialogHeader>

          <div className="p-6">
            {/* תמונה */}
            <div className="bg-gray-50 p-8 rounded-lg mb-6 flex justify-center items-center">
              <span className="text-8xl" role="img" aria-label={item.name}>
                {item.icon || '🎁'}
              </span>
            </div>

            {/* תיאור */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 text-right">תיאור</h3>
              <p className="text-gray-600 text-right">{item.description}</p>
            </div>

            {/* פרטים נוספים */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-right">
                <h4 className="font-semibold text-gray-900">סוג</h4>
                <p className="text-gray-600">{item.type}</p>
              </div>
              <div className="text-right">
                <h4 className="font-semibold text-gray-900">נדירות</h4>
                <p className={`inline-block px-2 py-1 rounded-full text-sm ${getRarityColor(item.rarity)}`}>
                  {item.rarity}
                </p>
              </div>
            </div>

            {/* כפתור רכישה */}
            <div className="flex items-center justify-between pt-4 border-t">
              {/* מחיר */}
              <div className="flex gap-4">
                {item.price.coins && (
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-600 font-bold">{item.price.coins}</span>
                    <Coins className="text-yellow-600" size={20} />
                  </div>
                )}
                {item.price.stars && (
                  <div className="flex items-center gap-1">
                    <span className="text-blue-600 font-bold">{item.price.stars}</span>
                    <Star className="text-blue-600" size={20} />
                  </div>
                )}
              </div>

              {/* כפתור רכישה */}
              <Button
                onClick={handlePurchase}
                disabled={isOwned || !canAfford}
                className={`px-8 py-3 rounded-lg text-lg font-bold ${
                  isOwned 
                    ? 'bg-green-500 text-white' 
                    : !canAfford 
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                {isOwned 
                  ? 'בבעלותך' 
                  : !canAfford 
                    ? 'אין מספיק מטבעות' 
                    : 'קנה עכשיו'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {showPurchaseAnimation && (
        <PurchaseAnimation 
          item={{
            icon: item.icon || '🎁',
            name: item.name
          }}
          onComplete={handleAnimationComplete}
        />
      )}
    </>
  );
};

export default ItemDetailsDialog;
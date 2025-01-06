import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Task } from '../../../types/tasks';
import { ShopItem } from '../../../types/rewards';

interface FarmAreaProps {
  onAnimalClick: (animalId: string) => void;
  activeTasks: Record<string, Task>;
  playerItems: ShopItem[];
}

interface Animal {
  id: string;
  type: 'cow' | 'sheep' | 'chicken';
  position: { x: number; y: number };
}

const ANIMALS: Animal[] = [
  { id: '1', type: 'cow', position: { x: 150, y: 100 } },
  { id: '2', type: 'sheep', position: { x: 400, y: 150 } },
  { id: '3', type: 'chicken', position: { x: 650, y: 200 } }
];

const FarmArea: React.FC<FarmAreaProps> = ({ 
  onAnimalClick, 
  activeTasks,
  playerItems = []
}) => {
  const getAnimalEmoji = (type: string): string => {
    switch (type) {
      case 'cow': return '🐮';
      case 'sheep': return '🐑';
      case 'chicken': return '🐔';
      default: return '🐾';
    }
  };

  const getDifficultyLabel = (animalId: string): string => {
    switch (animalId) {
      case '1': return '(קל)';
      case '2': return '(בינוני)';
      case '3': return '(קשה)';
      default: return '';
    }
  };

  const getAnimalItems = (animal: Animal): ShopItem[] => {
    return playerItems.filter(item => 
      item.target === 'all' || item.target === animal.type
    ).slice(0, 3); // מגביל ל-3 פריטים מקסימום לכל חיה
  };

  const getItemPosition = (index: number): { top: number; scale: number } => {
    const baseTop = -20;
    const spacing = 15;
    return {
      top: baseTop - (index * spacing),
      scale: 1 - (index * 0.1)
    };
  };

  return (
    <div className="relative h-[400px] bg-gradient-to-b from-green-100 to-green-200 rounded-lg overflow-hidden">
      {ANIMALS.map((animal) => (
        <div
          key={animal.id}
          style={{
            position: 'absolute',
            left: `${animal.position.x}px`,
            top: `${animal.position.y}px`,
          }}
        >
          <AnimatePresence>
            {activeTasks[animal.id] && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="absolute bottom-full mb-2 bg-white rounded-xl p-3 shadow-lg min-w-[120px]"
                style={{
                  left: '50%',
                  transform: 'translateX(-50%)',
                  direction: 'ltr'
                }}
              >
                <div className="text-lg font-bold text-gray-900 flex items-center justify-center whitespace-nowrap">
                  {activeTasks[animal.id].multiplicand} × {activeTasks[animal.id].multiplier} = ?
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            className="relative cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onAnimalClick(animal.id)}
          >
            <div className="absolute w-full">
              {getAnimalItems(animal).map((item, index) => {
                const { top, scale } = getItemPosition(index);
                return (
                  <motion.div
                    key={item.id}
                    className="absolute left-1/2 transform -translate-x-1/2"
                    style={{ top: `${top}px`, zIndex: 10 - index }}
                    initial={{ scale: 0, y: 20 }}
                    animate={{ scale, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-md">
                      <span className="text-lg">
                        {item.icon || '🎀'}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="text-5xl relative z-10">
              {getAnimalEmoji(animal.type)}
            </div>

            <div className="mt-1 text-sm font-semibold bg-white/80 px-2 py-1 rounded-full text-gray-900 text-center">
              {getDifficultyLabel(animal.id)}
            </div>
          </motion.div>
        </div>
      ))}
    </div>
  );
};

export default FarmArea;
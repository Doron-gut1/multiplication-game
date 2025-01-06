import React from 'react';
import { Button } from '../ui/button';
import { Store as StoreIcon, Trophy, Star, Coins, LogOut } from 'lucide-react';
import { User } from '../../services/UserService';

interface GameHeaderProps {
  user: User;
  coins: number;
  stars: number;
  level: number;
  onLogout: () => void;
  onShowShop: () => void;
  onShowAchievements: () => void;
}

const GameHeader: React.FC<GameHeaderProps> = ({
  user,
  coins,
  stars,
  level,
  onLogout,
  onShowShop,
  onShowAchievements
}) => {
  return (
    <div className="mb-6 flex justify-between items-center bg-white p-4 rounded-lg shadow">
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900">אזור המשחק</h2>
        {user && (
          <span className="text-sm text-gray-600">
            מחובר כ: {user.username}
          </span>
        )}
      </div>
      
      <div className="flex gap-4">
        {/* תצוגת מטבעות */}
        <div className="flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full">
          <Coins className="h-5 w-5" />
          <span className="font-bold">{coins}</span>
        </div>

        {/* תצוגת כוכבים */}
        <div className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
          <Star className="h-5 w-5" />
          <span className="font-bold">{stars}</span>
        </div>

        {/* תצוגת רמה */}
        <div className="flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full">
          <Trophy className="h-5 w-5" />
          <span className="font-bold">רמה {level}</span>
        </div>

        {/* כפתורי ניווט */}
        <Button
          variant="outline"
          onClick={onShowShop}
          className="bg-white text-gray-700 hover:bg-gray-100"
        >
          <StoreIcon className="ml-2 h-5 w-5" />
          חנות
        </Button>
        <Button
          variant="outline"
          onClick={onShowAchievements}
          className="bg-white text-gray-700 hover:bg-gray-100"
        >
          <Trophy className="ml-2 h-5 w-5" />
          הישגים
        </Button>
        <Button
          variant="outline"
          onClick={onLogout}
          className="bg-white text-gray-700 hover:bg-gray-100"
        >
          <LogOut className="ml-2 h-5 w-5" />
          התנתק
        </Button>
      </div>
    </div>
  );
};

export default GameHeader;
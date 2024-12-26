import React from 'react';
import { motion } from 'framer-motion';
import { Tip } from '../../types/tips';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

interface TipCardProps {
  tip: Tip;
  onClick?: () => void;
}

const TipCard: React.FC<TipCardProps> = ({ tip, onClick }) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'basic':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-blue-100 text-blue-800';
      case 'advanced':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        className="max-w-sm cursor-pointer hover:shadow-lg transition-shadow"
        onClick={onClick}
      >
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-bold">{tip.title}</CardTitle>
            <motion.span 
              className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(tip.category)}`}
              whileHover={{ scale: 1.1 }}
            >
              {tip.category}
            </motion.span>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">{tip.description}</p>
          <motion.div 
            className="bg-gray-50 p-3 rounded-lg"
            whileHover={{ backgroundColor: '#f3f4f6' }}
          >
            <p className="text-sm font-medium text-gray-900">דוגמה:</p>
            <p className="text-lg font-mono text-gray-900">{tip.example}</p>
          </motion.div>
          {tip.visualAid && (
            <motion.div 
              className="mt-3 text-sm text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="font-medium">טריק לזכירה:</span> {tip.visualAid}
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TipCard;
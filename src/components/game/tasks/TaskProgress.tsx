import React from 'react';
import { motion } from 'framer-motion';

interface TaskProgressProps {
  currentStreak: number;
  bestStreak: number;
  totalAnswers: number;
}

export const TaskProgress: React.FC<TaskProgressProps> = ({
  currentStreak,
  bestStreak,
  totalAnswers
}) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-lg grid grid-cols-3 gap-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center"
      >
        <div className="text-sm text-gray-600">רצף נוכחי</div>
        <div className="text-2xl font-bold text-blue-600">{currentStreak}</div>
      </motion.div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-center"
      >
        <div className="text-sm text-gray-600">רצף שיא</div>
        <div className="text-2xl font-bold text-green-600">{bestStreak}</div>
      </motion.div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        <div className="text-sm text-gray-600">סה"כ תשובות</div>
        <div className="text-2xl font-bold text-purple-600">{totalAnswers}</div>
      </motion.div>
    </div>
  );
};

export default TaskProgress;
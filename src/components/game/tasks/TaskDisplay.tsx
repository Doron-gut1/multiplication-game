import React from 'react';
import { motion } from 'framer-motion';
import { Task } from '../../../services/TaskService';

interface TaskDisplayProps {
  task: Task;
  onAnswer: (answer: number) => void;
  isError: boolean;
}

export const TaskDisplay: React.FC<TaskDisplayProps> = ({ task, onAnswer, isError }) => {
  const [answer, setAnswer] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAnswer = parseInt(answer);
    if (!isNaN(numAnswer)) {
      onAnswer(numAnswer);
      setAnswer('');
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className="p-6 bg-white rounded-lg shadow-lg text-center"
    >
      <div className="text-2xl font-bold mb-4">
        {task.multiplicand} × {task.multiplier} = ?
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className={`w-32 text-center text-2xl p-2 border-2 rounded-lg ${
            isError ? 'border-red-500' : 'border-gray-300'
          }`}
          autoFocus
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          type="submit"
        >
          בדוק
        </motion.button>
      </form>

      {isError && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-500 mt-2"
        >
          נסה שוב!
        </motion.p>
      )}
    </motion.div>
  );
};

export default TaskDisplay;
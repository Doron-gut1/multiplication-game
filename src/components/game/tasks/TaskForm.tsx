import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../ui/button';
import { Task } from '../../../types/tasks';

interface TaskFormProps {
  task: Task;
  onSubmit: (answer: number) => void;
  isError: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSubmit, isError }) => {
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.trim()) {
      onSubmit(parseInt(answer));
      setAnswer('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="text-center space-y-4 bg-white p-6 rounded-lg shadow-lg">
      <div>
        <label className="block text-xl font-bold text-gray-900 mb-4 direction-ltr">
          {task.multiplicand} × {task.multiplier} = ?
        </label>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={answer}
          onChange={(e) => {
            const value = e.target.value.replace(/[^0-9]/g, '');
            setAnswer(value);
          }}
          className={`border-2 rounded-lg px-6 py-3 text-center text-xl text-gray-900 w-32
            ${isError ? 'border-red-500' : 'border-blue-500'}
            focus:outline-none focus:ring-2 focus:ring-blue-500
          `}
          autoFocus
        />
        <AnimatePresence>
          {isError && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-red-500 mt-2 font-bold"
            >
              נסה שוב!
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      <Button 
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-bold"
        disabled={!answer.trim()}
      >
        בדוק תשובה
      </Button>
    </form>
  );
};

export default TaskForm;
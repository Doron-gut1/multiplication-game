// src/components/learning/TipDialog.tsx
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { X } from 'lucide-react';
import { Tip } from '../../types/tips';

interface TipDialogProps {
  tip: Tip | null;
  isOpen: boolean;
  onClose: () => void;
}

const TipDialog: React.FC<TipDialogProps> = ({ tip, isOpen, onClose }) => {
  if (!tip) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <div className="fixed inset-0 bg-black/50" />
      <div className="fixed inset-0 flex items-center justify-center">
        <DialogContent className="relative max-w-2xl bg-gray-50 rounded-lg shadow-xl">
          <DialogHeader className="border-b pb-4 px-6 pt-4 bg-white">
            <div className="flex items-center justify-between">
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} className="text-gray-600" />
              </button>
              <DialogTitle className="text-2xl font-bold text-gray-900 text-right flex-grow">
                {tip.title}
              </DialogTitle>
            </div>
          </DialogHeader>
          
          <div className="space-y-6 p-6">
            {/* תיאור מורחב */}
            <div className="bg-blue-100 p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">הסבר</h3>
              <p className="text-blue-800 leading-relaxed">{tip.description}</p>
            </div>

            {/* דוגמה */}
            <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">דוגמה:</h3>
              <div className="text-2xl font-mono text-center text-gray-900 p-4 bg-gray-50 rounded-lg" style={{ direction: 'ltr' }}>
                {tip.example}
              </div>
            </div>

            {/* טריק לזכירה */}
            {tip.visualAid && (
              <div className="bg-purple-200 p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-purple-900 mb-2">
                  <span>💡</span> טריק לזכירה
                </h3>
                <p className="text-purple-900">{tip.visualAid}</p>
              </div>
            )}

            {/* תרגול מהיר */}
            <div className="bg-green-200 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-green-900 mb-3">
                <span>✏️</span> בואו נתרגל!
              </h3>
              <p className="text-green-900 mb-4">נסו לפתור את התרגילים הבאים:</p>
              <div 
                className="grid grid-cols-2 gap-6 font-mono bg-white p-4 rounded-lg"
                style={{ direction: 'ltr' }}
              >
                <div className="flex items-center justify-center p-4 bg-green-100 rounded-lg">
                  <span className="text-2xl font-bold text-gray-900">
                    {`${tip.multiplier} × 3 = ?`}
                  </span>
                </div>
                <div className="flex items-center justify-center p-4 bg-green-100 rounded-lg">
                  <span className="text-2xl font-bold text-gray-900">
                    {`${tip.multiplier} × 4 = ?`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default TipDialog;
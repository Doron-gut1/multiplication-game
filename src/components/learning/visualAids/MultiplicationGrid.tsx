// src/components/learning/visualAids/MultiplicationGrid.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface MultiplicationGridProps {
  rows: number;
  columns: number;
  highlightCells?: boolean;
  animate?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onAnimationComplete?: () => void;
}

export const MultiplicationGrid: React.FC<MultiplicationGridProps> = ({
  rows,
  columns,
  highlightCells = true,
  animate = true,
  size = 'md',
  onAnimationComplete
}) => {
  const [activeRows, setActiveRows] = useState(0);
  const [activeCols, setActiveCols] = useState(0);
  
  const getCellSize = () => {
    switch (size) {
      case 'sm': return 30;
      case 'lg': return 50;
      default: return 40;
    }
  };
  
  const cellSize = getCellSize();
  const padding = 20;
  const width = columns * cellSize + padding * 2;
  const height = rows * cellSize + padding * 2;

  useEffect(() => {
    if (animate) {
      let timer: ReturnType<typeof setTimeout>;
      
      const animateRows = () => {
        setActiveRows(0);
        timer = setTimeout(() => {
          const interval = setInterval(() => {
            setActiveRows(prev => {
              if (prev < rows) return prev + 1;
              clearInterval(interval);
              animateColumns();
              return prev;
            });
          }, 500);
        }, 500);
      };

      const animateColumns = () => {
        setActiveCols(0);
        timer = setTimeout(() => {
          const interval = setInterval(() => {
            setActiveCols(prev => {
              if (prev < columns) return prev + 1;
              clearInterval(interval);
              onAnimationComplete?.();
              return prev;
            });
          }, 500);
        }, 500);
      };

      animateRows();
      return () => {
        clearTimeout(timer);
      };
    } else {
      setActiveRows(rows);
      setActiveCols(columns);
    }
  }, [rows, columns, animate, onAnimationComplete]);

  const renderGrid = () => {
    const cells = [];
    
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        const isActive = i < activeRows && j < activeCols;
        const delay = (i + j) * 0.1;
        
        cells.push(
          <motion.rect
            key={`cell-${i}-${j}`}
            x={padding + j * cellSize}
            y={padding + i * cellSize}
            width={cellSize - 2}
            height={cellSize - 2}
            rx={4}
            initial={{ scale: 0 }}
            animate={{
              scale: isActive ? 1 : 0,
              fill: highlightCells ? `rgb(${i * 30}, ${j * 30}, 255)` : 'blue'
            }}
            transition={{ delay }}
            className="stroke-2"
          />
        );
      }
    }

    return cells;
  };

  return (
    <div className="flex justify-center items-center p-4">
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="bg-white rounded-lg shadow-inner"
      >
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          className="stroke-gray-200"
        >
          {Array.from({ length: rows + 1 }).map((_, i) => (
            <line
              key={`row-${i}`}
              x1={padding}
              y1={padding + i * cellSize}
              x2={width - padding}
              y2={padding + i * cellSize}
              strokeWidth="1"
            />
          ))}
          {Array.from({ length: columns + 1 }).map((_, i) => (
            <line
              key={`col-${i}`}
              x1={padding + i * cellSize}
              y1={padding}
              x2={padding + i * cellSize}
              y2={height - padding}
              strokeWidth="1"
            />
          ))}
        </motion.g>

        {renderGrid()}

        <text
          x={width / 2}
          y={height - 5}
          textAnchor="middle"
          className="text-sm fill-gray-600"
        >
          {`${rows} × ${columns} = ${rows * columns}`}
        </text>
      </svg>
    </div>
  );
};

export default MultiplicationGrid;
import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '../../ui/card';
import { StatisticsService, Statistics, DifficultyStats } from '../../../services/StatisticsService';

interface StatsViewProps {
  statistics: Statistics;
}

const StatsView: React.FC<StatsViewProps> = ({ statistics }) => {
  const difficultyColors = {
    easy: '#22c55e',    // ירוק
    medium: '#3b82f6',  // כחול
    hard: '#ef4444'     // אדום
  };

  const formatAccuracy = (value: number) => `${value.toFixed(1)}%`;
  const formatTime = (value: number) => `${value.toFixed(1)}s`;

  // עיבוד נתונים לגרף התקדמות יומית
  const dailyProgressData = statistics.dailyStats.map(stat => ({
    date: stat.date,
    tasksCompleted: stat.tasksCompleted,
    accuracy: (stat.correctAnswers / stat.tasksCompleted) * 100
  }));

  // עיבוד נתונים לגרף רמות קושי
  const difficultyData = Object.entries(statistics.byDifficulty).map(([level, stats]) => ({
    level,
    accuracy: (stats.correct / stats.total) * 100,
    avgTime: stats.averageTime
  }));

  return (
    <div className="space-y-6">
      {/* סטטיסטיקות כלליות */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: 'סה"כ משימות',
            value: statistics.totalTasks,
            color: 'bg-blue-100 text-blue-800'
          },
          {
            title: 'דיוק כללי',
            value: `${statistics.overallAccuracy.toFixed(1)}%`,
            color: 'bg-green-100 text-green-800'
          },
          {
            title: 'רצף נוכחי',
            value: statistics.records.streaks.current,
            color: 'bg-yellow-100 text-yellow-800'
          },
          {
            title: 'שיא רצף',
            value: statistics.records.streaks.best,
            color: 'bg-purple-100 text-purple-800'
          }
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`${stat.color}`}>
              <CardContent className="p-4">
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm">{stat.title}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* גרף התקדמות יומית */}
      <Card>
        <CardHeader>
          <CardTitle>התקדמות יומית</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyProgressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="tasksCompleted"
                  stroke="#3b82f6"
                  name="משימות שהושלמו"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="accuracy"
                  stroke="#22c55e"
                  name="אחוז הצלחה"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* גרף רמות קושי */}
      <Card>
        <CardHeader>
          <CardTitle>ביצועים לפי רמת קושי</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={difficultyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="level" />
                <YAxis yAxisId="left" tickFormatter={formatAccuracy} />
                <YAxis yAxisId="right" orientation="right" tickFormatter={formatTime} />
                <Tooltip />
                <Bar
                  yAxisId="left"
                  dataKey="accuracy"
                  fill="#22c55e"
                  name="אחוז הצלחה"
                />
                <Bar
                  yAxisId="right"
                  dataKey="avgTime"
                  fill="#3b82f6"
                  name="זמן ממוצע"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsView;
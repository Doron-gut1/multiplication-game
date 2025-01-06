import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Award, TrendingUp, Coins, Star } from 'lucide-react';
import { Card, CardContent } from '../../ui/card';
import { Button } from '../../ui/button';

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly';
  target: number;
  progress: number;
  reward: {
    coins?: number;
    stars?: number;
    xp: number;
  };
  expiresAt: Date;
  claimed: boolean;
}

interface ChallengesPanelProps {
  dailyChallenges: Challenge[];
  weeklyChallenges: Challenge[];
  onClaimReward: (challengeId: string) => void;
}

const ChallengesPanel: React.FC<ChallengesPanelProps> = ({
  dailyChallenges,
  weeklyChallenges,
  onClaimReward
}) => {
  const formatTimeLeft = (expiresAt: Date) => {
    const now = new Date();
    const diff = expiresAt.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const renderChallenge = (challenge: Challenge) => {
    const progress = (challenge.progress / challenge.target) * 100;
    const isCompleted = challenge.progress >= challenge.target;

    return (
      <motion.div
        key={challenge.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-md overflow-hidden"
      >
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{challenge.title}</h3>
                <p className="text-sm text-gray-600">{challenge.description}</p>
              </div>
              {challenge.type === 'daily' ? (
                <Calendar className="text-blue-500" />
              ) : (
                <TrendingUp className="text-purple-500" />
              )}
            </div>

            {/* Progress Bar */}
            <div className="relative pt-1">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-xs font-semibold inline-block text-blue-600">
                    {progress.toFixed(0)}%
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block">
                    {challenge.progress}/{challenge.target}
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-100">
                <motion.div
                  style={{ width: `${progress}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            <div className="flex justify-between items-center mt-2">
              {/* Reward */}
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600">
                  תגמול:
                </div>
                <div className="flex gap-2">
                  {challenge.reward.coins && (
                    <div className="flex items-center gap-1 text-yellow-600">
                      <Coins size={16} />
                      <span>{challenge.reward.coins}</span>
                    </div>
                  )}
                  {challenge.reward.stars && (
                    <div className="flex items-center gap-1 text-blue-600">
                      <Star size={16} />
                      <span>{challenge.reward.stars}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1 text-purple-600">
                    <Award size={16} />
                    <span>{challenge.reward.xp}XP</span>
                  </div>
                </div>
              </div>

              {/* Time Left */}
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock size={16} />
                <span>{formatTimeLeft(challenge.expiresAt)}</span>
              </div>
            </div>

            {/* Claim Button */}
            {isCompleted && !challenge.claimed && (
              <Button
                onClick={() => onClaimReward(challenge.id)}
                className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white"
              >
                קבל תגמול
              </Button>
            )}
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Daily Challenges */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">אתגרים יומיים</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dailyChallenges.map(renderChallenge)}
        </div>
      </div>

      {/* Weekly Challenges */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">אתגרים שבועיים</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {weeklyChallenges.map(renderChallenge)}
        </div>
      </div>
    </div>
  );
};

export default ChallengesPanel;
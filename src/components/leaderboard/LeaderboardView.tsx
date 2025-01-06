            <div className="text-center py-8 text-gray-500">
              עדיין אין שיאים בקטגוריה זו
            </div>
          ) : (
            <div className="space-y-2">
              {entries.map((entry, index) => (
                <motion.div
                  key={entry.userId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center justify-between p-3 rounded-lg ${user?.id === entry.userId ? 'bg-blue-50' : 'bg-white'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8">
                      {getRankIcon(index + 1)}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900">{entry.username}</span>
                      <span className="text-sm text-gray-500">
                        {new Date(entry.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-2xl text-blue-600">{entry.score}</span>
                    <Award className="text-yellow-500" size={20} />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LeaderboardView;
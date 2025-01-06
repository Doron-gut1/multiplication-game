            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center pointer-events-none"
          >
            <SuccessAnimation />
          </motion.div>
        )}

        {/* הודעת הישג חדש */}
        {newAchievement && (
          <AchievementPopup
            achievement={newAchievement}
            onClose={() => setNewAchievement(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default GameManager;
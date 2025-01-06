    // המשך מהקוד הקודם
    const currentTask = gameState.activeTasks[selectedAnimal];
    const isCorrect = TaskGenerator.validateAnswer(currentTask, answer);

    const timeToSolve = 0; // TODO: להוסיף מדידת זמן
    await StatisticsService.saveTaskStatistics(user.id, currentTask, timeToSolve, isCorrect);

    if (isCorrect) {
      setInputError(false);
      setShowSuccess(true);

      setPlayerState(prev => ({
        ...prev,
        currency: {
          ...prev.currency,
          coins: prev.currency.coins + 10
        },
        currentStreak: prev.currentStreak + 1,
        bestStreak: Math.max(prev.bestStreak, prev.currentStreak + 1),
        totalCorrectAnswers: prev.totalCorrectAnswers + 1,
        goals: {
          ...prev.goals,
          daily: {
            ...prev.goals.daily,
            tasksCompleted: prev.goals.daily.tasksCompleted + 1
          },
          weekly: {
            ...prev.goals.weekly,
            tasksCompleted: prev.goals.weekly.tasksCompleted + 1
          }
        }
      }));

      const updatedTasks = { ...gameState.activeTasks };
      delete updatedTasks[selectedAnimal];
      setGameState(prev => ({
        ...prev,
        activeTasks: updatedTasks
      }));

      setTimeout(() => {
        setSelectedAnimal(null);
        setShowSuccess(false);
      }, 1000);

      return true;
    } else {
      setInputError(true);
      setPlayerState(prev => ({
        ...prev,
        currentStreak: 0
      }));
      return false;
    }
  };

  // בחירת חיה וקבלת משימה חדשה
  const selectAnimal = (animalId: string, difficulty: Difficulty) => {
    setSelectedAnimal(animalId);
    setInputError(false);
    setShowSuccess(false);

    if (!gameState.activeTasks[animalId]) {
      const newTask = TaskGenerator.generateTask(difficulty, animalId);
      setGameState(prev => ({
        ...prev,
        activeTasks: {
          ...prev.activeTasks,
          [animalId]: newTask
        }
      }));
    }
  };

  // רכישת פריט מהחנות
  const purchaseItem = (item: ShopItem) => {
    setPlayerState(prev => ({
      ...prev,
      currency: {
        coins: prev.currency.coins - (item.price.coins || 0),
        stars: prev.currency.stars - (item.price.stars || 0)
      },
      inventory: [...prev.inventory, item]
    }));
  };

  return {
    playerState,
    gameState,
    selectedAnimal,
    inputError,
    showSuccess,
    newAchievement,
    checkAnswer,
    selectAnimal,
    purchaseItem,
    setGameState,
    checkAchievements
  };
}

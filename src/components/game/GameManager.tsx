// src/components/game/GameManager.tsx - Part 2
          [animalId]: newTask
        }
      }));
    }
  }, [gameState.activeTasks]);

  // טיפול ברכישה מהחנות
  const handlePurchase = useCallback((item: ShopItem) => {
    setPlayerState(prev => ({
      ...prev,
      currency: {
        coins: prev.currency.coins - (item.price.coins || 0),
        stars: prev.currency.stars - (item.price.stars || 0)
      },
      inventory: [...prev.inventory, item]
    }));
  }, []);

  // טיפול ביציאה
  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {/* כותרת וניקוד */}
      <div className="mb-6 flex justify-between items-center bg-white p-4 rounded-lg shadow">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-900">אזור המשחק</h2>
          {user && (
            <span className="text-sm text-gray-600">
              מחובר כ: {user.username}
            </span>
          )}
        </div>
        
        <div className="flex gap-4">
          {/* תצוגת מטבעות */}
          <div className="flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full">
            <Coins className="h-5 w-5" />
            <span className="font-bold">{playerState.currency.coins}</span>
          </div>

          {/* תצוגת כוכבים */}
          <div className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
            <Star className="h-5 w-5" />
            <span className="font-bold">{playerState.currency.stars}</span>
          </div>

          {/* תצוגת רמה ו-XP */}
          <div className="flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full">
            <Trophy className="h-5 w-5" />
            <span className="font-bold">רמה {playerState.level.current}</span>
          </div>

          {/* כפתורי ניווט */}
          <Button
            variant="outline"
            onClick={() => setGameState(prev => ({ ...prev, showShop: true }))}
            className="bg-white text-gray-700 hover:bg-gray-100"
          >
            <StoreIcon className="ml-2 h-5 w-5" />
            חנות
          </Button>
          <Button
            variant="outline"
            onClick={() => setGameState(prev => ({ ...prev, showAchievements: true }))}
            className="bg-white text-gray-700 hover:bg-gray-100"
          >
            <Trophy className="ml-2 h-5 w-5" />
            הישגים
          </Button>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="bg-white text-gray-700 hover:bg-gray-100"
          >
            <LogOut className="ml-2 h-5 w-5" />
            התנתק
          </Button>
        </div>
      </div>

      {/* אזור המשחק */}
      {!gameState.isPlaying ? (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setGameState(prev => ({ ...prev, isPlaying: true }))}
          className="bg-blue-500 text-white px-8 py-4 rounded-lg mx-auto block text-xl font-bold hover:bg-blue-600 transition-colors"
        >
          התחל משחק
        </motion.button>
      ) : (
        <div className="space-y-6">
          {/* אזור החווה */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <FarmArea 
              onAnimalClick={handleAnimalClick}
              activeTasks={gameState.activeTasks}
              playerItems={playerState.inventory}
            />
          </div>

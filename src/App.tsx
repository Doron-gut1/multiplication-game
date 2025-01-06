import './App.css';
import { UserProvider } from './context/UserContext';
import GameManager from './components/game/GameManager';
import LoginForm from './components/auth/LoginForm';
import { useUser } from './context/UserContext';
import { motion } from 'framer-motion';

function AppContent() {
  const { user, login, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-blue-500 rounded-full border-t-transparent"
        />
      </div>
    );
  }

  return (
    <div className="app">
      {!user ? <LoginForm onLogin={login} /> : <GameManager />}
    </div>
  );
}

function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

export default App;
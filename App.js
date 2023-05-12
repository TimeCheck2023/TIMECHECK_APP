import { AuthProvider } from './src/context/AuthContext';
import MainApp from './src/navigation/MainApp';


export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
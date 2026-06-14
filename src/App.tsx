import { AppProvider } from './app/provider';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import AppRouter from './router/AppRouter';

export function App() {
  return (
    <AppProvider>
      <ErrorBoundary>
        <AppRouter />
      </ErrorBoundary>
    </AppProvider>
  );
}

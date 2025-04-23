import { Component, ErrorInfo, ReactNode } from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

// Composant pour afficher l'erreur
function ErrorDisplay({ error }: { error: Error | null }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full p-6 text-center">
        <div className="flex justify-center mb-6">
          <AlertCircle className="h-12 w-12 text-destructive" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-3">
          Oups ! Une erreur est survenue
        </h1>
        <p className="text-muted-foreground mb-6">
          {error?.message || "Une erreur inattendue s'est produite."}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          Recharger la page
        </button>
      </div>
    </div>
  );
}

// Composant pour les erreurs de route
export function RouteErrorBoundary() {
  const error = useRouteError();
  let errorMessage = "Une erreur inattendue s'est produite";

  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  }

  return <ErrorDisplay error={new Error(errorMessage)} />;
}

// Composant pour les erreurs React
export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <ErrorDisplay error={new Error("Une erreur inattendue s'est produite")} />;
    }

    return this.props.children;
  }
} 
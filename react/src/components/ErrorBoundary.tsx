import { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

function fallbackRender({ error, resetErrorBoundary }) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: 'red' }}>{error.message}</pre>
    </div>
  );
}

export const GenericErrorBoundary = ({ children }: { children: ReactNode }) => {
  return <ErrorBoundary fallbackRender={fallbackRender}>{children}</ErrorBoundary>;
};

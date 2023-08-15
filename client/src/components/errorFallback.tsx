import { FallbackProps } from 'react-error-boundary';

function ErrorFallback({ error }: FallbackProps) {
  return (
    <div className='app'>
      <h2>Something went wrong.</h2>
      <p>{error.message}</p>
    </div>
  );
}

export default ErrorFallback;

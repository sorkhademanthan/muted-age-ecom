import { Button } from './button';
import { XCircleIcon } from '@heroicons/react/24/outline';

interface ErrorStateProps {
  title?: string;
  message?: string;
  retry?: () => void;
}

export function ErrorState({ 
  title = 'Something went wrong',
  message = 'We encountered an error. Please try again.',
  retry
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <XCircleIcon className="h-16 w-16 text-red-500 mb-4" />
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md">{message}</p>
      {retry && (
        <Button onClick={retry} variant="outline">
          Try Again
        </Button>
      )}
    </div>
  );
}

export function EmptyState({ 
  title = 'No items found',
  message = 'There are no items to display.',
  action
}: {
  title?: string;
  message?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="text-6xl mb-4">📦</div>
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md">{message}</p>
      {action}
    </div>
  );
}

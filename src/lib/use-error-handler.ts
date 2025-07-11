import { useCallback } from 'react';
import { toast } from 'sonner';

export interface UseErrorHandlerOptions {
  showToast?: boolean;
  logToConsole?: boolean;
  reportToService?: boolean;
}

export function useErrorHandler(options: UseErrorHandlerOptions = {}) {
  const { 
    showToast = true, 
    logToConsole = true, 
    reportToService = false 
  } = options;

  const handleError = useCallback((error: Error | unknown, context?: string) => {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const fullContext = context ? `${context}: ${errorMessage}` : errorMessage;

    // Log to console in development
    if (logToConsole && process.env.NODE_ENV === 'development') {
      console.error(fullContext, error);
    }

    // Show toast notification
    if (showToast) {
      toast.error(errorMessage || 'An unexpected error occurred');
    }

    // Report to error tracking service in production
    if (reportToService && process.env.NODE_ENV === 'production') {
      // Here you would integrate with services like Sentry, LogRocket, etc.
      console.error('Error to report:', fullContext, error);
    }
  }, [showToast, logToConsole, reportToService]);

  const handleApiError = useCallback((error: any, operation?: string) => {
    let message = 'An unexpected error occurred';
    
    if (error?.response?.data?.message) {
      message = error.response.data.message;
    } else if (error?.message) {
      message = error.message;
    }

    const context = operation ? `API Error (${operation})` : 'API Error';
    handleError(new Error(message), context);
  }, [handleError]);

  const handleNetworkError = useCallback(() => {
    handleError(new Error('Network error. Please check your connection and try again.'), 'Network');
  }, [handleError]);

  return {
    handleError,
    handleApiError,
    handleNetworkError,
  };
}

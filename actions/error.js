export const RESET_ERROR = 'RESET_ERROR';

// Resets the current error object (!).
export function resetError() {
  return {
    type: RESET_ERROR
  }
}
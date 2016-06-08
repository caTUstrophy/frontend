export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';

// Resets the currently visible error message.
export function resetErrorMessage() {
  return {
    type: RESET_ERROR_MESSAGE
  }
}

export const TOGGLE_USER_MENU = 'TOGGLE_USER_MENU';

// Opens user menu
export function toggleUserMenu() {
  return {
    type: TOGGLE_USER_MENU
  }
}
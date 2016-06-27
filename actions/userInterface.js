export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';

// Resets the currently visible error message.
export function resetErrorMessage() {
  return {
    type: RESET_ERROR_MESSAGE
  }
}

export const RESET_NOTIFICATION_MESSAGE = 'RESET_NOTIFICATION_MESSAGE';

// Resets the currently visible notification message.
export function resetNotificationMessage() {
  return {
    type: RESET_NOTIFICATION_MESSAGE
  }
}

export const TOGGLE_USER_MENU = 'TOGGLE_USER_MENU';

// Opens user menu
export function toggleUserMenu() {
  return {
    type: TOGGLE_USER_MENU
  }
}

export const TOGGLE_SIDE_MENU = 'TOGGLE_SIDE_MENU';

// Opens user menu
export function toggleSideMenu() {
  return {
    type: TOGGLE_SIDE_MENU
  }
}

export const MANAGE_PAGE_SELECT_ITEM = 'MANAGE_PAGE_SELECT_ITEM';

export function managePageSelectItem(itemType, item) {
  return {
    type: MANAGE_PAGE_SELECT_ITEM,
    itemType,
    item
  }
}

export const MANAGE_PAGE_UNSELECT_ITEM = 'MANAGE_PAGE_UNSELECT_ITEM';

export function managePageUnselectItem(itemType, item) {
  return {
    type: MANAGE_PAGE_UNSELECT_ITEM
  }
}
import { CALL_API, Schemas } from '../middleware/api'
import { authorized } from './authorizationHelpers'

export const NOTIFICATION_REQUEST = 'NOTIFICATION_REQUEST';
export const NOTIFICATION_SUCCESS = 'NOTIFICATION_SUCCESS';
export const NOTIFICATION_FAILURE = 'NOTIFICATION_FAILURE';

// Fetches a single notification
// Relies on the custom API middleware defined in ../middleware/api.js.
function fetchNotification(notificationId) {
  return {
    [CALL_API]: {
      types: [ NOTIFICATION_REQUEST, NOTIFICATION_SUCCESS, NOTIFICATION_FAILURE ],
      endpoint: `notifications/${notificationId}`,
      schema: Schemas.NOTIFICATION
    }
  }
}

// Fetches a single notification unless it is cached.
// Relies on Redux Thunk middleware.
export function loadNotification(notificationId, requiredFields = []) {
  return (dispatch, getState) => {
    if (__USE_FRONTEND_CACHES__) {
      const notification = getState().entities.notifications[notificationId];
      if (notification && requiredFields.every(key => notification.hasOwnProperty(key))) {
        return null;
      }
    }

    return dispatch(authorized(getState().login.jwt)(fetchNotification(notificationId)));
  }
}

export const NOTIFICATIONS_REQUEST = 'NOTIFICATIONS_REQUEST';
export const NOTIFICATIONS_SUCCESS = 'NOTIFICATIONS_SUCCESS';
export const NOTIFICATIONS_FAILURE = 'NOTIFICATIONS_FAILURE';

// Fetches all notifications
// Relies on the custom API middleware defined in ../middleware/api.js.
function fetchNotifications() {
  return {
    [CALL_API]: {
      types: [ NOTIFICATIONS_REQUEST, NOTIFICATIONS_SUCCESS, NOTIFICATIONS_FAILURE ],
      endpoint: `notifications`,
      schema: Schemas.NOTIFICATION_ARRAY
    }
  }
}

// Fetches all notifications (unless it is cached)
// Relies on Redux Thunk middleware.
export function loadNotifications(requiredFields = []) {
  return (dispatch, getState) => {
    return dispatch(authorized(getState().login.jwt)(fetchNotifications()))
  }
}

export const PUT_READ_NOTIFICATION = 'PUT_READ_NOTIFICATION';
export const PUT_READ_NOTIFICATION_SUCCESS = 'PUT_READ_NOTIFICATION_SUCCESS';
export const PUT_READ_NOTIFICATION_FAILURE = 'PUT_READ_NOTIFICATION_FAILURE';

// Fetches user profile
// Relies on the custom API middleware defined in ../middleware/api.js.
function putNotificationToRead(notificationID) {
  return {
    [CALL_API]: {
      types: [ PUT_READ_NOTIFICATION, PUT_READ_NOTIFICATION_SUCCESS, PUT_READ_NOTIFICATION_FAILURE ],
      endpoint: `notifications/${notificationID}`,
      verb: 'PUT',
      payload: {Read: true}
    }
  }
}

// Fetches user profile
// Relies on Redux Thunk middleware.

export function updateNotificationToRead(notificationID) {
  return (dispatch, getState) => {
    return dispatch(authorized(getState().login.jwt)(putNotificationToRead(notificationID)))
  }
}
import extractMatching from './extractMatching';

export default function (state, notificationId) {
  const { notifications } = state.entities;

  let notification = notifications[notificationId];
  if (!notification) {
    return null;
  }

  notification = Object.assign({}, notification);

  switch (notification.Type) {
    case 'matching':
      notification.matching = extractMatching(state, notification.ItemID); // matchings[notification.ItemID];
      break;
    default:
      console.warn(`Unsupported notification type: ${notification.Type}`);
  }

  return notification;
}
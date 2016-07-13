export default function (state, entities, requests) {
  let entityArray = Array.isArray(entities) ? entities : [entities];
  if (entityArray.some((entity => entity === undefined || entity === null))) {
    return true;
  }
  
  let requestArray = Array.isArray(requests) ? requests : [requests];
  let isRequestsLoading = requestArray.some(request => state.loading.includes(request));
  let isEntities = entityArray.some(entity => !!entity);
  
  return !isEntities && isRequestsLoading;
}
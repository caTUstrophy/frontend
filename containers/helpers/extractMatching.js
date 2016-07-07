export default function (state, matchingId) {
  const { offers, requests, matchings } = state.entities;

  let matching = matchings[matchingId];
  if (!matching) {
    return null;
  }

  let offer = offers[matching.Offer];
  let request = requests[matching.Request];

  if (!offer || !request) {
    return null;
  }

  return Object.assign({}, matching, { Offer: offer, Request: request });
}
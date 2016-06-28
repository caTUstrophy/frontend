export default function (state, regionId) {

  const { regions, users } = state.entities;
  const { regionAdmins } = state.mappings;

  let admins = [];
  if (regionAdmins[regionId]) {
    admins = regionAdmins[regionId].map(userId => users[userId]);
  }

  return Object.assign({}, regions[regionId], { admins });
}
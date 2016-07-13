function checkAnyGroupWithAccessRight(accessRight) {
  return function (profile) {
    if (!profile) {
      return false;
    }
  
    return profile.Groups.some(group => group.AccessRight == accessRight);
  }
}

export const isUserAdminAnywhere = checkAnyGroupWithAccessRight('admin');

export const isUserSuperAdmin = checkAnyGroupWithAccessRight('superadmin');
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */

const checkPermission = (permissions: string[]) => {
  const permissionData = localStorage.getItem('permission');
  if (typeof permissionData === 'string') {
    // const per = permissionData && JSON.parse(permissionData);

    // return permissions.map(p => per[p]);
    return true
  }
  return true
};
export default checkPermission;

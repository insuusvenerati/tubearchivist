import { UserMeType } from '../../api/update-user-config.server';

const loadIsAdmin = (config: UserMeType) => {
  const isAdmin = config.is_staff || config.is_superuser;

  return isAdmin;
};

export default loadIsAdmin;

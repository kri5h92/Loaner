import { USER_ROLES } from '../common/constants';

export const getUserRoleOptions = () => [
  {
    value: USER_ROLES.ADMIN,
    label: 'Admin'
  },
  {
    value: USER_ROLES.CUSTOMER,
    label: 'Customer'
  },
  {
    value: USER_ROLES.AGENT,
    label: 'Agent'
  }
];

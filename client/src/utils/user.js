export const USER_ROLES = {
  CUSTOMER: 'customer',
  AGENT: 'agent',
  ADMIN: 'admin'
};

export const selectRoleOptions = [
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

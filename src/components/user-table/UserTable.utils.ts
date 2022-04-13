export const columns: Array<ColumnType> = [
  {
    columnName: 'Name',
    apiString: 'name',
  },
  {
    columnName: 'Email',
    apiString: 'email',
  },
  {
    columnName: 'City',
    apiString: 'address.city',
  },
  {
    columnName: 'Company',
    apiString: 'company.name',
  },
];

export const accessValueFromApiString = (user: User, apiString: string) => {
  if (!apiString.includes('.')) return user[apiString as keyof User];

  const arr = apiString.split('.');
  let val: any = user;

  for (const key of arr) {
    val = val[key];
  }

  return val;
};

export const filterSearchedUsers = (
  users: Array<User>,
  filterString: string
) => {
  const regex = new RegExp('.*' + filterString + '.*', 'i');
  return users.filter((user) => regex.test(user.name));
};

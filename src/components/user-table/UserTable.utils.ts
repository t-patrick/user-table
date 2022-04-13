export const columns: Array<ColumnType> = [
  {
    columnName: 'Name',
    apiKey: 'name',
  },
  {
    columnName: 'Email',
    apiKey: 'email',
  },
  {
    columnName: 'City',
    apiKey: 'address.city',
  },
  {
    columnName: 'Company',
    apiKey: 'company.name',
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

export const getUsers = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await response.json();
  return users;
};

export const getPosts = async (user: User) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${user.id}`
  );

  const posts = await response.json();
  return posts;
};

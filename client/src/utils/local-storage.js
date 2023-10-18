const addUserToLocalStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};
const getUserFromLocalStorage = () => {
  const result = localStorage.getItem("user");
  const user = result ? JSON.parse(result) : null;
  return user;
};
const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
};

export {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
};

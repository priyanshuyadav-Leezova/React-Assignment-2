const KEYS = {
  USERS: 'registeredUsers',
  ACTIVE_SESSION: 'activeUser',
  TASKS: 'userTasks'
};
export const storageService = {
  getUsers: () => {
    return JSON.parse(localStorage.getItem(KEYS.USERS)) || [];
  },
  saveUser: (userData) => {
    const users = storageService.getUsers();
    const updatedUsers = [...users, userData];
    localStorage.setItem(KEYS.USERS, JSON.stringify(updatedUsers));
  },
  setActiveUser: (user) => {
    localStorage.setItem(KEYS.ACTIVE_SESSION, JSON.stringify(user));
  },
  getActiveUser: () => {
    const saved = localStorage.getItem(KEYS.ACTIVE_SESSION);
    return saved ? JSON.parse(saved) : null;
  },
  removeActiveUser: () => {
    localStorage.removeItem(KEYS.ACTIVE_SESSION);
  },

  // Save the entire tasks array
  saveTasks: (tasks) => {
    localStorage.setItem(KEYS.TASKS, JSON.stringify(tasks));
  },

  // Get the tasks array
  getTasks: () => {
    const saved = localStorage.getItem(KEYS.TASKS);
    return saved ? JSON.parse(saved) : [];
  }
};

const addListToLocalStorage = (listToStore) => {
  localStorage.setItem('taskList', JSON.stringify(listToStore));
};

const loadListFromLocalStorage = () => {
  const listToLoad = JSON.parse(localStorage.getItem('taskList'));
  if (listToLoad === null) {
    return [];
  }
  return listToLoad;
};

export { addListToLocalStorage, loadListFromLocalStorage };

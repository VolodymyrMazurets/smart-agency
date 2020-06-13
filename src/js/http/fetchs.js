import { urls } from './urls';
import { renderUsersList, renderProductsList } from '../helpers';

export const fetchUsers = async () => {
  try {
    loader.classList.add('active');
    const usersTest = await fetch(urls.users).then((res) => res.json());
    users.innerHTML = renderUsersList(usersTest).join('');
    loader.classList.remove('active');
  } catch (e) {
    UIkit.notification({
      message: e,
      status: 'danger',
      pos: 'top-right',
      timeout: 3000,
    });
  }
};

export const fetchProducts = async () => {
  try {
    const data = await fetch(urls.products).then((res) => res.json());
    products.innerHTML = renderProductsList(data).join('');
  } catch (e) {
    UIkit.notification({
      message: e,
      status: 'danger',
      pos: 'top-right',
      timeout: 3000,
    });
  }
};

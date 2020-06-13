import { urls } from './urls';
import { renderUsersList } from '../helpers';
import { getItem } from '../helpers';

const loader = getItem('loader');

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
    const products = await fetch(urls.products).then((res) => res.json());
    console.log(products);
  } catch (e) {
    UIkit.notification({
      message: e,
      status: 'danger',
      pos: 'top-right',
      timeout: 3000,
    });
  }
};

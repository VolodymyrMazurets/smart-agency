import { fetchUsers, fetchProducts } from './http';
import { getItem } from './helpers';

const users = getItem('users');
const showUsers = getItem('show-users');
const modal = getItem('modal');

showUsers.onclick = async () => {
  users.innerHTML = '';
  UIkit.modal(modal).show();
  await fetchUsers();
};

fetchProducts();
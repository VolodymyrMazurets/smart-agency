import { fetchUsers, fetchProducts } from './http';
import { getItem } from './helpers';

const users = getItem('users');
const showUsers = getItem('show-users');
const modal = getItem('modal');
const loader = getItem('loader');
const products = getItem('products');

showUsers.onclick = async () => {
  users.innerHTML = '';
  UIkit.modal(modal).show();
  await fetchUsers();
};

document.addEventListener('DOMContentLoaded', () => {
  fetchProducts();
});

// const shoppingList = [
//   {
//     name: 'bread',
//     count: 2,
//     isBought: true,
//   },
//   {
//     name: 'butter',
//     count: 1,
//     isBought: true,
//   },
//   {
//     name: 'milk',
//     count: 3,
//     isBought: false,
//   },
//   {
//     name: 'egg',
//     count: 6,
//     isBought: false,
//   },
//   {
//     name: 'tomato',
//     count: 8,
//     isBought: false,
//   },
//   {
//     name: 'sauce',
//     count: 1,
//     isBought: true,
//   },
// ];

// const addBuyingProduct = (name, arr) => {
//   for (let i = 0; i < arr.length; i++) {
//     if (name === arr[i].name) {
//       arr[i].isBought = true;
//     }
//   }
//   return arr;
// };

// const addPurchasedProduct = (arr = [], name='') => {
//   let res = [...arr];
//   const idx = arr.findIndex((item) => item.name === name);
//   const element = arr.find((item) => item.name === name);
//   element.isBought = true;
//   res.splice(idx, 1, element);
//   return res;
// };

// console.log(addPurchasedProduct(shoppingList, 'tomato'));



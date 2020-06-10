import { urls } from './urls';

const getItem = (id) => {
  return document.getElementById(id);
};
const users = getItem('users');

const renderList = (data) => {
  const result = data.map((item) => {
    return `<li class="uk-card uk-card-default uk-card-body uk-width-1-2@m">
        <h3 class="uk-card-title">${item.name.firstname} ${item.name.lastname}</h3>
        <p>${item.email}</p>
      </li>`;
  });
  return result;
};

fetch(urls.users)
  .then((res) => res.json())
  .then((json) => {
    users.innerHTML = renderList(json).join('')
  });

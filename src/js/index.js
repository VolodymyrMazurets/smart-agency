import { urls } from './urls';

const getItem = (id) => {
  return document.getElementById(id);
};
const users = getItem('users');
const loader = getItem('loader');

const renderList = (data) => {
  const result = data.map((item) => {
    return `<li class="uk-card uk-card-default uk-card-body uk-width-1-2@m">
        <img src="https://robohash.org/honey?set=set${item.id}" alt="user" width="80px" height="80px"/>
        <h3 class="uk-card-title">${item.name.firstname} ${item.name.lastname}</h3>
        <p>${item.email}</p>
      </li>`;
  });
  return result;
};

// fetch(urls.users)
//   .then((res) => res.json())
//   .then((json) => {
//     users.innerHTML = renderList(json).join('');
//   });

const testData = async () => {
  try {
    loader.classList.add('active');
    const usersTest = await fetch(urls.users).then((res) => res.json());
    users.innerHTML = renderList(usersTest).join('');
  loader.classList.remove('active');
  } catch (e) {
    UIkit.notification({
      message: e,
      status: 'danger',
      pos: 'top-right',
      timeout: 3000
  });
  } finally {

  }
};

document.addEventListener('DOMContentLoaded', () => {
  testData();
})

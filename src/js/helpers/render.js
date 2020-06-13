export const renderUsersList = (data) => {
  const result = data.map((item) => {
    return `<li class="uk-card uk-card-default uk-card-body">
          <img src="https://robohash.org/honey?set=set${item.id}" alt="user" width="80px" height="80px"/>
          <h3 class="uk-card-title">${item.name.firstname} ${item.name.lastname}</h3>
          <p>${item.email}</p>
        </li>`;
  });
  return result;
};

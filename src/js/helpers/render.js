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

export const renderProductsList = (data) => {
  const result = data.map((item) => {
    return ` <li class="uk-card uk-card-default products__item">
              <div class="uk-card-media-top products__card-head">
                <img src="${item.image}" alt="user" />
              </div>
              <div class="uk-card-body">
                <h3 class="uk-card-title">${item.title}</h3>
                <p>${item.description}</p>
              </div>
            </li>`;
  });
  return result;
};

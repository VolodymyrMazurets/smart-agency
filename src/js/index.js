const list = document.getElementById('list');
const loader = document.getElementById('loader');

const randomColor = () => {
  const round = Math.round;
  const random = Math.random;
  const koef = 255;
  return `rgba(${round(random() * koef)},${round(random() * koef)},${round(random() * koef)},${random().toFixed(1)})`;
};

const renderList = (data) => {
  const listItem = data.map(({ icon, title, text, link }) => {
    return `<li class="working-process__item">
                <div class="working-process__card" style="background-color: ${randomColor()}">
                  <div class="working-process__wrapper">
                    <i class="${icon} working-process__icon" style="color: ${randomColor()}"></i>
                    <h4 class="working-process__card-title">${title}</h4>
                    <p class="working-process__card-text">
                      ${text}
                    </p>
                </div>
                <a href="${link}" class="working-process__card-btn">
                  <i class="fas fa-plus"></i>
                  Know More
                </a>
              </div>
          </li>`;
  });
  list.innerHTML = listItem.join('');
};

const fetchData = async () => {
  // btn.innerHTML = "<span uk-spinner></span>";
  setTimeout(async () => {
    try {
      loader.style.cssText = 'display: block';
      await fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => {
          // btn.innerHTML = 'Primary';
          return response.json();
        })
        .then((json) => {
          const resp = json.map((item) => ({
            text: item.body,
            title: item.title,
            link: '#',
            icon: 'fas fa-magnet',
          }));
          renderList(resp);
          loader.style.cssText = 'display: none';
        });
    } catch (e) {
      console.error(e);
    }
  }, 2000);
};
fetchData();

// const TEST_DATA = [
//   {
//     id: 1,
//     icon: "fas fa-magnet",
//     title: "Koc Koi Tomi",
//     text: "Lorem ipsum is dummy lorem very dumy",
//     link: "#",
//   },
//   {
//     id: 2,
//     icon: "fas fa-bug",
//     title: "Koimona Set",
//     text: "Lorem ipsum is dummy lorem very dumyddddd",
//     link: "#",
//   },
//   {
//     id: 3,
//     icon: "fas fa-cogs",
//     title: "Setting Koire",
//     text: "Lorem ipsum is dummy lorem very dumy ddddd",
//     link: "#",
//   },
//   {
//     id: 4,
//     icon: "fas fa-camera-retro",
//     title: "Ko Image Lara",
//     text: "Lorem ipsum is dummy lorem very dumy dddddddda",
//     link: "#",
//   },
// ];

// ES 5
// function User(name) {
//   this.name = name;
// };

// User.prototype.sayHi = function() {
//   alert(this.name);
// }

// class User {
//   constructor(name, id, email, token) {
//     this.name = name;
//     this.id = id;
//     this.email = email;
//     this.token = token;
//   }
//   sayHi() {
//     alert(this.name);
//   }
// }

// const user = new User("Vova");
// user.sayHi();

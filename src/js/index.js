const list = document.getElementById("list");
const btn = document.getElementById("btn");

const TEST_DATA = [
  {
    id: 1,
    icon: "fas fa-magnet",
    title: "Koc Koi Tomi",
    text: "Lorem ipsum is dummy lorem very dumy",
    link: "#",
  },
  {
    id: 2,
    icon: "fas fa-bug",
    title: "Koimona Set",
    text: "Lorem ipsum is dummy lorem very dumyddddd",
    link: "#",
  },
  {
    id: 3,
    icon: "fas fa-cogs",
    title: "Setting Koire",
    text: "Lorem ipsum is dummy lorem very dumy ddddd",
    link: "#",
  },
  {
    id: 4,
    icon: "fas fa-camera-retro",
    title: "Ko Image Lara",
    text: "Lorem ipsum is dummy lorem very dumy dddddddda",
    link: "#",
  },
];

const renderList = (data) => {
  const listItem = data.map(({ icon, title, text, link }) => {
    return `<li class="working-process__item">
                <div class="working-process__wrapper">
                <i class="${icon} working-process__icon"></i>
                <h4 class="working-process__card-title">${title}</h4>
                <p class="working-process__card-text">
                  ${text}
                </p>
            </div>
            <a href="${link}" class="working-process__card-btn">
              <i class="fas fa-plus"></i>
              Know More
            </a>
          </li>`;
  });
  list.innerHTML = listItem.join("");
};



const fetchData = async () => {
  btn.innerHTML = "<span uk-spinner></span>";
  try {
    await fetch("https://jsonplaceholder.typicode.com/plfajlkafj")
    .then((response) => {
      btn.innerHTML = "Primary";
      return response.json();
    })
    .then((json) => {
      const resp = (json).map((item) => ({text: item.body, title: item.title, link: '#', icon: 'fas fa-magnet'}));
      renderList(resp);
    });
  } catch (e) {
    console.log(e);
  }
  
};

btn.addEventListener("click", () => fetchData());

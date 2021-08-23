async function getData() {
  const data = await fetch(
    "https://611f26289771bf001785c71b.mockapi.io/profiles",
    { method: "GET" }
  );
  const details = await data.json();
  document.querySelector(".user-list").innerHTML = ``;
  // console.log(details);
  details.forEach((datas) => createProfile(datas));
}

function createProfile({ name, avatar, createdAt, id }) {
  // console.log(avatar);
  const info = document.createElement("div");

  info.className = "container";
  info.innerHTML = `
      <div class="profile-container">
      <img class="profile" src="${avatar}"  >
      </div>
      
      <div class="details">
      <h3>${name}</h3>
      <p>${new Date(createdAt).toDateString()}</p>
      <div>
      
      <button class="delete" onclick="deleteUser(${id})">Delete</button>
      <button class="edit" onclick="editUser(${id})">Edit</button>
      </div>
      </div>
      `;
  document.querySelector(".user-list").append(info);
}

getData();

async function deleteUser(id) {
  const data = await fetch(
    `https://611f26289771bf001785c71b.mockapi.io/profiles/${id}`,
    { method: "DELETE" }
  );
  const details = await data.json();
  getData();
  console.log(details);
}
let send = document.querySelector(".send");

async function sendData() {
  send.style.display = "none";
  name = document.querySelector("#user_name").value;
  avatar = document.querySelector("#avatar").value;
  date = new Date().toISOString();
  console.log(name, avatar, date);
  post = await fetch("https://611f26289771bf001785c71b.mockapi.io/profiles", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      createdAt: date,
      name: name,
      avatar: avatar,
    }),
  });
  data = await post.json();
  getData();
  document.querySelector("#user_name").value = "";
  document.querySelector("#avatar").value = " ";
  data.forEach((update) => {
    createProfile(update);
  });
}

async function editUser(id) {
  send.style.display = "none";
  name = document.querySelector("#user_name").value;
  avatar = document.querySelector("#avatar").value;
  date = new Date().toISOString();
  console.log(name, avatar, date);
  post = await fetch(
    `https://611f26289771bf001785c71b.mockapi.io/profiles/${id}`,
    {
      method: "PUT",

      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        createdAt: date,
        name: name,
        avatar: avatar,
      }),
    }
  );
  data = await post.json();
  getData();
  document.querySelector("#user_name").value = "";
  document.querySelector("#avatar").value = " ";
  data.forEach((update) => {
    createProfile(update);
  });
}

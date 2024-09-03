import "./style.css";

const $userList = document.getElementById("user-list");

document.addEventListener("DOMContentLoaded", async () => {
  const $createUserForm = document.getElementById("cereate-user-form");

  const renderAllUsers = async () => {
    $userList.innerHTML = "";
    return fetch("http://localhost:5000/users")
      .then((e) => e.json())
      .then((listOfUsers) => {
        listOfUsers.forEach((user) => {
          $userList.innerHTML += `<p>
            <span>
              <b>${user.Nombre}</b>
            </span>
            <span>
              ${user.Apellido}
            </span>
          </p>`;
        });
      });
  };

  $createUserForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const Nombre = document.getElementById("nombre").value;
    const Apellido = document.getElementById("apellido").value;
    const DNI = document.getElementById("dni").value;

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Nombre,
        Apellido,
        DNI,
      }),
    }).then(async (res) => {
      console.log(res);

      if (res.status == 201) {
        alert("Usuario creado correctamente");
        await renderAllUsers();
      } else {
        alert("error al crear el usuario");
      }
    });

    e.target.reset();
  });
  await renderAllUsers();
});

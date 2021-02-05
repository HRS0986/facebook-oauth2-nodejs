document.getElementById("fb").addEventListener("click", fbLogin, false);

function fbLogin() {
  FB.login(
    (res) => {
      if (res.status == "connected") {
        const {
          authResponse: { accessToken, userID },
        } = res;
        fetch("/auth/get-fb-access", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ accessToken, userID }),
        })
          .then((res) => res.json())
          .then((data) => {  
            if (data.status == true) {
              // sessionStorage.setItem('id', data.data.id);
              // sessionStorage.setItem('name', data.data.name);
              // sessionStorage.setItem('email', data.data.email);
              loggedStyles(data);
            } else {
              console.log('Login Failed')
            }
          })
          .catch((err) => console.log(err));
      } else {
        console.log("Login Failed");
      }
    },
    { scope: "public_profile,email" }
  );
}

function fbLogout() {
  FB.logout(noneStyles())
}

function loggedStyles(data) {
  document.getElementById('fbout').style.display = "block";
  document.getElementById("fb").style.display = "none";
  document.getElementById("status").style.display = "block";

  const name = document.getElementById("name");
  const email = document.getElementById("email");

  name.innerText = "Name : " + data.data.name;
  email.innerText = "Email : " + data.data.email;
  name.style.display = "block";
  email.style.display = "block";
}

function noneStyles() {
  document.getElementById('fbout').style.display = "none";
  document.getElementById("fb").style.display = "block";
  document.getElementById("status").style.display = "none";
  document.getElementById("name").style.display = "none";
  document.getElementById("email").style.display = "none";
}

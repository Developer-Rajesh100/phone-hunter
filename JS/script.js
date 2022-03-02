const spinner = (displayStyle) => {
  document.getElementById("loading-gifs").style.display = displayStyle;
};
const allMobiles = () => {
  document.getElementById("product-zone").innerHTML = "";
  const searchBox = document.getElementById("search-box").value;
  searchBox.value = " ";
  spinner("block");
  const mobileUrl = ` https://openapi.programming-hero.com/api/phones?search=${searchBox}`;
  console.log(mobileUrl);
  fetch(mobileUrl)
    .then((response) => response.json())
    .then((data) => displayMobiles(data.data));
};
const displayMobiles = (mobiles) => {
  const first20Data = mobiles.slice(0, 20);
  if (mobiles.length == "") {
    Swal.fire({
      title:
        "Your Searched Product is Not Found \n Product Available : OPPO, SAMSUNG, IPHONE, HUAWEI",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
  } else {
    for (const mobile of first20Data) {
      const productZone = document.getElementById("product-zone");
      const div = document.createElement("div");
      div.innerHTML = ` <div class="col">
    <div class="card p-3">
        <img src="${mobile.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${mobile.phone_name}</h5>
            <p class="card-text">Brand : ${mobile.brand}</p>
            <button type="button" onclick="seeMore('${mobile.slug}')" class="btn btn-outline-info">See More</button>
        </div>
    </div>
</div>`;
      productZone.appendChild(div);
      console.log(mobile);
    }
    spinner("none");
  }
};
const seeMore = (info) => {
  const mobileUrl = `https://openapi.programming-hero.com/api/phone/${info}`;
  fetch(mobileUrl)
    .then((response) => response.json())
    .then((data) => setDetails(data.data));
  window.scrollTo(0, 0);
};
const setDetails = (info) => {
  document.getElementById("mobile-fetchers").innerHTML = `
  <div class="col-0 col-sm-4"></div>
  <div class="col-12 col-sm-6">
  <div>
      <img src="${info.image}" alt="">
      <h1 class="text-info">Product Details</h1>
      <p>Brand : ${info.brand}</p>
      <p>Product Name : ${info.name}</p>
      <p>Reles Date : ${info.releaseDate}</p>
      <h1 Class="text-info">Product Feature</h1>
      <p>chipest : ${info.mainFeatures.chipSet}</p>
      <p>Display Size : ${info.mainFeatures.displaySize}</p>
      <p>Memory : ${info.mainFeatures.memory}</p>
      <p>Storage : ${info.mainFeatures.storage}</p>
  </div>
</div>`;
  if (info.mainFeatures.status == true) {
    document.getElementById("error-massage").style.display = "block";
  }
};

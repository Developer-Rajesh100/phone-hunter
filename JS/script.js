const allMobiles = () => {
  const searchBox = document.getElementById("search-box").value;
  const mobileUrl = ` https://openapi.programming-hero.com/api/phones?search=${searchBox}`;

  console.log(mobileUrl);
  fetch(mobileUrl)
    .then((response) => response.json())
    .then((data) => displayMobiles(data.data));
};

const displayMobiles = (mobiles) => {
  for (const mobile of mobiles) {
    const productZone = document.getElementById("product-zone");
    const div = document.createElement("div");
    div.innerHTML = ` <div class="col">
    <div class="card p-3">
        <img src="${mobile.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${mobile.phone_name}</h5>
            <p class="card-text">Brand : ${mobile.brand}</p>
            <button type="button" class="btn btn-outline-info">See More</button>
        </div>
    </div>
</div>`;
    productZone.appendChild(div);
    console.log(mobile);
  }
};

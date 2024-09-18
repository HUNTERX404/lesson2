import { getProducts } from "./index.js";
// Nike, Adidas, Puma, Reebok, New Balance
const pageSize = 8;
const params = new URLSearchParams(window.location.search);
console.log("params:", params.get("page"));
const pageNumber = params.get("page") ?? 1;
const initial = async () => {
  const response = (await getProducts(pageSize, pageNumber)) ?? [];
  const keys = Object.keys(response.data[0]);
  const headTable = document.querySelector("#headTable");
  keys.forEach((key, index) => {
    headTable.innerHTML += `<th scope="col">${key}</th>
`;
  });
  headTable.innerHTML += `<th scope="col">actions</th>`;
  const bodyTable = document.querySelector("#bodyTable");
  response.data.forEach((element) => {
    const item = `<tr>
          <th scope="row">${element.brand}</th>
          <td>${element.size}</td>
          <td>${element.color}</td>
          <td>${element.price} $</td>
          <td>${element.release_date}</td>
           <td>${1}</td>
        </tr>`;
    bodyTable.innerHTML += item;
  });
  const pagination = document.querySelector(".pagination");
  const numPages = response.pages;
  // response.items % pageSize === 0
  //   ? response.items / pageSize
  //   : response.items / pageSize + 1;
  pagination.innerHTML += ` <li class="page-item ${
    response.prev === null ? "disabled" : ""
  }">
      <a href="./index.html?page=${
        parseInt(pageNumber) - 1
      }&pageSize=${pageSize}" class="page-link">Previous</a>
    </li>`;
  for (let i = 1; i <= numPages; i++) {
    pagination.innerHTML += `<li class="page-item ${
      parseInt(pageNumber) === i ? "active" : ""
    }"><a class="page-link" href="./index.html?page=${i}&pageSize=${pageSize}">${i}</a></li>`;
  }
  pagination.innerHTML += `<li class="page-item">
      <a class="page-link ${
        response.next === null ? "disabled" : ""
      }" href="./index.html?page=${
    parseInt(pageNumber) + 1
  }&pageSize=${pageSize}">Next</a>
    </li>`;
};
initial();

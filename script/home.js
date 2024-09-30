import { deleteProduct, getProducts } from "./index.js";
// import * as Popper from "@popperjs/core";
// import { Modal } from "../node_modules/bootstrap/dist/js/bootstrap.esm.js";
// Nike, Adidas, Puma, Reebok, New Balance
window.Popper = Popper;
const params = new URLSearchParams(window.location.search);
const pageSize = params.get("pageSize") ? parseInt(params.get("pageSize")) : 8;
console.log("params:", params.get("page"));
const pageNumber = params.get("page") ?? 1;
const initial = async () => {
  const response = (await getProducts(pageSize, pageNumber)) ?? [];
  setTable(response);
  pagination(response);
  numberOfRows(response);
};
initial();

function pagination(response) {
  const pagination = document.querySelector(".pagination");
  const numPages = response.pages;
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
}
function numberOfRows(response) {
  const numRows = document.querySelector("#numRows");
  let multi = 8;
  while (multi <= response.items) {
    numRows.innerHTML +=
      multi === pageSize
        ? `<option selected="" value="${multi}">${multi}</option>`
        : `<option value="${multi}">${multi}</option>`;
    multi *= 2;
  }
  numRows.innerHTML +=
    response.items === pageSize
      ? `<option selected="" value="${response.items}">all</option>`
      : `<option value="${response.items}">all</option>`;
  numRows.addEventListener("change", (event) => {
    console.log("test");
    console.log("event", event.target.value);
    const url = new URL(window.location.href);
    url.searchParams.set("pageSize", event.target.value);
    // window.location.reload()
    window.location.href = url;
  });
}
function setTable(response) {
  const keys = Object.keys(response.data[0]);
  const headTable = document.querySelector("#headTable");
  keys.forEach((key, index) => {
    headTable.innerHTML += `<th scope="col">${key}</th>
`;
  });
  headTable.innerHTML += `<th scope="col">actions</th>`;
  const bodyTable = document.querySelector("#bodyTable");
  let item = "";
  response.data.forEach((element, index) => {
    item += `<tr>
          <th scope="row">${element.brand}</th>
          <td>${element.size}</td>
          <td>${element.color}</td>
          <td>${element.price} $</td>
          <td>${element.release_date}</td>
           <td>${element.id}</td>
           <td><i id="delete-${element.id}" class="fa-solid fa-trash text-danger"></i></td>
        </tr>`;
  });
  bodyTable.innerHTML += item;
  // Attach event listeners after the rows have been added to the DOM
  response.data.forEach((element) => {
    const click = document.querySelector(`#delete-${element.id}`);
    click.addEventListener("click", async function () {
      console.log(`delete-${element.id}`);
      await deleteProduct(element.id);
      console.log('done');
      // test(element.id); // Call the test function with the correct id
    });
  });
}

function test() {
  // modalDelete.show();
  console.log("test");
}

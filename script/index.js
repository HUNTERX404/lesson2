const BaseURL = "http://localhost:3001/";
const getProducts = async (pageSize, pageNumber) => {
  const response = await fetch(
    BaseURL + `products?_page=${pageNumber}&_per_page=${pageSize}`
  ).then((res) => res.json());
  return response;
};
const deleteProduct = async (id) => {
  const response = await fetch(BaseURL + `products/${id}`, {
    method: "DELETE",
  });
};
document.querySelector(".sidebar .menu").addEventListener("click", () => {
  
  document.querySelector(".user .user-name").classList.toggle("d-none");
  document.querySelectorAll(".nav-link .link span").forEach((item) => {
    item.classList.toggle("d-none");
  });
  document.querySelectorAll(".nav-link .link").forEach((item) => {
    item.classList.toggle("justify-content-center");
  });
});
export { getProducts, deleteProduct };

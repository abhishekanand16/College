import { useState } from "react";
import Product from "./Product";

function ProductList() {
  const [products] = useState([
    { id: 1, name: "Rice", price: 450, expiryDate: "2026-12-01" },
    { id: 2, name: "Laptop", price: 55000, expiryDate: "2028-06-15" },
    { id: 3, name: "Soap", price: 35, expiryDate: "2027-03-20" },
    { id: 4, name: "Notebook", price: 120, expiryDate: "2030-01-01" },
    { id: 5, name: "Headphones", price: 899, expiryDate: "2029-08-10" },
    { id: 6, name: "Milk", price: 60, expiryDate: "2026-10-30" },
  ]);
  const [filter, setFilter] = useState("all");

  let filteredProducts = products;
  if (filter === "under500") {
    filteredProducts = products.filter((p) => p.price < 500);
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Product List</h2>
      <button onClick={() => setFilter("all")}>All Products</button>{" "}
      <button onClick={() => setFilter("under500")}>Under ₹500</button>
      <br />
      <br />
      <Product products={filteredProducts} />
    </div>
  );
}

export default ProductList;

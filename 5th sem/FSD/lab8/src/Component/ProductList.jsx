import { useEffect, useState } from "react";
import Product from "./Product";

const PRICE_FILTERS = [100, 200, 300, 400, 500];

function ProductList() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("all");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadProducts() {
    setLoading(true);
    try {
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error("Could not load products.");
      const data = await res.json();
      setProducts(data);
      setStatus("");
    } catch {
      setStatus("Start the API server: npm run server (in another terminal).");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function handleImport(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setStatus("Importing…");
    try {
      const res = await fetch("/api/products/import", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Import failed.");
      setProducts(data.products);
      setFilter("all");
      setStatus(
        `Imported ${data.products.length} products (saved as ${data.savedAs} in data/imports/).`,
      );
    } catch (err) {
      setStatus(err.message || "Import failed.");
    }
  }

  let filteredProducts = products;
  if (filter !== "all") {
    const maxPrice = Number(filter);
    filteredProducts = products.filter((p) => p.price < maxPrice);
  }

  return (
    <div className="product-page">
      <h2>Product List</h2>
      <div className="toolbar">
        <button
          type="button"
          className={`toolbar-btn${filter === "all" ? " active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All Products
        </button>
        {PRICE_FILTERS.map((limit) => (
          <button
            key={limit}
            type="button"
            className={`toolbar-btn${filter === String(limit) ? " active" : ""}`}
            onClick={() => setFilter(String(limit))}
          >
            Under ₹{limit}
          </button>
        ))}
        <label className="toolbar-btn import-btn">
          Import Excel
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleImport}
          />
        </label>
      </div>
      <p className="hint">
        Sample file: <code>data/sample-products.xlsx</code> (Name, Price, Expiry Date)
      </p>
      {status && <p className="status">{status}</p>}
      <br />
      <br />
      {loading ? <p className="hint">Loading…</p> : <Product products={filteredProducts} />}
    </div>
  );
}

export default ProductList;

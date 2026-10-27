function Product({ products }) {
  return (
    <table border="1" cellPadding="8">
      <thead>
        <tr>
          <th>Name</th>
          <th>Price (₹)</th>
          <th>Expiry Date</th>
        </tr>
      </thead>
      <tbody>
        {products.map((p) => (
          <tr key={p.id}>
            <td>{p.name}</td>
            <td>{p.price}</td>
            <td>{p.expiryDate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Product;

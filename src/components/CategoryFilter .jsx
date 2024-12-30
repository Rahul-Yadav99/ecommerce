import React, { useState } from "react";

const products = [
  { id: 1, name: "T-shirt", category: "Clothing" },
  { id: 2, name: "Laptop", category: "Electronics" },
  { id: 3, name: "Shoes", category: "Footwear" },
  { id: 4, name: "Smartphone", category: "Electronics" },
  { id: 5, name: "Jeans", category: "Clothing" },
];

const categories = ["All", "Clothing", "Electronics", "Footwear"];

const CategoryFilter = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div>
      <h1>Product List</h1>
      {/* Category Filter */}
      <div>
        <label htmlFor="category-filter">Filter by Category: </label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Display Products */}
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryFilter;

import React from 'react';

const SearchResults = ({ productsData }) => {
  return (
    <div className="search-results">
      <h2>Search Results</h2>
      <div className="pic-ctn">
        {productsData.map((product, index) => (
          <div key={index} className="product-item">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p>Price: ₹{product.price}</p>
            <a href={product.link} target="_blank" rel="noopener noreferrer">View Product</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductPage.scss";

const ProductPage = ({ products }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <h2 className="not-found">Mahsulot topilmadi</h2>;
  }

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0; 
    const emptyStars = 5 - fullStars - halfStar; 

    return (
      <div className="stars">
        {[...Array(fullStars)].map((_, i) => (
          <span key={i} className="star full">★</span>
        ))}
        {halfStar ? <span className="star half">★</span> : null}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={i + fullStars} className="star empty">★</span>
        ))}
      </div>
    );
  };

  return (
    <div className="product-page">
      <div className="container">
        <button onClick={() => navigate(-1)} className="back-button">
          ⬅ Orqaga
        </button>

        <div className="product-card">
          <img src={product.thumbnail} alt={product.title} className="product-img" />
          <div className="product-info">
            <h1>{product.title}</h1>
            <h2 className="price">${product.price}</h2>
            <div className="rating">
              <span className="stars">{renderStars(product.rating)}</span>
              <span className="rating-score">({product.rating})</span>
            </div>
            <p className="description">{product.description}</p>
            <button>Buyurtma berish</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

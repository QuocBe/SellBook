import React from "react";
import "../../assets/style/Book/BookDetails.scss"; // CSS cho giao diện
import productImage from "../../assets/images/Saigon Traces Of The Old Days.png"; // Đường dẫn đến ảnh sản phẩm

const ProductDetail = () => {
  return (
    <div className="product-detail">
      {/* Hình ảnh sản phẩm */}
      <div className="product-image">
        <img src={productImage} alt="Product" />
      </div>

      {/* Thông tin sản phẩm */}
      <div className="product-info">
        <h2 className="product-title">Saigon Traces Of The Old Days</h2>
        <div className="rating">
          <span>3.5</span> ★★★★☆ | <span>Sold: 1000</span>
        </div>
        <div className="price">
          <span>1.000 $</span>
        </div>

        {/* Thông tin vận chuyển */}
        <div className="shipping">
          <h4>Shipping Information</h4>
          <p>
          Delivered to <span className="location">Quận 12</span> <button className="change-address">Change address</button>
          </p>
        </div>

        {/* Chọn số lượng */}
        <div className="quantity">
          <h4>slot</h4>
          <div className="quantity-selector">
            <button>-</button>
            <input type="number" min="1" defaultValue="1" />
            <button>+</button>
          </div>
        </div>

        {/* Nút hành động */}
        <div className="actions">
          <button className="add-to-cart">Add to cart</button>
          <button className="buy-now">Buy</button>
        </div>

        {/* Phần bình luận */}
        <div className="comments">
          <h4>180 comment</h4>
          <input type="text" placeholder="Viết bình luận..." />
          <div className="comment-list">
            <p>
              <strong>Jame:</strong> Very good product!
            </p>
            <p>
              <strong>John:</strong> Fast delivery.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

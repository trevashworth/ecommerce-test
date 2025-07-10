import React, { useState } from 'react'
import type { Product } from '../types/Types'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const [addedMessage, setAddedMessage] = useState('');
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart(product));
        setAddedMessage(`${product.title} has been added to your cart!`);
        setTimeout(() => setAddedMessage(''), 2000);
    }

    return (
        <Card className="h-100 shadow-lg bg-dark text-light border-secondary">
            <Card.Img
                variant="top"
                src={product.image}
                alt={product.title}
                style={{ objectFit: 'contain', height: '220px', padding: '1rem', background: "#23272b" }}
            />
            <Card.Body className="d-flex flex-column">

                {/* Title */}
                <Card.Title className="mb-2">{product.title}</Card.Title>

                {/* Category Badge */}
                <div className="mb-2">
                    <span className="badge rounded-pill bg-info text-dark">
                        {product.category}
                    </span>
                </div>

                {/* Price */}
                <div className="mb-2">
                    <span className="fw-bold fs-4 text-success">${product.price}</span>
                </div>

                {/* Rating */}
                <div className="mb-3">
                    <span>
                        {'⭐'.repeat(Math.round(product.rating.rate))}
                        <span className="ms-1 text-muted">{product.rating.rate} ({product.rating.count})</span>
                    </span>
                </div>

                {/* Description */}
                <Card.Text className="mb-3" style={{ whiteSpace: "normal", minHeight: '70px' }}>
                    {product.description}
                </Card.Text>

                {/* Add to Cart Success Message */}
                {addedMessage && (
                    <div className="alert alert-success py-1 mb-2 text-center" style={{ fontSize: '0.95rem' }}>
                        {addedMessage}
                    </div>
                )}

                {/* Button */}
                <Button
                    variant="success"
                    className="w-100 mt-auto mb-1 fw-bold"
                    onClick={handleAddToCart}
                >
                    Add to Cart
                </Button>
            </Card.Body>
        </Card>
    );
}

export default ProductCard;
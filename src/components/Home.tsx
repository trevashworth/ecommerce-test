
import { useEffect } from 'react'
import type { Product, Category } from '../types/Types'
import ProductCard from './ProductCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useProductContext } from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts, fetchCategories } from '../api/api';


const Home: React.FC = () => {
    const navigate = useNavigate();
    const { products, selectedCategory, dispatch } = useProductContext();

    const { data: productsData, isLoading, error } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
    });

    useEffect(() => {
        if (productsData)
            dispatch({ type: 'SET_PRODUCTS', payload: productsData.data });
    }, [dispatch, productsData])

    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories,
    });

    const getFilteredProducts = () => {
        if (selectedCategory) {
            return products.filter((product: Product) => product.category === selectedCategory
            );
        }
        return products;
    };

    const filteredProducts = getFilteredProducts();

    return (

        <div >
            <div className="d-flex align-items-center mb-4 ms-3" style={{ maxWidth: 400 }}>
                <select
                    className="form-select bg-dark text-light border-secondary shadow-sm"
                    style={{ maxWidth: 220 }}
                    onChange={(e) =>
                        dispatch({ type: "SET_SELECTED_CATEGORY", payload: e.target.value })
                    }
                    value={selectedCategory}
                >
                    <option value="">All Categories</option>
                    {categories?.data.map((category: Category) => (
                        <option value={category} key={category}>{category}</option>
                    ))}
                </select>
                <button
                    className="btn btn-outline-light ms-2 shadow-sm"
                    onClick={() => dispatch({ type: 'SET_SELECTED_CATEGORY', payload: '' })}
                >
                    Clear Filter
                </button>
            </div>
            {isLoading && <h1>Loading...</h1>}
            <Container className="my-4 p-4 rounded">
                <Row className="g-4 justify-content-center">
                    {filteredProducts.map((product) => (
                        <Col key={product.id} xs={12} md={4} lg={4} className="d-flex">
                            <ProductCard product={product} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    )
}

export default Home
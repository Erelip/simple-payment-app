import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductsService } from '../../services';

const Product: React.FC = () => {
  const [product, setProduct] = useState({id: 0, name: '', description: '', price: 0});
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) return;
        const productService = new ProductsService();
        const fetchedProduct = await productService.getProductById(parseInt(id));
        setProduct(fetchedProduct);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProduct();
  }, []);

  return (
    <div>
      <ul>
          <a href={`/collection/${product.id}`}>{product.name}</a>
      </ul>
    </div>
  );
};



export default Product;
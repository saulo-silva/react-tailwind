import { useState } from "react";
import PropTypes from 'prop-types';

const ProductCard = ({ product, addToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  return (
    <div className="flex flex-col overflow-hidden rounded-lg bg-white shadow-md">
      <img
        src={product.image}
        alt={product.name}
        className="h-40 w-full object-cover"
      />
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-lg font-bold">{product.name}</h3>
        <p className="flex-1 text-sm text-gray-600">{product.description}</p>
        <div className="mt-2 text-lg font-semibold text-purple-800">
          R$ {product.price.toFixed(2).replace('.', ',')}
        </div>

        <div className="mt-4">
          <div className="mb-2 flex items-center">
            <span className="mr-2">Quantidade:</span>
            <div className="flex items-center rounded border">
              <button
                onClick={decreaseQuantity}
                className="bg-gray-100 px-2 py-1 hover:bg-gray-200"
              >
                -
              </button>
              <span className="px-4 py-1">{quantity}</span>
              <button
                onClick={increaseQuantity}
                className="bg-gray-100 px-2 py-1 hover:bg-gray-200"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={() => addToCart(product, quantity)}
            className="w-full rounded bg-purple-700 py-2 text-white transition hover:bg-purple-800"
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired,
  addToCart: PropTypes.func.isRequired
};

export default ProductCard

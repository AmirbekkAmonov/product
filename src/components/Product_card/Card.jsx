import { useNavigate } from "react-router-dom";
import './Card.scss'

function Card({ product }) {
  const navigate = useNavigate();
  return (
    <div className='card' onClick={() => navigate(`/product/${product.id}`)}>
        <img src={product.thumbnail} alt={product.title} />
        <div className='title'>
          <b>{product.title}</b>
          <p>Narx: {product.price}</p>
          <p>Reyting: {product.rating}</p>
        </div>
    </div>
  )
}

export default Card
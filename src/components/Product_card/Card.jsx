import './Card.scss'

function Card({ product }) {
  return (
    <div className='card'>
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
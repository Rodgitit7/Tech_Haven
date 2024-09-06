'use-client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Span } from 'slate'

import classes from './index.module.scss'
const CartItem = ({ product, title, metaImage, qty, addItemToCart }) => {
  const [quantity, setQuantity] = useState(qty)

  const decrementQty = () => {}
  const incrementQty = () => {}
  const enterQty = () => {}
  return (
    <li className={classes.item} key={title}>
      <Link href={`/products/${product.slug}`} className={classes.mediaWrapper}>
        {!metaImage && <span>No Image</span>}
        {metaImage && typeof metaImage !== 'string'}
      </Link>
    </li>
  )
}

export default CartItem

'use-client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Span } from 'slate'

import { Media } from '../../../_components/Media'
import { Price } from '../../../_components/Price'
import { RemoveFromCartButton } from '../../../_components/RemoveFromCartButton'

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
        {metaImage && typeof metaImage !== 'string' && (
          <Media className={classes.media} imgClassName={classes.image} resource={metaImage} fill />
        )}
      </Link>

      <div className={classes.itemDetails}>
        <div className={classes.totleWrapper}>
          <h6>{title}</h6>
          <Price product={product} button={false} />
        </div>

        <div className={classes.quantity}>
          <div className={classes.quantityBtn} onClick={decrementQty}>
            <Image
              src="assets/icons/minus.svg"
              alt="minus"
              width={24}
              height={24}
              className={classes.quantityBtn}
            />
          </div>
          <input
            type="text"
            className={classes.quantityInput}
            value={quantity}
            onChange={enterQty}
          />
          <div className={classes.quantityBtn} onClick={incrementQty}>
            <Image
              src="assets/icons/plus.svg"
              alt="plus"
              width={24}
              height={24}
              className={classes.quantityBtn}
            />
          </div>
        </div>
      </div>
      <div className={classes.subTotalWrapper}>
        <Price product={product} button={false} quantity={quantity} />
        <RemoveFromCartButton product={product} />
      </div>
    </li>
  )
}

export default CartItem

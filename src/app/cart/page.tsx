import { getCart } from '@/lib/cart';
import React from 'react';
import CartEntry from './CartEntry';
import { setProductQuantity } from './actions';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/format';

export const metadata = {
    title: "Your Cart - ECommerce"
}

export default async function CartPage() {
    const cart = await getCart();
    return (
        <div>
            <h1 className='mb-6 text-3xl font-bold'>Shopping Cart</h1>
            {cart?.cartItems.map(cartItem => (
                <CartEntry cartItem={cartItem} key={cartItem.id} setProductQuantity={setProductQuantity} />
            ))}
            {!cart?.cartItems.length && <p>Your cart is empty.</p>}
            <div className='flex flex-col items-end sm:items-center'>
                <div className='mb-3 font-bold'>
                Total: {formatPrice(cart?.subtotal || 0)}
                </div>
                <Button>
                    Checkout
                </Button>
            </div>
        </div>
    );
}

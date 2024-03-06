'use client';

import { Select } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { CartItemWithProduct } from '@/lib/cart';
import Image from 'next/image';
import Link from 'next/link';
import React, { useTransition } from 'react';

interface CartEntryProps {
    cartItem: CartItemWithProduct;
    setProductQuantity: (
        productid: string,
        quantity: number
    ) => Promise<void>;
}

export default function CartEntry({
    cartItem: { product, quantity },
    setProductQuantity,
}: CartEntryProps) {
    const [isPending, startTransition] = useTransition();

    const quantityOptions: JSX.Element[] = [];
    for (let i = 1; i <= 99; i++) {
        quantityOptions.push(
            <option value={i} key={i}>
                {i}
            </option>
        );
    }
    return (
        <div>
            <div className='flex flex-wrap items-center gap-3'>
                <Image
                    src={product.name}
                    alt={product.name}
                    width={200}
                    height={200}
                    className='rounded-lg'
                />
                <div>
                    <Link
                        className='font-bold'
                        href={'/products/' + product.id}
                    >
                        {product.name}
                    </Link>
                    <div>Price : {product.price}</div>
                    <div className='my-1 flex items-center gap-2'>
                        Quantity:
                        <select
                            defaultValue={quantity}
                            onChange={(e) => {
                                const newQuantity = parseInt(
                                    e.currentTarget.value
                                );
                                startTransition(async () => {
                                    await setProductQuantity(
                                        product.id,
                                        newQuantity
                                    );
                                });
                            }}
                        >
                            <option value={0}>0 (Remove)</option>
                            {quantityOptions}
                        </select>
                    </div>
                    <div className='flex items-center gap-3'>
                        Total : {product.price * quantity}
                        {isPending && <Skeleton />}
                    </div>
                </div>
            </div>

            <div className='divider' />
        </div>
    );
}

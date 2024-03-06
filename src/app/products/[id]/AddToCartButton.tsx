"use client"

import { Button } from '@/components/ui/button'
import React, { useState, useTransition } from 'react'
import { incrementProductQuantity } from './action';
import { Skeleton } from "@/components/ui/skeleton"


interface AddToCardButtonProps{
    productId: string,
    incrementProductQuantity: (productId: string) => Promise<void>
}

export default function AddToCartButton({productId}: AddToCardButtonProps) {
    const [isPending, startTransition] = useTransition();
    const [success, setSuccess] = useState(false);
  return (
    <div className='flex items-center gap-2'>
        <Button
        onClick={() => {
            setSuccess(false);
            startTransition(async () => {
                await incrementProductQuantity(productId);
                setSuccess(true);
            })
        }}>
            Add To Cart
        </Button>
        {isPending && <Skeleton className="w-[100px] h-[20px] rounded-full" />
 }
 {!isPending && success && <span className='text-green-600'>Added To Cart.</span>}
    </div>
  )
}

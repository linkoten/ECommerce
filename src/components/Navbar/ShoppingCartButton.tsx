import { ShoppingCart } from '@/lib/cart';
import React from 'react';
import { Label } from '../ui/label';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '../ui/button';
import Link from 'next/link';
import { formatPrice } from '@/lib/format';
import { Badge } from '../ui/badge';

interface ShoppingCartButtonProps {
    cart: ShoppingCart | null;
}

export default function ShoppingCartButton({
    cart,
}: ShoppingCartButtonProps) {
    return (
        <Sheet>
            <Label tabIndex={0}>
                <SheetTrigger className='flex h-full w-full items-center justify-end'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                        />
                    </svg>
                    <span className=' text-xs'>
                        {cart?.size || 0}
                    </span>
                </SheetTrigger>
            </Label>
            <SheetContent>
                <SheetHeader tabIndex={0}>
                    <SheetTitle>Items</SheetTitle>
                    <SheetDescription>
                        {' '}
                        <Badge>
                            Subtotal :{' '}
                            {formatPrice(cart?.subtotal || 0)}
                        </Badge>{' '}
                    </SheetDescription>
                </SheetHeader>
                <SheetFooter>
                    <Button asChild>
                        <Link href='/cart'>Checkout</Link>
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}

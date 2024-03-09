import { prisma } from '@/lib/prisma';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React, { cache } from 'react';
import AddToCartButton from './AddToCartButton';
import { incrementProductQuantity } from './action';
import PriceTag from '@/components/PriceTag';
import { Badge } from '@/components/ui/badge';

interface ProductPageProps {
    params: {
        id: string;
    };
}

const getProduct = cache(async (id: string) => {
    const product = await prisma.product.findUnique({
        where: { id },
    });
    if (!product) notFound();
    return product;
});

export async function generateMetadata({
    params: { id },
}: ProductPageProps): Promise<Metadata> {
    const product = await getProduct(id);

    return {
        title: product.name + ' - Ecommerce',
        description: product.description,
    };
}

export default async function ProductPage({
    params: { id },
}: ProductPageProps) {
    const product = await getProduct(id);

    return (
        <div className='flex flex-col lg:flex-row gap-4 lg:items-center'>
            {product.photos && (
                <img
                    src={product.photos}
                    alt={product.name}
                    width={500}
                    height={500}
                    className='rounded-lg'
                />
            )}
            <div>
                <h1 className='text-5xl font-bold'>{product.name}</h1>
                <div className='space-x-8'>
                <PriceTag price={product.price}  />  
                <Badge>Stock : {product.quantity}</Badge>    
                </div>         
                 <p className='py-6'>{product.description}</p>

                <AddToCartButton
                    productId={product.id}
                    incrementProductQuantity={
                        incrementProductQuantity
                    }
                />
            </div>
        </div>
    );
}

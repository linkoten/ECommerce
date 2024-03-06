import { prisma } from '@/lib/prisma';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React, { cache } from 'react';
import AddToCartButton from './AddToCartButton';
import { incrementProductQuantity } from './action';

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
        title: product.name + " - Ecommerce",
        description: product.description
    }
}

export default async function ProductPage({
    params: { id },
}: ProductPageProps) {
    const product = await getProduct(id);

    return (
        <div className='fle flex-col lg:flex-row gap-4 lg:items-center'>
            <Image
                src={product.name}
                alt={product.name}
                width={500}
                height={500}
                className='rounded-lg'
                priority
            />
            <div>
                <h1 className='text-5xl font-bold'>{product.name}</h1>
                <p className='mt-4'>{product.price}</p>
                <p className='py-6'>{product.description}</p>
                <AddToCartButton productId={product.id} incrementProductQuantity={incrementProductQuantity} />
            </div>
        </div>
    );
}

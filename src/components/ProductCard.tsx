import React from 'react';
import { Product } from '@prisma/client';
import Link from 'next/link';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import logo from '/public/next.svg';
import PriceTag from './PriceTag';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const isNew =
        Date.now() - new Date(product.createdAt).getTime() <
        1000 * 60 * 60 * 24 * 7;

    return (
        <Link href={'/products/' + product.id}>
            <Card className=' bg-slate-100 hover:shadow-xl transition-shadow '>
                <CardHeader>
                    <CardTitle className='  text-xl'>
                        {product.name}
                        {isNew && (
                            <div className=' text-purple-700 text-end text-xs'>
                                New
                            </div>
                        )}
                    </CardTitle>
                </CardHeader>
                <CardContent className='flex justify-center'>
                    {product.photos && (
                        <img
                            key={product.id}
                            alt={product.name}
                            src={product.photos}
                            width={300}
                            className='h-48 object-cover'
                        />
                    )}
                </CardContent>
                <CardDescription className='font-bold text-xs'>
                    {product.description}
                </CardDescription>
                <CardFooter className='flex justify-between pt-4'>
                <PriceTag price={product.price} />

                    <div className='text-end'>
                        {' '}
                        {product.quantity}
                    </div>
                </CardFooter>
            </Card>
        </Link>
    );
}

/*

{product.photos.map((product) => (
        <Image
          key={product.url} // Use a unique key for each image
          src="http://www.w3.org/2000/svg"
          alt={product.url}
          fill
        />
      ))}

      */

//test

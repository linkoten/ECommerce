
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

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const isNew =
        Date.now() - new Date(product.createdAt).getTime() <
        1000 * 60 * 60 * 24 * 7;

    return (
            <Link href={'/products/' + product.id}>
                <Card className=' bg-blue-500'>
                    <CardHeader>
                        <CardTitle className='border-b-4 border-b-lime-400 text-xl'>
                            {product.name}
                        </CardTitle>
                        {isNew && <div className=' text-purple-700 text-start'>New</div>}

                        <CardDescription className='font-bold'>
                            {product.description}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='flex justify-center'>
                    
        <Image
          key={product.url} // Use a unique key for each image
          alt={product.url}
          src={logo}
          width={200}
          height={200}
        />
                    </CardContent>
                    <CardFooter className='flex space-x-2 justify-center text-xs'>
                        <div> {product.price}</div>
                        <div> {product.quantity}</div>
                        <div> {product.sizes}</div>
                        <div> {product.colors}</div>
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

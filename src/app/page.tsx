"use server"

import ProductCard from '@/components/ProductCard';
import { LoginButton } from '@/components/auth/LoginButtons';

import { User } from '@/components/auth/User';
import { getAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function Home() {
    const products = await prisma.product.findMany({
        orderBy: { id: 'desc' },
    });

    const session = await getAuthSession();

    if (session) {
        return <User />;
    }
    return (
        <>
            <div
                className='my-4 px-8
     grid grid-cols-1 md:grid-cols2 xl:grid-cols-3 gap-8'
            >
                {products.slice(0).map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            <LoginButton />
        </>
    );
}

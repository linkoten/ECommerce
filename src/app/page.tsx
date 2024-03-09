'use server';
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

    
    return (
        <div className=' bg-slate-300'>
            <div
                className='my-4 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-8 p-8'
            >
                {products.slice(0).map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}

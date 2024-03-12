'use server';
import PaginationBar from '@/components/PaginationBar';
import ProductCard from '@/components/ProductCard';
import { LoginButton } from '@/components/auth/LoginButtons';

import { User } from '@/components/auth/User';
import { getAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

interface HomeProps {
    searchParams: { page: string };
  }

export default async function Home({
    searchParams: { page = "1" },
}: HomeProps) {
  const currentPage = parseInt(page);

  const pageSize = 6;
  const heroItemCount = 1;

  const totalItemCount = await prisma.product.count();

  const totalPages = Math.ceil((totalItemCount - heroItemCount) / pageSize);




    const products = await prisma.product.findMany({
        orderBy: { id: 'desc' },
        skip:
      (currentPage - 1) * pageSize + (currentPage === 1 ? 0 : heroItemCount),
    take: pageSize + (currentPage === 1 ? heroItemCount : 0),
  });
    

    const session = await getAuthSession();

    
    return (
        <div className=' bg-slate-300'>
            <div
                className='my-4 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-8 p-8'
            >
                {(currentPage === 1 ? products.slice(1) : products).map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
            </div>
            {totalPages > 1 && (
        <PaginationBar currentPage={currentPage} totalPages={totalPages} />
      )}
        </div>
    );
}

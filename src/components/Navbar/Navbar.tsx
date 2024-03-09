import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Input } from '../ui/input';
import logo from '../../../public/next.svg'
import { redirect } from 'next/navigation';
import { getCart } from '@/lib/cart';
import ShoppingCartButton from './ShoppingCartButton';
import { getServerSession } from 'next-auth';
import { authConfig } from '../../../pages/api/auth/[...nextauth]';
import UserMenuButton from './UserMenuButton';

async function searchProducts(formData: FormData) {
    "use server";

    const searchQuery = formData.get("searchQuery")?.toString();

    if (searchQuery) {
        redirect("/search?query=" + searchQuery);
    }
}

export default async function Navbar() {
    const session = await getServerSession(authConfig);
    const cart = await getCart()
    return (
        <div className='bg-slate-100 h-12 px-8  items-center'>
            <div className='flex flex-col sm:flex-row sm:justify-around gap-2 h-full'>
                <div className='flex-1'>
                    <Link href='/' className='flex items-center h-full'>
                        <Image
                            src={logo}
                            height={40}
                            width={40}
                            alt='ECommerce logo'
                        />
                        <div>E-commerce</div>
                    </Link>
                </div>
                <div className=' relative flex  items-center  justify-end  gap-2 '>
                    <form action={searchProducts}>
                        <div className='form-control'>
                            <Input
                            name='searchQuery'
                            placeholder='Search'
                            className='w-full min-w-[100px]'
                            >
                            </Input>
                        </div>
                    </form>
                    <ShoppingCartButton cart={cart}  />
                    <UserMenuButton session={session} />

                </div>
            </div>
        </div>
    );
}

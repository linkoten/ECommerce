import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getProducts() {
    try {
        const products = await prisma.product.findMany();
        return { products };
    } catch (error) {
        return { error };
    }
}

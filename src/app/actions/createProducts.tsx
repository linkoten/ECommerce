"use server";

import { prisma } from "@/lib/prisma";
import { Color, Size } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// 1 Const Schema avec Zod

const productSchema = z.object({
    name: z.string().min(2, {
        message: 'Name must be at least 2 characters.',
    }),
    url: z.string().min(2, {
        message: 'Poste must be at least 2 characters',
    }),
    description: z.string().min(3, {
        message: 'Team must be at least 3 characters',
    }),
   
    price: z.coerce.number(),
    quantity: z.coerce.number(),
  sizes: z.nativeEnum(Size), // Ajoutez cette ligne pour valider l'enum Size
   colors: z.nativeEnum(Color),
   photos: z.object({
    height: z.number().default(200),
    width: z.number().default(100),
    url: z.string().default("D:\Prog\E-Commerce Shop\my-app\public\next.svg"),
  }),

    
  });
  
export  async function createProducts(formData: FormData) {


  const validatedFields = productSchema.safeParse({
    


    name: formData.get("name") ,
       url: formData.get("url") ,
    description: formData.get("description") ,
        price: formData.get("price") ,
        quantity: formData.get("quantity"),
       sizes: formData.get("size"),
       colors: formData.get("color"),
       photos: formData.get("photos")

  
  })


  if (!validatedFields.success) {
    console.log(validatedFields.error);

    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }
  const {  name, url, description, price, quantity, colors, sizes, photos } = validatedFields.data;


  await prisma.product.create({
    data: {
      name: name,
      url: url,
      description: description,
      price: price,
      quantity: quantity,
     colors: [colors],
      sizes: [sizes],
      photos: photos,


    },
  });

  revalidatePath("/createProduct");
}



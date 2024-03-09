import React, { FormEventHandler, useState } from 'react';
import {
    createProducts,
} from '../../app/actions/createProducts';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Color, Size } from '@prisma/client';

const createProduct = () => {
    
    
    return (
        <>
            <form action={createProducts} className='w-full m-auto '>
                <div className='grid grid-cols-2 grid-rows-6 gap-8'>
                    <div>
                        <Label>Nom</Label>
                        <Input
                            name='name'
                            type='text'
                            placeholder='Add name'
                        />
                    </div>

                    <div>
                        <Label>URL</Label>
                        <Input
                            name='url'
                            type='string'
                            placeholder='Add url'
                        />
                    </div>
                    <div>
                        <Label>Description</Label>
                        <Input
                            name='description'
                            type='string'
                            placeholder='Add description'
                        />
                    </div>
                    <div>
                        <Label>Prix</Label>
                        <Input
                            name='price'
                            type='number'
                            placeholder='Add Price'
                        />
                    </div>

                    <div>
                        <Label>Quantity</Label>

                        <Input
                            name='quantity'
                            type='number'
                            placeholder='Add saves'
                        />
                    </div>

                    <div>
                        <Label>Colors</Label>
                        <Select name='color'>
                            <SelectTrigger className='w-[180px]'>
                                <SelectValue placeholder='couleur' />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='Red'>
                                    Rouge
                                </SelectItem>
                                <SelectItem value='Green'>
                                    Vert
                                </SelectItem>
                                <SelectItem value='Blue'>
                                    Bleu
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label>sizes</Label>
                        <Select name='size'>
                            <SelectTrigger className='w-[180px]'>
                                <SelectValue placeholder='Taille' />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='Small'>
                                    S
                                </SelectItem>
                                <SelectItem value='Medium'>
                                    M
                                </SelectItem>
                                <SelectItem value='Large'>
                                    L
                                </SelectItem>
                                <SelectItem value='XLarge'>
                                    XL
                                </SelectItem>
                            </SelectContent>
                        </Select>
                       
                    </div>
                    <div className='p-4'>
                <Label>Photos </Label>
                <Input type='file' name='photos'>
                </Input>
            </div>

                    <Button
                        type='submit'
                        onClick={() =>
                            toast(
                                'Lejoueur a été ajouté à la base de donnée',
                                {
                                    action: {
                                        label: 'Fermer',
                                        onClick: () =>
                                            console.log('Undo'),
                                    },
                                }
                            )
                        }
                    >
                        Submit
                    </Button>
                </div>
            </form>

            
        </>
    );
};

export default createProduct;

/*

<div className='p-4'>
                <h1>Upload file ...</h1>

                <form onSubmit={handleSubmit}>
                    <Input type='file' name='photos' />
                    <Button type='submit'>Upload</Button>
                </form>
            </div>

*/

/*
const [imageUrl, setImageUrl] = useState<string | null>(null);

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (
        e
    ) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const file = formData.get('photos') as File;

        const url = await uploadFile(formData);

        setImageUrl(url);
    };

*/
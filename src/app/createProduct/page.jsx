'use client'
import CreateProduct from "../../components/Create/createProduct";




const createProducte = async() => {

   
    return (
        <div className='m-8'>
            <h2 className='text-center w-full text-2xl font-bold'>
                {' '}
                Create a Product{' '}
            </h2>

            <CreateProduct />
        </div>
    );
}

export default createProducte

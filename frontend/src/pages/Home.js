import React from 'react';
import {LiaBicycleSolid} from 'react-icons/lia'
import HomeCard from './HomeCard';
import {useSelector} from 'react-redux';

function Home(props) {
    const productData=useSelector((state)=>state.product.productList)
    console.log(productData)

    const homeproductList=productData.slice(0,4)
    return (
        <div className='p-2 md:p-4'>
        <div className='md:flex gap-4 py-2'>
        <div className='md:w-1/2'>
        <div className='flex gap-3 bg-slate-400 w-36 px-2 items-center rounded-full'>
        <p className='text-sm font-medium text-slate-900'>Bike Delivery</p>
        <LiaBicycleSolid className='text-2xl text-green-800'/>
        </div>
        <h2 className='text-4xl font-bold md:text-7xl py-3'>The Fasted Delivery In
        <span className='text-red-500 text-7xl'> Your Home</span></h2>
        <p className='py-3 text-base'>Lorem Ipsum is simply dummy text of the printing and typesetting 
        industry. Lorem Ipsum has been the industry's standard dummy text ever since the 
        1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen 
        book. It has survived not only five centuries, but also the leap into electronic typesetting, 
        remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset 
        sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like 
        Aldus PageMaker including versions of Lorem Ipsum.</p>
        <button className='font-bold bg-red-600 text-slate-200 px-4 py-2 rounded-md'>Order Now</button>
        </div>

        <div className='md:w-1/2 flex flex-wrap gap-5 p-4 justify-center'>
        {
            homeproductList[0] && homeproductList.map((e)=>{
                return(
                    <HomeCard
                    key={e._id}
                    image={e.image}
                    name={e.name}
                    price={e.price}
                    category={e.category}/>
                    )
            })
        }
        
       
        </div>
        </div>
            
        </div>
    );
}

export default Home;
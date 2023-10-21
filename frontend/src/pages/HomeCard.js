import React from 'react';

function HomeCard({name,image,category,price}) {
    return (
        <div className='bg-white shadow-md rounded p-2'>
           <div className='h-36 w-40'>
           <img src={image} className="h-full w-full" alt=""/>
           </div>
           <h3 className='font-semibold text-slate-600 text-center capitalize text-lg'>{name}</h3>
           <p className='text-center text-slate-500 font-medium'>{category}</p>
           <p className='text-center font-bold '><span className='text-red-800'>&#8377;</span><span>{price}</span></p>
        </div>
    );
}

export default HomeCard;
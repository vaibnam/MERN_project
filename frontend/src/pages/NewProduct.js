import React,{useState} from 'react';
import {BsCloudUploadFill,BsCloudUpload} from 'react-icons/bs'
import { ImageBase64 } from '../utility/Imagebase64';
import toast from 'react-hot-toast';


function NewProduct(props) {
const [data,setData]=useState({
    name:"",
    category:"",
    image:"",
    price:"",
    description:""

})

const handleonChange=(e)=>{
    const {name,value}=e.target

    setData((preve)=>{
        return{
            ...preve,
            [name]:value
        }
    })

}

    const uploadImage=async (e)=>{
        let data=await ImageBase64(e.target.files[0])
        //console.log(data)

        setData((preve)=>{
            return{
               ...preve,
               image:data
            }
           })
   

    }

    const handleSubmit=async(e)=>{
        e.preventDefault()
        const {name,image,category,price}=data;

        if(name && image && category && price)
        {
            const fetchData=await fetch(`${process.env.REACT_APP_SERVICE_DOMIN}uploaddata`,{
                method:'POST',
                headers:{
                    'content-Type':'application/json'
                },
                body:JSON.stringify(data)
            })
            const fetchValue=await fetchData.json()
            toast(fetchValue.message)
           // console.log(fetchValue)

         setData(()=>{
            return{
            name:"",
            category:"",
            image:"",
            price:"",
            description:""
            }
         })
         

         }
    
        else{
            toast("Enter Required Fields")
        }
        
        
    }
    return (
        <div className='p-4' >
        <form className='m-auto w-full max-w-md p-4 shadow flex flex-col p-3 bg-white ' onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input type={'text'} name='name' className='bg-slate-200 p-1 my-2' onChange={handleonChange} value={data.name}/>

        <label htmlFor='category'>Category</label>

        <select className='bg-slate-200 p-1 my-2' id='category' name='category' onChange={handleonChange} value={data.category}>
        <option value={'other'}>select Type</option>
        <option value={'fruits'}>Fruits</option>
        <option value={'vegetable'}>Vegetable</option>
        <option value={'icecream'}>IceCream</option>
        <option value={'dosa'}>Dosa</option>
        <option value={'pizza'}>Pizza</option>
        </select>

        <label htmlFor='image'>Image
        <div  className='h-40 w-full bg-slate-200  rounded flex items-center justify-center cursor-pointer'>
        {
            data.image? <img src={data.image} className="h-full" alt=''/>: <span className='text-5xl'>        
            <BsCloudUpload/>
    
            </span>
        }
        
       
       
        <input type={'file'} onChange={uploadImage} accept="image/*" id='image' className='hidden'/>

        </div>
        </label>

        <label htmlFor='price' className='my-1'>Price</label>
        <input type='text' className='bg-slate-200 p-1 my-1' id='price' name='price' onChange={handleonChange} value={data.price}/>

        <label htmlFor='description'>Description</label>
        <textarea rows={3}  className='bg-slate-200 p-1 my-1 resize-none' name='description' onChange={handleonChange} value={data.description}></textarea>

        <button className='bg-red-500 hover:bg-red-700 text-white text-lg  my-2 font-bold drop-shadow'>Save</button>

        </form>
            
        </div>
    );
}

export default NewProduct;
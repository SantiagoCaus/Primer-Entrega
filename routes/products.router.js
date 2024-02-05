import { Router } from "express";

import { productManager } from "../index.js";

const productsRouter = Router()

//http:/localhost:8080/api/products
//Traer todos los productos que tengamos en el archivo products.json y si recibimos un limite trar los productos hasta ese limite

productsRouter.get('/', async (req, res)=>{
    try{
        const {limit} = req.query;
        const products = await productManager.getProducts()
        if(limit){
            const limitedProducts = products.slice(0,limit)
            return res.json(limitedProducts)
        }
        return res.json(products)
        

    }catch(error){
        //if something is wrong
        console.log(error)
        res.send('Error al recibir los productos')
    }
})

productsRouter.get('/:pid', async (req, res) =>{
    try{
        const{pid} = req.params;
        const products = await productManager.getProductById(pid)
        res.json(products)

        

    }catch (error) {
        console.log(error)
        res.send(`Error al recibir el producto con Id ${pid}`)
    }
})

//http:/localhost:8080/products/
productsRouter.post('/', async (req, res)=>{
    try{
        const {title,description, price, thumbnail, code , stock, status = true , category} =  req.body;

        const response = await productManager.addProduct({title,description, price, thumbnail, code , stock, status , category})
        res.json(response)
    }catch(error){
        console.log(error)
        res.send(`Error al intentar agregar`)

    }
})

 //http:/localhost:8080/api/products
productsRouter.put('/:pid' , async (req, res ) =>{
    const {pid} = req.params;
    try{
        const {title,description, price, thumbnail, code , stock, status = true , category} =  req.body;
        const response = await productManager.updateProduct(pid, {title,description, price, thumbnail, code , stock, status , category} )
        res.json(response)
    
    }catch(error){
        console.log(error)
        res.send(`Error al recibir el producto con Id ${pid}`)

    }
})

productsRouter.delete('/:pid', async (req,res)=>{
    const {pid} = req.params;
    try{
        await productManager.deleteProduct(pid)
        res.send('Poducto eliminado exitosamente')

    }catch (error){
        res.send(`Error al intentar eliminar el producto con Id ${pid}`)

    }
})

export {productsRouter}
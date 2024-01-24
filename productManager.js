import {promises as fs} from 'fs'

// Uuid para id aleatorio

import {v4 as uuidv4 } from 'uuid'

export class ProductManager {

    constructor(){
        this.path = 'products.json';
        this.products = []
    }


// Agregar producto

    addProduct = async ({title,description, price, thumbnail, code , stock, status , category}) => {
        const id = uuidv4()

        // Agregamos el Id PARA TODO lo que recibimos por el parametro

        let  newProduct = {id , title, description, price, thumbnail, code , stock, status , category }
this.products = await this.getProducts()
        this.products.push(newProduct)

        // Await para guardar producto en el archivo

        await fs.writeFile(this.path, JSON.stringify(this.products))

        return newProduct;

    }

    //Obtener producto 

    getProducts = async () => {
        const response = await fs.readFile(this.path, ' utf-8')
        const responseJson = JSON.parse(response)

        return responseJson;

    }

    getProductById = async (id)=> {
        const response = this.getProducts()

        const product = response.find(product=> product.id == id)
        if(product){
            return product
        } else {
            console.log('Producto no encontrado');
        }
    }

    
    // ACTUALIZAR PRODUCTO


// RECIBE EL id del producto que queremos modificar 

    updateProduct = async (id, {...data}) =>{
        const response = await this.getProducts()
const  index = response.findIndex(product => product.id == id) 

if(index != -1 ){
response[index] = {id, ...data}
await fs.writeFile(this.path, JSON.stringify(response))
return response[index]
}else{
    console.log('Product not found');
}
    }

    // Eliminar productos

    deleteProduct = async (id)=> {
        const products = await this.getProducts()
        const  index = response.findIndex(product => product.id == id) 

        if( index != -1){
            products.splice(index, 1)
            await fs.writeFile(this.path, JSON.stringify(products))
        }else{
            console.log('Product not found');
        }
    }
}
import bodyParser from "body-parser";
import express from "express";
import { v4 as uuidv4 } from "uuid";
import { productSchema } from "./ProductRequest";


const app = express();
app.use(bodyParser.json());

const products: Product[] = [];

//buscar todos os produtos
app.get('/products', (request, response)=> {
    const allProducts = products;

    if (allProducts.length === 0) {
        return response.status(404).send('Nenhum produto encontrado!')
    }
    return response.status(200).json(allProducts);
})

//cadastrar novos produtos
app.post('/products', (request, response) => {

    const {error} = productSchema.validate(request.body);

    if (error) {
        return response.status(400).json({error: error.details[0].message});
    }

    const {
        productName,
        productDescription,
        productCategory,
        productCost,
        productTags,
        productRelated,
    } = request.body;

    // Registrar produtos
    const newProduct: Product = {
        id: uuidv4(),
        productName,
        productDescription,
        productCategory,
        productCost,
        productTags: productTags || [],
        productRelated: productRelated || []
    };
    //insere o produto no array
    products.push(newProduct);
    //retonar status code de sucesso
    return response.status(201).json(newProduct);
});

//Pesquisa de produtos por ID
app.get('/products/:id', (request, response) => {
    
    const {id} = request.params;
    const product = products.find((p:any) => p.id === id);

    if (!product) {
        return response.status(404).json({message: 'Produto não encontrado!'});
    }

    return response.json(product);
});

//atualização de um produto
app.put('/products/:id', (request ,response) => {

    const {id} = request.params;

    const {error} = productSchema.validate(request.body);

    if (error) {
        return response.status(400).json({error: error.details[0].message});
    }

    const {
        productName,
        productDescription,
        productCategory,
        productCost,
        productTags,
        productRelated,
    } = request.body;

    const product = products.find((p) => p.id === id);

    if (!product) {
        return response.status(404).json({message: 'Produto não encontrado!'});
    }

    product.productName = productName;
    product.productDescription = productDescription;
    product.productCategory = productCategory;
    product.productCost = productCost;
    product.productTags = productTags || [];
    product.productRelated = productRelated || [];

    return response.json(product);
});

app.listen(8080, ()=>{
    console.log("SERVER RUN:8080")
})


import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import LinkInClass from '../components/LinkInClass'
import { SERVER_HOST, ACCESS_LEVEL_ADMIN } from '../config/global_constants'


import React, { Component } from 'react'

export default class ProductTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sortBy: 'name', // default sort is by name
      sortDirection: 'asc', // default sort direction is ascending
      products: [],
      products2: [],
      name: "",
      description: "",
      category: "",
      price: "",
      stock: "",
      name2: "",
      description2: "",
      category2: "",
      price2: "",
      stock2: "",
      selectedFile2: null,
      imageName: "",
      imageName2: "",
      selectedFile: null,
      isProductAdded: false,
      wasSubmittedAtLeastOnce: false,
      categoryy: localStorage.category
      
    }
  }

  

  componentDidMount() {
    
    axios.get(`${SERVER_HOST}/products`)
        .then(res => {
            if (res.data) {
                if (res.data.errorMessage) {
                    console.log(res.data.errorMessage)
                } else {
                    console.log("Records read")
                    const filteredProducts = res.data.filter(product => product.category === localStorage.category);
                    this.setState({ products: filteredProducts });
                }
            } else {
                console.log("Record not found")
            }
        })
}

  

  sortBy = (sortKey) => {
    // If the user clicks on the currently-sorted column, reverse the sort direction
    if (this.state.sortBy === sortKey) {
      this.setState({
        sortDirection: this.state.sortDirection === 'asc' ? 'desc' : 'asc'
      })
    }
    // Otherwise, sort by the clicked column in ascending order
    else {
      this.setState({
        sortBy: sortKey,
        sortDirection: 'asc'
      })
    }
  }

  deleteProduct = (product) => {
    
    axios.delete(`${SERVER_HOST}/products/${product._id}`)
          
        }

  editProduct = (product) => {
    axios.get(`${SERVER_HOST}/products/${product._id}`)
        .then(res => 
        {
            if(res.data)
            {
                if (res.data.errorMessage)
                {
                    console.log(res.data.errorMessage)    
                }
                else
                {             
                    this.name2 = product.name
                    this.description2 = product.description
                    this.price2 = product.price
                    this.imageName2 = product.imageName
                    this.category2 = product.category
                    this.stock2 = product.stock
                    
                }   
            }
            else
            {
                console.log("Record not found")
            }
            
        })
        

  }

  addToCart = (product) => {
    
  axios.get(`${SERVER_HOST}/products/${product._id}`)
        .then(res => 
        {
            if(res.data)
            {
                if (res.data.errorMessage)
                {
                    console.log(res.data.errorMessage)    
                }
                else
                {             
                    this.name = product.name
                    this.description = product.description
                    this.price = product.price
                    
                    this.category = product.category
                    this.stock = product.stock
                    this.imageName = product.imageName
                }   
            }
            else
            {
                console.log("Record not found")
            }
            
        })
        if(product.stock > 0){
          axios.patch(`${SERVER_HOST}/products/${product._id}`, { stock: product.stock - 1 });
        
        axios.post(`${SERVER_HOST}/basket/add/${product.name}/${product.description}/${product.category}/${product.price}/${product.imageName}`)
      .then(res => {
        this.setState({isProductAdded: true})
        
      })
      .catch(err => {
        this.setState({wasSubmittedAtLeastOnce: true})
      })
    }
    else
    {
      alert("Out of stock")
    }
      
  }
      

  

  render() {

    axios.get(`${SERVER_HOST}/products`)
        .then(res => {
            if (res.data) {
                if (res.data.errorMessage) {
                    console.log(res.data.errorMessage)
                } else {
                    console.log("Records read")
                    const filteredProducts = res.data.filter(product => product.category === localStorage.category);
                    this.setState({ products: filteredProducts });
                }
            } else {
                console.log("Record not found")
            }
        })
    let products = this.state.products

    let images = []
      const imagesContext = require.context('../images/', true, /\.png|jpg|jpeg|gif$/);
imagesContext.keys().forEach(image => {
  images[image.replace('./', '')] = imagesContext(image);
});

    

    let addProduct = null
    
    products.sort((a, b) => {
      if (a[this.state.sortBy] < b[this.state.sortBy]) {
        return this.state.sortDirection === 'asc' ? -1 : 1
      }
      if (a[this.state.sortBy] > b[this.state.sortBy]) {
        return this.state.sortDirection === 'asc' ? 1 : -1
      }
      return 0
    })

    

    if(localStorage.accessLevel == ACCESS_LEVEL_ADMIN)
    {
      addProduct = <Link to="/CreateProduct">
      <button className = "loginBtn">Add New Product</button>
    </Link>

      
  
    return (
      <>
        <table className="product-table">
          <thead>
            <tr>
              <th>Image</th>
              <th onClick={() => this.sortBy('name')}>Name</th>
              <th onClick={() => this.sortBy('price')}>Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td>
                <img src={images[product.imageName]} width="150" height="100" alt={product.imageName}/>
                </td>
                <td>
                  <div name="name" >{product.name}</div>
                  <div>{product.description}</div>
                </td>
                <td>
                  <div>{product.price}zł</div> 
                  <div>
                  <Link to={{
    pathname: '/CreateProduct',
    state: { product: product }
}}>
    <button onClick={() => this.editProduct(product)}>Edit</button>
</Link>
                  <button onClick={() => this.deleteProduct(product)}>Delete</button>
                  </div>
                  
                </td>
              </tr>
            ))}
          </tbody>
          </table>
          <div className='addProductBtn'>
          <div className = "add-product">
          {addProduct}
          </div>
          </div>
      
    </>
  )
            }
            else{
              return (
                <>
                  <table className="product-table">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th onClick={() => this.sortBy('name')}>Name</th>
                        <th onClick={() => this.sortBy('price')}>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(product => (
                        <tr key={product._id}>
                          <td>
                          <img src={images[product.imageName]} width="150" height="100" alt={product.imageName}/>
                          </td>
                          <td>
                            <div name="name" >{product.name}</div>
                            <div>{product.description}</div>
                          </td>
                          <td>
                            <div>{product.price}zł</div>
                            <div>
                            <button onClick={() => this.addToCart(product)}>Add to Cart</button>
                            
                            </div>
                            
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    </table>
                    <div className='addProductBtn'>

                    
                    <div className = "add-product">
                    {addProduct}
                    </div>
                    </div>
                
              </>
            )
            }
}
}
       
  


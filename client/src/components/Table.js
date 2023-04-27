import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import LinkInClass from '../components/LinkInClass'
import { SERVER_HOST } from '../config/global_constants'
import Paypal from "./Paypal"
import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, ACCESS_LEVEL_NORMAL_USER, SANDBOX_CLIENT_ID, PRODUCTION_CLIENT_ID} from "../config/global_constants"

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
      imageName: "",
      selectedFile: null,
      isProductAdded: false,
      wasSubmittedAtLeastOnce: false
    }
  }

  componentDidMount() 
    {
      if(localStorage.accessLevel > ACCESS_LEVEL_GUEST)
      {
        axios.get(`${SERVER_HOST}/basket`)
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
                    console.log("Records read")   
                    this.setState({products: res.data}) 
                }   
            }
            else
            {
                console.log("Record not found")
            }
        })
        axios.get(`${SERVER_HOST}/products`)
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
                    console.log("Records read")   
                    this.setState({products2: res.data}) 
                }   
            }
            else
            {
                console.log("Record not found")
            }
        })
    }
  }

  emptyBasket()
  {
    //{products.map(product => (
      
      
    //))

    axios.post(`${SERVER_HOST}/basket/reset_basket_collection`)
  }
//}

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

  handleSubmit = (e) => {
    e.preventDefault()

    
    axios.post(`${SERVER_HOST}/basket/add/${this.state.name}/${this.state.description}/${this.state.category}/${this.state.price}/${this.state.imageName}` )
      .then(res => {
        this.setState({isProductAdded: true})
      })
      .catch(err => {
        this.setState({wasSubmittedAtLeastOnce: true})
      })
  }

  render() {
    let price1 = 0
    let products = this.state.products

    products.map(product => (
      price1 = price1 + product.price
    ))

    let images = []
      const imagesContext = require.context('../images/', true, /\.png|jpg|jpeg|gif$/);
imagesContext.keys().forEach(image => {
  images[image.replace('./', '')] = imagesContext(image);
});
  
    // Sort the products by the specified key in the specified direction
    products.sort((a, b) => {
      if (a[this.state.sortBy] < b[this.state.sortBy]) {
        return this.state.sortDirection === 'asc' ? -1 : 1
      }
      if (a[this.state.sortBy] > b[this.state.sortBy]) {
        return this.state.sortDirection === 'asc' ? 1 : -1
      }
      return 0
    })
  
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
                  
                </td>
              </tr>
            ))}
          </tbody>
          </table>
          <div className='cartButtons'>

          
          <div className = "add-product">
          <h5>Price: {price1}zł</h5>
          <button className = "loginBtn" onClick={() => this.emptyBasket()}>Clear the Cart</button>
          </div>


          <div className = "add-product">
          
             <Paypal price={price1}/>
      
          </div>
          </div>
      
    </>
  )
}
}
       
  
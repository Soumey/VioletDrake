import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { SERVER_HOST } from '../config/global_constants'
import { Redirect } from 'react-router-dom'
import ProductTable from "./Table2"





export default class CreateProduct extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: "",
      description: "",
      category: "",
      price: "",
      stock: "",
      imageName: "",
      imageName2: "imageName",
      name2: "Name",
      description2: "Description",
      category2: "Category",
      price2: "Price",
      stock2: "Stock",

      
      selectedFile2: null,
      selectedFile: null,
      isProductAdded: false,
      wasSubmittedAtLeastOnce: false
    }
  }

  componentDidMount(){
    if(this.props.location.state){
      

      this.setState({
        name2: this.props.location.state.product.name,
        description2: this.props.location.state.product.description,
        category2: this.props.location.state.product.category,
        price2: this.props.location.state.product.price,
        stock2: this.props.location.state.product.stock,
        imageName2: this.props.location.state.product.imageName,
      })
      
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  
  handleSubmit = (e) => {
    e.preventDefault()

    if(this.props.location.state){

    axios.delete(`${SERVER_HOST}/products/${this.props.location.state.product._id}`)

    }

    
    axios.post(`${SERVER_HOST}/products/add/${this.state.name}/${this.state.description}/${this.state.category}/${this.state.price}/${this.state.stock}/${this.state.imageName}`)
      .then(res => {
        this.setState({isProductAdded: true})
      })
      .catch(err => {
        this.setState({wasSubmittedAtLeastOnce: true})
      })
  }

  render() {


    let errorMessage = ""
    if (this.state.wasSubmittedAtLeastOnce) {
      errorMessage = <div className="error">Error: All fields must be filled in</div>
    }
    
    

    return (
      <form className="addProductContainer" noValidate={true} id="addProductForm">
        {this.state.isProductAdded ? <Redirect to="/products"/> : null}
        

        {errorMessage}

        <h2>Add a New Product</h2>

        <input
          name="name"
          type="text"
          placeholder={this.state.name2}
          value={this.state.name}
          onChange={this.handleChange}
          ref={(input) => {this.inputToFocus = input}}
        /><br/>

        <textarea
          name="description"
          placeholder={this.state.description2}
          value={this.state.description}
          onChange={this.handleChange}
        /><br/>

        

        <select
          name="category"
          //placeholder={this.state.category2}
          value={this.state.category}
          onChange={this.handleChange}
          >
          <option value="Computers">Computers</option>
          <option value="Computer Parts">Computer Parts</option>
          <option value="Gaming">Gaming</option>
          <option value="Smartphones">Smartphones</option>
          <option value="AGD">AGD</option>
          <option value="RTV">RTV</option>
          <option value="Smarthome">Smarthome</option>
          <option value="Kids">Kids</option>

          </select>
        <br/>

        <input
          name="price"
          type="number"
          placeholder={this.state.price2}
          value={this.state.price}
          onChange={this.handleChange}
        /><br/>

        <input
          name="stock"
          type="number"
          placeholder={this.state.stock2}
          value={this.state.stock}
          onChange={this.handleChange}
        /><br/>

        <input
          name="imageName"
          type="text"
          placeholder={this.state.imageName2}
          value={this.state.imageName}
          onChange={this.handleChange}
        /><br/>
        <div className = "productBtn">


        <Link className = "loginBtn" to={"/Category"} type="submit" onClick={this.handleSubmit}>Add Product</Link>

        <Link className="loginBtn" to={"/Category"}>Cancel</Link> 
        </div>
      </form>
    )
  }
}




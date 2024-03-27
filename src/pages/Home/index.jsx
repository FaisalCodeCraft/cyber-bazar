import React from 'react'
import Header from './Header/Header'
import NewArrival from './NewArrival/NewArrival'
import AllProducts from './AllProducts/AllProducts'

const Home = () => {
    return (
        <React.Fragment>
            <Header />
            <NewArrival />
            <AllProducts />
        </React.Fragment>
    )
}

export default Home
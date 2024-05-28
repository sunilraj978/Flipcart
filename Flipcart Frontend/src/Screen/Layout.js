import React from 'react'
import Header from '../Screen/Header/header'
import Mheader from './MenuHeader/mHeader'
function Layout(props) {
    return (
        <div>
            <Header />
            <Mheader />
            {props.children}
        </div>
    )
}

export default Layout

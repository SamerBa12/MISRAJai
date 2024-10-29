import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar'
import './Root.css'
import { useSelector } from 'react-redux'

const Root = () => {
    const themeMode = useSelector(state => state.sliceTheme.mode)
    return (
        <div className={themeMode === 'dark' ? 'dark-mode' : 'light-mode'}>
            <NavBar />
            <Outlet />
        </div>
    )
}

export default Root
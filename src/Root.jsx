import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar'
import './Root.css'
import { useSelector } from 'react-redux'
import { Flex } from '@mantine/core'

const Root = () => {
    const themeMode = useSelector(state => state.sliceTheme.mode)
    return (
        <div className={themeMode === 'dark' ? 'dark-mode' : 'light-mode'}>
            <Flex direction={'column'}  >

                <NavBar />
                <Outlet />
            </Flex>
        </div>
    )
}

export default Root
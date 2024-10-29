import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../redux/SliceTheme'
import { Button, Collapse, Container, rem, Switch, useMantineTheme } from '@mantine/core'
import { IconMoonStars, IconSun } from '@tabler/icons-react'
import ToggleTheme from './ToggleTheme'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FiSearch } from "react-icons/fi";



const NavBar = () => {


    return (
        <div>
            <div className="logo">
                <h1>
                    SHAHADA
                </h1>
            </div>
            <div className="navPages">
                <Link to="/" className="navPage">HOME</Link>
                <Link to="/" className="navPage">ABOUT US </Link>
                <Link to="/" className="navPage">BLOG</Link>
                <Link to="/" className="navPage">Contact</Link>
            </div>
            <div className='toggleTheme'>
                <FiSearch />
                <ToggleTheme />
            </div>
        </div>
    )
}

export default NavBar
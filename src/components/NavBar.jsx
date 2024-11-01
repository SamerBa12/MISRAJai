import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../redux/SliceTheme'
import { Button, Collapse, Container, Flex, rem, Switch, Text, useMantineTheme } from '@mantine/core'
import { IconMoonStars, IconSun } from '@tabler/icons-react'
import ToggleTheme from './ToggleTheme'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FiSearch } from "react-icons/fi";
import '../assets/css/navbar.css'



const NavBar = () => {


    return (

        <Flex
            justify={'space-around'}
            align={'center'}
            py={'xl'}
            wrap={'wrap'}
            className="navbar"
        >
            <div className="logo">
                <Text size='20px'>SHAHADA</Text>
            </div>
            <Flex
                justify={'space-around'}
                gap={'md'}
                className='pagesLink'
                wrap={'wrap'}
            >
                <a href='#' className="navPage">HOME</a>
                <a href='#' className="navPage">ABOUT US</a>
                <a href='#' className="navPage">BLOG</a>
                <a href='#' className="navPage">CONTACT</a>
            </Flex>
            <Flex gap={15} align={'center'}>
                <FiSearch />
                <ToggleTheme />
            </Flex>
        </Flex>
    )
}

export default NavBar
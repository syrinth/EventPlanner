import './header.css'
import React from 'react';
import axiosInstance from '../axios';

import { useState, useEffect } from "react";
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

import RecentActorsIcon from '@mui/icons-material/RecentActors';
import EventIcon from '@mui/icons-material/Event';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

//https://mui.com/material-ui/material-icons/
const MySidebar = ({onNewEvent, onShowAllEvents}) => {
    const { pathname } = useLocation();
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {     
        if (!authenticated) {
            const cookieToken = localStorage.getItem('access_token');
            if (cookieToken) {
                setAuthenticated(true);
            }
        }
      
      }, [pathname]);

    const handleNewEvent = (e) => {
        onNewEvent(e);
      };

    const handleShowAllEvents = (e) => {
        onShowAllEvents(e);
      };

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        axiosInstance.defaults.headers['Authorization'] = null;
        setAuthenticated(false);
      }; 

    return (
        <Sidebar>
            <Menu>
                <SubMenu label="Events" icon={<EventIcon/>}>
                    <MenuItem icon={<EditCalendarIcon/>} onClick={(e) => handleNewEvent(e)}> Create New </MenuItem>
                    <MenuItem icon={<EventAvailableIcon/>} onClick={(e) => handleShowAllEvents(e)}> All Events </MenuItem>
                </SubMenu>
                <MenuItem icon={<RecentActorsIcon/>}> Contact List </MenuItem>
                <SubMenu label="User" icon={<PersonIcon/>}>
                    <MenuItem> Profile </MenuItem>
                    <MenuItem icon={<LogoutIcon/>} component={<Link to="/login" onClick={handleLogout} />}> Logout </MenuItem>
                </SubMenu>
            </Menu>
        </Sidebar>
    );
};

export default MySidebar;
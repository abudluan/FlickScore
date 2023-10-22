import React, { useState, useEffect } from "react";
import {
    MDBNavbar,
    MDBContainer,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBDropdownToggle,
    MDBDropdown,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBCollapse,
    MDBBtn,
    MDBIcon,
    MDBNavbarNav
} from 'mdb-react-ui-kit';
import './NavigationBar.scss';
import { Link, NavLink } from "react-router-dom";

const NavigationBar = () => {
    const [showBasic, setShowBasic] = useState(false);

    const isMobile = window.innerWidth < 992;

   
    const closeNavbar = () => {
        if (isMobile) {
            setShowBasic(false);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 992) {
                setShowBasic(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <MDBNavbar fixed="top" id="NavigationBar" expand='lg' dark>
            <MDBContainer fluid>
                <MDBNavbarBrand>
                    <Link to="/">
                        FlickScore
                    </Link>
                </MDBNavbarBrand>

                <MDBNavbarToggler
                    aria-controls='navbarSupportedContent'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                    onClick={() => setShowBasic(!showBasic)}
                >
                    <MDBIcon icon='bars' fas />
                </MDBNavbarToggler>

                <MDBCollapse navbar show={showBasic}>
                    <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>

                        <NavLink to="/filmes" className="mx-3 my-2" activeClassName="active" onClick={closeNavbar}> 
                            <MDBNavbarItem>
                                <MDBNavbarLink>Filmes</MDBNavbarLink>
                            </MDBNavbarItem>
                        </NavLink>

                        <NavLink to="/series" className="mx-3 my-2" activeClassName="active" onClick={closeNavbar}>
                            <MDBNavbarItem>
                                <MDBNavbarLink>Séries</MDBNavbarLink>
                            </MDBNavbarItem>
                        </NavLink>

                    </MDBNavbarNav>

                    <form className='input-group'>
                        <input type='search' className='form-control' placeholder='Buscar um Filme, Série ou Pessoa' aria-label='Search' />
                        <MDBBtn className="BtnSearch">Buscar</MDBBtn>
                    </form>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    );
}

export default NavigationBar;
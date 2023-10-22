import React, { useState } from "react";
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

                        <NavLink to="/filmes" className="mx-1" activeClassName="active">
                            <MDBNavbarItem>
                                <MDBNavbarLink>Filmes</MDBNavbarLink>
                            </MDBNavbarItem>
                        </NavLink>

                        <NavLink to="/series" className="mx-1" activeClassName="active">
                            <MDBNavbarItem>
                                <MDBNavbarLink>Séries</MDBNavbarLink>
                            </MDBNavbarItem>
                        </NavLink>

                        <NavLink to="/pessoas" className="mx-1" activeClassName="active">
                            <MDBNavbarItem>
                                <MDBNavbarLink>Pessoas</MDBNavbarLink>
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
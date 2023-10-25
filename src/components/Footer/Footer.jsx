import React from "react";
import './Footer.scss';
import { FaCode } from 'react-icons/fa';
import {
    MDBFooter
} from 'mdb-react-ui-kit';


const Footer = () => {
    return (
        <section id="footer">

            <MDBFooter>
                <div className='text-center'>
                    <p><FaCode className="icon" size={20} /> Desenvolvido por <a href='https://abudluan.vercel.app' target="_blank" rel="noreferrer" >
                        Luan Abud
                    </a>
                    </p>
                </div>
            </MDBFooter>

        </section>
    );
}

export default Footer;
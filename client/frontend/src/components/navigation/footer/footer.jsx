import React from 'react';
import {Link} from 'react-router-dom';

import UnabLogo from '../../img/UniLogo.png';
import BecLogo from '../../img/logoBN.png';

import './footer.css';

const Footer = () => {
    return (
        <>
            <div className="footer-container p-3">
                <div className="img-container container">
                    <div className="ULogo-holder">
                        <img src={UnabLogo} alt="Logo Universidad Andrés Bello" className="UniLogo" />
                    </div>
                    <div className="BLogo">
                        <img src={BecLogo} alt="Logo Proyecto BEC" />
                    </div>
                </div>
                <div className="links-container container">
                    <ul className='links-list'>
                        <li className="list-item">
                            <h4>Enlaces</h4>
                        </li>
                        <li className="list-item">
                            <Link className="link" to='/'>
                                Inicio
                            </Link>
                        </li>
                        <li className="list-item">
                            <Link className="link" to='/catalogo'>
                                Catálogo
                            </Link>
                        </li>
                        <li className="list-item">
                            <Link className="link"to='/user/dashboard'>
                                Mi cuenta
                            </Link>
                        </li>
                        <li className="list-item">
                            <Link className="link" to='/support'>
                                Ayuda
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="sub-text-container">
                    <p className="sub-text">
                        Proyecto creado por - Amaro González | Biblioteca BMEC © 2025
                    </p>
                </div>
            </div>
        </>)
};

export default Footer;
;
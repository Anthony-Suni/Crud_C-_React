import React from "react";
import { Link } from "react-router-dom";
import '../../Styles/header.css';

const Header = () => {
    return (
        <div className='header-container'>
            <div className="header-center">
                <div className='header-content'>
                    <h2 className='title-header'>
                        Big Comeback
                    </h2>
                    <p className='description-header'>
                        a scelerisque purus semper eget duis at tellus at 
                        urna condimentum mattis pellentesque id nibh tortor 
                        id aliquet lectus proin nibh nisl condimentum id venenatis
                    </p>
                    <div className='header-buttons'>
                        <button type='button' className='btn-watch'>
                            WATCH NOW
                        </button>
                        
                        {/* Utiliza Link para redirigir a /Crud/users */}
                        <Link to="/Crud/users" className='btn-playlist'>
                            + PLAYLIST
                        </Link>
                    </div>
                </div>
                <div className='header-video'>
                    <iframe className='video' src="https://www.youtube.com/embed/D4akt2_1sdQ" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe> 
                </div>
            </div>
        </div>
    )
}

export default Header;

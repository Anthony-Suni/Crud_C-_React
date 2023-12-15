import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Movie from "../Movie";
import { backMovie, currentMovies, nextMovie } from "./hooks";
import '../../Styles/carousel.css';

const Carousel = (props) => {
    const containerScrollCarousel = useRef(null);
    const [widthCarousel, setWidthCarousel] = useState({ width: 0, numberCards: 0 });
    const [currentSection, setCurrentSection] = useState('today');
    const { layout, title } = props;

    useLayoutEffect(() => {
        setWidthCarousel({ width: Math.floor(((window.innerWidth / 100) * 76) / (164 + 15)) * (164 + 14), numberCards: Math.floor(((window.innerWidth / 100) * 76) / (164 + 15)) });
    }, []);

    useEffect(() => {
        window.addEventListener('resize', () => {
            console.log(Math.floor(((window.innerWidth / 100) * 76) / (164 + 15)) * (164 + 14));
            setWidthCarousel({ width: Math.floor(((window.innerWidth / 100) * 76) / (164 + 15)) * (164 + 14), numberCards: Math.floor(((window.innerWidth / 100) * 76) / (164 + 15)) });
        });
    }, []);

    return (
        <div className='container-carousel'>
            <div className='carousel-center'>
                <div className='carousel' style={{ flexDirection: layout }}>
                    <div className='carousel-filters' style={{ width: widthCarousel.width }}>
                        <div className='filters-carousel'>
                            <span className='filter-text btn-filter' onClick={() => setCurrentSection('today')} style={currentSection === 'today' ? { color: '#24baef' } : null}>
                                Hoy
                            </span>
                            <span className='filter-text'>
                                /
                            </span>
                            <span className='filter-text btn-filter' onClick={() => setCurrentSection('week')} style={currentSection === 'week' ? { color: '#24baef' } : null}>
                                Esta semana
                            </span>
                            <span className='filter-text'>
                                /
                            </span>
                            <span className='filter-text btn-filter' onClick={() => setCurrentSection('month')} style={currentSection === 'month' ? { color: '#24baef' } : null}>
                                Últimos 30 días
                            </span>
                            <span className='filter-text'>
                                /
                            </span>
                        </div>
                        <div className='container-movies' ref={containerScrollCarousel}>
                            <div className='carousel-movies'>
                                {currentMovies(currentSection, containerScrollCarousel)}
                            </div>
                        </div>
                    </div>
                    <div className='data-movies'>
                        <span className="line-short">
                        </span>
                        <h3 className='category-movies'>
                            {title}
                        </h3>
                        <div className='actions-carousel'>
                            <div className='arrow-move' onClick={() => backMovie(containerScrollCarousel, widthCarousel.numberCards)}>
                                <img src='/less.png' alt="Flecha izquierda"/>
                            </div>
                            <div className='arrow-move' onClick={() => nextMovie(containerScrollCarousel, widthCarousel.numberCards)} >
                                <img src='/less.png' className="arrow-right" alt="Flecha derecha"/>
                            </div>
                        </div>
                        <span className='line-large'>
                        </span>
                        <span className='text-view'>
                            {` VER TODO >`}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Carousel;

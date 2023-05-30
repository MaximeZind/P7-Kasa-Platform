import classes from '../styles/Carousel.module.css';
import React from 'react';
import { useState } from 'react';
import arrow from '../assets/arrow_white.svg';

function Carousel({ pictures, title }) {

    const animationDuration = 400; // (Durée de l'animation en ms)
    const [containerStyle, setContainerStyle] = useState({  //CSS du container qu'on utilise pour l'animation
        width: `300%`,
        transform: `translateX(-${100 / 3}%)`,
    });
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [slideIndex, setSlideIndex] = useState(0);
    const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);

    //Vers le slide précédent
    const handlePrevSlide = () => {
        if (isButtonDisabled){
            return
        }
        setIsButtonDisabled(true); //Empêche de cliquer de nouveau sur la flèche
        setContainerStyle({
            ...containerStyle,
            transform: `translateX(0%)` //Animation
        });

        setTimeout(() => {
            setIsTransitionEnabled(false); //désactive la transition
            setSlideIndex((prevIndex) => (prevIndex === 0 ? pictures.length - 1 : prevIndex - 1)); // modifie l'index des photos affichées
            setContainerStyle({ //reset le containerStyle (pour que les images soient de nouveau centrées après l'animation)
                ...containerStyle,
                transform: `translateX(-${100 / 3}%)`
            });
        }, animationDuration);

        setTimeout(() => {
            setIsTransitionEnabled(true);
            setIsButtonDisabled(false);
        }, animationDuration+25);
    };
    
    //Vers le slide suivant
    const handleNextSlide = () => {
        if (isButtonDisabled){
            return
        }
        setIsButtonDisabled(true); //Empêche de cliquer de nouveau sur la flèche
        setContainerStyle({
            ...containerStyle,
            transform: `translateX(-${200 / 3}%)` //Animation
        });

        setTimeout(() => {
            setIsTransitionEnabled(false); //désactive la transition
            setSlideIndex((prevIndex) => (prevIndex === pictures.length - 1 ? 0 : prevIndex + 1)); // modifie l'index des photos affichées
            setContainerStyle({ //reset le containerStyle (pour que les images soient de nouveau centrées après l'animation)
                ...containerStyle,
                transform: `translateX(-${100 / 3}%)`, 
            });
        }, animationDuration);

        setTimeout(() => { //Reset transition et activation du bouton 25ms après l'animation (moins d'écart crée un bug)
            setIsTransitionEnabled(true);
            setIsButtonDisabled(false);
        }, animationDuration+25);
    };

    return (
        <div className={classes.carousel}>
            <div
                className={classes.carousel_pictures}
                style={{
                    ...containerStyle,
                    transition: isTransitionEnabled ? `transform ${animationDuration/1000}s ease` : 'none',
                }}
            >
                {pictures[slideIndex - 1] ? <img className={classes.carousel_pictures_pic} src={pictures[slideIndex - 1]} alt={title}></img> :
                    <img className={classes.carousel_pictures_pic} src={pictures[pictures.length - 1]} alt={title}></img>}
                <img className={classes.carousel_pictures_pic} src={pictures[slideIndex]} alt={title}></img>
                {pictures[slideIndex + 1] ? <img className={classes.carousel_pictures_pic} src={pictures[slideIndex + 1]} alt={title}></img> :
                    <img className={classes.carousel_pictures_pic} src={pictures[0]} alt={title}></img>}
            </div>
            {pictures.length === 1 ? null : //Ne s'affiche pas s'il y a seulement une image
                <div className={classes.carousel_nav}>
                    <img src={arrow} className={classes.carousel_arrow_left} alt='Image précédente' onClick={handlePrevSlide}></img>
                    <p>{slideIndex + 1}/{pictures.length}</p>
                    <img src={arrow} className={classes.carousel_arrow_right} alt='Image suivante' onClick={handleNextSlide}></img>
                </div>}
        </div>
    )

}

export default Carousel;
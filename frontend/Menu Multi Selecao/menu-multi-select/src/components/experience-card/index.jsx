import { React, useState } from 'react';
import propTypes from 'prop-types';

import './style.css';

const ExperienceCard = ({ info }) => {

    const [selectedCard, setSelectedCard] = useState(0);

    const handleOnClick = (index) => {
        setSelectedCard(index);
    }

    const renderElements = (element, clickable, index) => {
        return (
            <section className={`main-card ${clickable ? index === selectedCard ? 'active-card clickable-card' : 'inactive-card clickable-card' : 'active-card'}`} onClick={() => handleOnClick(index)}>
                <div className="main-card-content">
                    <header className='main-card__title-container'>
                        <p className='main-card__title-container__title'>{element.title}<span className='main-card__title-container__subtitle'> | {element.subtitle}</span></p>
                        <p className='main-card__title-container__aditional-info'>{element.aditionalInfo}</p>
                    </header>

                    <article className='main-card__description-container'>
                        <p className='main-card__description-container__title'>Resumo</p>
                        <p className='main-card__description-container__text'>{element.description}</p>
                    </article>
                </div>
            </section>
        );
    }

    const conditionalRender = (info) => {

        const clickable = info.cardInfo.length > 1;

        return info.cardInfo.map((element, index) => {
            return renderElements(element, clickable, index);
        })
    }

    if (!info) {
        return <h2>informação Não Existe :(</h2>
    }

    return (
        <div className='main-card-container'>
            {conditionalRender(info)}
        </div>
    );
}

ExperienceCard.propTypes = {
    info: propTypes.oneOf([
        propTypes.exact({
            title: propTypes.string,
            subtitle: propTypes.string,
            aditionalInfo: propTypes.string,
            description: propTypes.string
        }),
        propTypes.arrayOf({
            title: propTypes.string,
            subtitle: propTypes.string,
            aditionalInfo: propTypes.string,
            description: propTypes.string
        })
    ]).isRequired
}

export default ExperienceCard;
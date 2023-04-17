import React from "react";

const ExperienceButton = ({ }) => {
    return (
        <button className={`experience-options__button-card ${selectedOption == index ? 'button-card--active' : 'button-card--inactive'}`} onClick={handleOnClick} value={index}>{option.name}</button>
    );
}
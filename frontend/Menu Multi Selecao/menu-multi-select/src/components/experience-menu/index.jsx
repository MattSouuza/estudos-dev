import { React, useState } from "react";
import ExperienceCard from "../experience-card";
import './style.css';

const ExperienceMenu = ({ optionsList }) => {
    const [selectedOption, setSelectedOption] = useState(0);

    
    const handleOnClick = (e) => {
        setSelectedOption(e.target.value);
    }

    return (
        <div className="experience-menu">
            <section className='experience-options'>

                {optionsList.map((option, index) => <button className={`experience-options__button-card ${selectedOption == index ? 'button-card--active' : 'button-card--inactive'}`} onClick={handleOnClick} value={index}>{option.name}</button>)}
                
            </section>

            <ExperienceCard info={optionsList[selectedOption]} />
        </div>
    );
}

export default ExperienceMenu;
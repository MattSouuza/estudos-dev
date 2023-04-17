import React, { useState } from 'react';
import './App.css';
import ExperienceMenu from './components/experience-menu';

function App() {
  const experienceData = [
    {
      name: "Bacharel CC",
      cardInfo: [{
        title: "Bacharelado em Ciência da Computação",
        subtitle: "Universidade Cruzeiro do Sul Virtual",
        aditionalInfo: "Fev. 2023 - Atual",
        description: "Está sendo muuito legal!",
      },
      {
        title: "Técnico em Análise e Desenvolvimento de Sistemas",
        subtitle: "Escola SENAI de Informática",
        aditionalInfo: "Jul. 2019 - Dez. 2020",
        description: "Foi muuito legal!"
      }],
    },
    {
      name: "Técnico ADS",
      cardInfo: [{
        title: "Técnico em Análise e Desenvolvimento de Sistemas",
        subtitle: "Escola SENAI de Informática",
        aditionalInfo: "Jul. 2019 - Dez. 2020",
        description: "Foi muuito legal!"
      }]
    },
    {
      name: "Design Gráfico",
      cardInfo: [{
        title: "Design Gráfico",
        subtitle: "Escola SAGA",
        aditionalInfo: "Out. 2015 - Mai. 2018",
        description: "Foi muuito legal!"
      }]
    }];

  return (
    <ExperienceMenu optionsList={experienceData} />
  );
}

export default App;

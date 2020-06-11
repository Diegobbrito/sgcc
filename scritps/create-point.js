function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]");

    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then((response) => response.json())
    .then( states => {
        for(const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</opton>`
        }
    });
    
}

populateUFs();

function getCities(event){
    const citySelect = document.querySelector("[name=city]");
    const stateInput = document.querySelector("[name=state ]");

    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState].text;  

    const ufValue = event.target.value;
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

    fetch(url)
    .then((response) => response.json())
    .then( cities => {
        for(const city of cities){
            citySelect.innerHTML += `<option value="${city.id}">${city.nome}</opton>`
        }

        citySelect.disabled = false;
    });

}

document
    .querySelector("select[name=uf")
    .addEventListener("change", getCities)


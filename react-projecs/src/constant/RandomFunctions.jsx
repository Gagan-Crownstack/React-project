const PokeIntergratedData={
    name:"",
    data:"",
    species:"",
}


// combine Data making number of API calls and returns the data


export const combineData = async (pokemon) => {
    const newdata = [];

    try {
        const promises = pokemon.map(async (poke) => {
            const response = await fetch(poke.url);
            const pokeData = await response.json();
            const pokeSpecies= await fetch(pokeData.species.url);
            const pokeSpeciesData= await pokeSpecies.json();

            return {
                name: poke.name,
                data: pokeData, //  Pokemon data
                species: pokeSpeciesData // Pokemon species Data
            };
        });

        const results = await Promise.all(promises);
        console.log(results);
        return results;
    } catch (e) {
        console.log("Error:", e);
        return null;
    }
};






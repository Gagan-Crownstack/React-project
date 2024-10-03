import { useState, useEffect } from "react";

const Pokerow = ({ item,index, offset }) => {
    const [pokeData, setPokeData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchpokemonbyUrl = async () => {
        setIsLoading(true);
        const response = await fetch(item.url);
        const data = await response.json();
        setPokeData(data); // Store fetched data in state
        setIsLoading(false);
    };
    const showAbilitesnMoves = (pokecharacteristics) => {
        
        const abilityData= pokecharacteristics.slice(0,3);

        const data=<ul> {abilityData.map((item) => (
            <li key={item?.ability ?item?.ability?.name : item?.move?.name}>{item?.ability ?item?.ability?.name : item?.move?.name}</li>
        ))}</ul>
       return data;
    };
    

    useEffect(() => {
        fetchpokemonbyUrl();
    }, [item]);

    return (
        <tr className="border-2 text-center">
            <td className="w-4 border-2 px-2 md:px-8">{index +1 + offset}</td>
            <td className="h-24 border-2 font-semibold text-l md:text-xl  ">{item.name}</td>
            <td className="w-24 border-2 h-24 contain">
                {pokeData && pokeData.sprites ? (
                    <img className="h-24 contain " src={pokeData.sprites.front_shiny} alt={item.name} />
                ) : (
                    "Loading.."
                )}
            </td>
            <td className="border-2 hidden md:table-cell">{pokeData && pokeData.sprites ? pokeData.base_experience :"Loading..."}</td>
            <td className="border-2 hidden md:table-cell">{pokeData && pokeData.sprites ? pokeData.height :"Loading..."}</td>
            <td className="border-2 hidden md:table-cell">{pokeData && pokeData.sprites ? pokeData.weight :"Loading..."}</td>
            <td className="hidden sm:table-cell">{pokeData && pokeData.sprites ? showAbilitesnMoves(pokeData.abilities) :"Loading..."}</td>
            <td className="border-2">{pokeData && pokeData.sprites ? showAbilitesnMoves(pokeData.moves) :"Loading..."}</td>
            
        </tr>
    );
};

export default Pokerow;

import { useState, useEffect } from "react";

const Pokerow = ({ item,index, offset }) => {
   
    const showAbilitesnMoves = (pokecharacteristics) => {
        
        const abilityData= pokecharacteristics.slice(0,3);

        const data=<ul> {abilityData.map((item,index) => (
            <li key={index}>{item?.ability ? item?.ability?.name : item?.move?.name}</li>
        ))}</ul>
       return data;
    };
    
    return (
        <tr className="border-2 text-center">
            <td className="w-4 border-2 px-2 md:px-8">{index +1 + offset}</td>
            <td className="h-24 border-2 font-semibold text-l md:text-xl  ">{item.name}</td>
            <td className="w-24 border-2 h-24 contain">
                {item && item.name ? (
                    <img className="h-24 contain " src={item.data.sprites.front_shiny} alt={item.name} />
                ) : (
                    "Loading.."
                )}
            </td>
            <td className="border-2 hidden md:table-cell">{item && item.data.base_experience ? item.data.base_experience :"Loading..."}</td>
            <td className="border-2 hidden md:table-cell">{item && item.data.sprites ? item.data.height :"Loading..."}</td>
            <td className="border-2 hidden md:table-cell">{item && item.data.sprites ? item.data.weight :"Loading..."}</td>
            <td className="hidden sm:table-cell">{item && item.data.sprites ? showAbilitesnMoves(item.data.abilities) :"Loading..."}</td>
            <td className="border-2">{item && item.data.sprites ? showAbilitesnMoves(item.data.moves) :"Loading..."}</td>
            
        </tr>
    );
};

export default Pokerow;

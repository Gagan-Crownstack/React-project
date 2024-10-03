import { useEffect, useState } from "react";
import { getSearchQuery } from "../constant/RandomFunctions";
import { CiSearch } from "react-icons/ci";

const SearchPanel = ({ pokemon ,onChangepagelimit ,onsearchOffset, sortfunc }) => {

    const[query, setQuery]=useState('')
    const[exp, setexp]=useState(0)
    let sortedPokemon = [...pokemon];


    const sortData = (dis) => {

        if (dis === 'ascend') {
            // Sort in ascending order
            sortedPokemon.sort((a, b) => a.name.localeCompare(b.name)); 
        } else {
            // Sort in descending order
            sortedPokemon.sort((a, b) => b.name.localeCompare(a.name)); 
        }

        sortfunc(sortedPokemon);
    };


    //searchQuery function

    const searchQuery = () => {
        if (query) {
            const filteredPokemon = pokemon.filter((poke) =>
                poke.name.toLowerCase().includes(query.toLowerCase())
            );
            sortfunc([...filteredPokemon]);
            onsearchOffset();
        } else {
            sortfunc(pokemon);
        }
    };

    // sort using exp
    const searchViaExp = (e) => {
        setexp(e.target.value);
        const expSorted = pokemon.filter((poke) => poke.base_experience >= e.target.value);
        console.log('Filtered Pokémon:', expSorted); // Debugging: Check if the list is filtered correctly
        sortfunc(expSorted);
    };
    
    

    // using debounce 600ms search query
    useEffect(() => {
        const timer = setTimeout(() => {
            searchQuery();
        }, 600); 

        return () => clearTimeout(timer); 
    }, [query, pokemon,exp]); 

    

    return (
        <div className="w-full mx-auto h-16 gap-5 flex items-center border-2 mb-2">

            {/* searching */}
            <div className="w-1/2 flex gap-2">
                <span className="text-xl font-semibold flex text-center p-2 ">Search : </span>
                <input className="w-4/6 p-2 rounded-md border-2" type="text" value={query} onChange={(e)=>setQuery(e.target.value)}  placeholder="Enter your query here" />
                <span className="flex items-center p-2 px-3 rounded-md cursor-pointer hover:opacity-90 active:opacity-70 text-xl font-bold bg-amber-400"><CiSearch /></span>
            </div>
            <div className="flex gap-5">
                    
                    {/* pagelimit */}
                <div className="flex p-2">
                    <div className="text-xl p-2 flex items-center">PageLimit : </div>
                    <select className=" p-4 rounded-md bg-amber-200" name="page-limit" id="page-limit" onChange={(e)=>{onChangepagelimit(e.target.value)}}>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </div>
                    {/* filter */}
                <div className="flex items-center">
                    <div className="p-2 text-xl">Filter: </div>
                    <div className="p-2 flex items-center">
                             <div className=" text-xl p-2.5 rounded-md bg-amber-400">exp &gt;</div> 
                            <select className="p-4 rounded-md bg-amber-200" name="exp-limit" id="exp-limit" onChange={(e)=>searchViaExp(e)}>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                    </div>
                </div>

                {/* sorrting */}
                <div className="flex gap-2 items-center">
                <div className="p-2 text-xl">Sort:</div>
                <div className="p-2 cursor-pointer flex gap-2 text-xl rounded-md hover:opacity-90 active:opacity-70 bg-amber-400" onClick={() => sortData('ascend')}> <span className="text-sm flex items-start">*a-z</span> <span>Sort</span></div>
                <div className="p-2 cursor-pointer flex gap-2 text-xl rounded-md hover:opacity-90 active:opacity-70 bg-amber-400" onClick={() => sortData('descend')}> <span className="text-sm flex items-start">*z-a</span> <span>Sort</span></div>
                </div>
            </div>
        </div>
    );
};

export default SearchPanel;

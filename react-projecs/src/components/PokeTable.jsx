    import React,{useEffect,useMemo,useState} from "react"
    import Pokerow from "./Pokerow";
    import SearchPanel from "./SearchPanel";
    import { combineData } from "../constant/RandomFunctions";

    const PokeTable = () => {

        const[pokemonAllData, setPokemonAllData] =useState([]);// store pokemonData globally which will be not be changed
        const[filteredPokemon, setFilteredPokemon]=useState([]);  //filtered state of data
        const[offset,setOffset]=useState(0); //stores key value for next request.
        const[currpage,setCurrPage]=useState(1); //stores current page number.
        const[pagelimit,setPageLimit]= useState(25); // to change page limit


        const[isLoading,setIsLoading]=useState(false);

        // function set page whenever page limit is changed
        const pageLimitfunc=(data)=>{
            let updatepage= Math.ceil((currpage*pagelimit/data))
            setPageLimit(data);
            setCurrPage(updatepage);
        }

        // function which called api whenever offset is 
        const fetchpokemondata= async(offset)=>{        
            try{
                setIsLoading(true);
                const response= await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=100`);
                const data =await response.json();
                // setPokemon((prev)=>[...prev,...data.results]);
                console.log("useEfect");
                const allData = await combineData(data.results);
                setPokemonAllData((prev)=>[...prev,...allData]);
                setFilteredPokemon((prev)=>[...prev,...allData]);
                setIsLoading(false);
            }
            catch(e){
                console.log("error",e);
            }
            
        }
        // whenever offset is changed function is called 
        useEffect(()=>{
            fetchpokemondata(offset)
        },[offset])


        //pagination whenver pages are witched will render the data according to pagelimit, and page number
        const pagination = (dir) => {
            if (dir === "next") {
                const nextOffset = currpage * pagelimit;
                if (nextOffset >= pokemonAllData.length && !isLoading) {
                    // Fetch more Pokémon if we are at the end of the current list
                    setOffset((prev) => prev + 100);
                }
                setCurrPage((prev) => prev + 1);
            } else if (dir === "prev" && currpage > 1) {
                setCurrPage((prev) => prev - 1);
            }
        };
        
        


        //slicing data into rows
        const displayimage = filteredPokemon.slice( ((currpage*pagelimit)-pagelimit), (currpage*pagelimit));


    return (
        <div className="w-11/12 mx-auto">
            <div>
                {/* search query */}
                <SearchPanel 
                    pokemon={pokemonAllData} 
                    onChangepagelimit={(data)=>pageLimitfunc(data)} 
                    resetPage={()=>setCurrPage(1)}  
                    sortfunc={(data)=>setFilteredPokemon(data)} 
                    />
            </div>
            <table className="w-full cursor-pointer">

                {/* table headings  */}
                <tr className="bg-amber-400">
                    <th rowSpan={2} className="w-4 border-2">S.No.(#)</th>
                    <th rowSpan={2} className="w-1/6 border-2">Pokemon Name </th>
                    <th rowSpan={2} className="w-24 h-24 border-2"> Image </th>
                    <th colSpan={5}>Abiities
                    </th>
                </tr>
                <tr className="bg-amber-400 text-center">
                    <th  className="border-2 hidden md:table-cell"> experience</th>
                    <th  className="border-2 hidden md:table-cell"> weight</th>
                    <th  className="border-2 hidden md:table-cell"> height</th>
                    <th  className="border-2 hidden sm:table-cell"> abilites(Pokemon)</th>
                    <th  className="border-2"> moves(Pokemon)</th>
                </tr>
                

                {/* table content */}
                
                <tbody>

                    {/* condition rendering */}

                    {isLoading ? "Loading..." : displayimage.map((item, index) => (
                        <Pokerow item={item} key={index} index={index} offset={pagelimit*currpage-pagelimit} />
                    ))}          

                </tbody>

            </table>
            <div className="flex gap-6 w-full justify-center my-10"> 
                <button className={`border-2 py-2 px-4 bg-amber-400 hover:opacity-90 active:opacity-70 ${currpage==1 ? "cursor-not-allowed":""}`}  onClick={()=>pagination("prev")} disabled={currpage==1}>&lt;</button>
                <div className="border-2 py-2 px-4">{currpage}</div>
                <button className={`border-2 py-2 px-4 bg-amber-400 hover:opacity-90 active:opacity-70 ${filteredPokemon.length < pagelimit ? "cursor-not-allowed":""}`} disabled={filteredPokemon.length < pagelimit}  onClick={()=>pagination("next")}>&gt;</button>
            </div>

        </div>
    )
    }

    export default PokeTable;
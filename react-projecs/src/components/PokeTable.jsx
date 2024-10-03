import React,{useEffect,useState} from "react"
import Pokerow from "./Pokerow";

const PokeTable = () => {

    const[pokemon, setPokemon]=useState([]);
    const[offset,setOffset]=useState(0);
    const[isLoading,setIsLoading]=useState(false);


    const fetchpokemondata= async(offset)=>{
        if(offset>=pokemon.length){
            setIsLoading(true);
            const response= await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`);
            const data =await response.json();
            setPokemon((prev)=>[...prev,...data.results]);
            console.log(pokemon);
            setIsLoading(false);
        }
    }


    useEffect(()=>{
        fetchpokemondata(offset)
    },[offset])


    const pagination=(dir)=>{
        if(dir === "next"){
            setOffset((prev)=>(prev+20));
        }
        else if (dir === "prev" && offset > 0) {
            setOffset((prev) => (prev-20));
        }
    }

        const displayimage= pokemon.slice(offset,offset+20);
  return (
    <div className="w-11/12 mx-auto">
        <div>
            <div>Filter</div>
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
                    <Pokerow item={item} key={index} index={index} offset={offset} />
                ))}          

            </tbody>

        </table>
        <div className="flex gap-6 w-full justify-center my-10"> 
            <button className={`border-2 py-2 px-4 bg-amber-400 hover:opacity-90 active:opacity-70 ${offset==0 ? "cursor-not-allowed":""}`}  onClick={()=>pagination("prev")} disabled={offset==0}>&lt;</button>
            <div className="border-2 py-2 px-4">{(offset/20)+1}</div>
            <button className="border-2 py-2 px-4 bg-amber-400 hover:opacity-90 active:opacity-70" onClick={()=>pagination("next")}>&gt;</button>
        </div>

    </div>
  )
}

export default PokeTable
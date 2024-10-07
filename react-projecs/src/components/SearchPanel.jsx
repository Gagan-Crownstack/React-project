import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import Tag from "../constant/Tag";

const SearchPanel = ({ pokemon, onChangepagelimit, resetPage, sortfunc }) => {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState([]);
  const [searchtag, setSearchTag] = useState([]);
  let sortedPokemon = [...pokemon];

  //sorting data
  const sortData = (dis) => {
    if (dis === "ascend") {
      // Sort in ascending order
      sortedPokemon.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      // Sort in descending order
      sortedPokemon.sort((a, b) => b.name.localeCompare(a.name));
    }

    sortfunc(sortedPokemon);
  };
  //add tag
  const handleAddTag = (newTag) => {
    const exists = tag.find((existingTag) => existingTag === newTag);
    if (!exists) {
      setTag((prev) => [...prev, newTag]);
      setQuery("");
    }
  };
  //delete tag
  const handeleDeleteTag = (deleteTag) => {
    console.log(deleteTag);
    const newTags = tag.filter((searchtag) => searchtag !== deleteTag);
    setTag(newTags);
  };

  const onSearchSimilarTags = () => {
    if (query) {
      const similarTags = pokemon.flatMap((poke) => {
        const nameMatches = poke.name
          .toLowerCase()
          .includes(query.toLowerCase());
        const typeMatches = poke.data.types.some((type) =>
          type.type.name.toLowerCase().includes(query.toLowerCase()),
        );
        const colorMatches = poke.species.color.name
          .toLowerCase()
          .includes(query.toLowerCase());
        const habitatMatches = poke.species.habitat.name
          .toLowerCase()
          .includes(query.toLowerCase());

        if (nameMatches || typeMatches || colorMatches || habitatMatches) {
          return [
            poke.name,
            ...poke.data.types.map((type) => type.type.name),
            poke.species.color.name,
            poke.species.habitat.name,
          ];
        }
        return [];
      });

      const uniqueTags = [...new Set(similarTags)];

      setSearchTag(uniqueTags);
      resetPage();
    } else {
      setSearchTag([]);
    }
  };

  const handleDisplayTags = () => {
    // document.getElementById("displaySimilarQTag").style.visibility = "visible";
  };

  //searchQuery function
  const searchQuery = () => {
    //searching on these parameter
    //name
    //data.types.type.name types is maybe an array
    //species.color.name
    //species.habitat.name

    if (tag.length > 0) {
      const filteredPokemon = pokemon.filter((poke) => {
        return tag.some((query) => {
          const nameMatches = poke.name
            .toLowerCase()
            .includes(query.toLowerCase());
          const typeMatches = poke.data.types.some((type) =>
            type.type.name.toLowerCase().includes(query.toLowerCase()),
          );
          const colorMatches = poke.species.color.name
            .toLowerCase()
            .includes(query.toLowerCase());
          const habitatMatches = poke.species.habitat.name
            .toLowerCase()
            .includes(query.toLowerCase());

          return nameMatches || typeMatches || colorMatches || habitatMatches;
        });
      });
      sortfunc(filteredPokemon);
    } else {
      sortfunc(pokemon);
    }
  };

  // sort using exp
  const searchViaExp = (e) => {
    const expThreshold = Number(e.target.value); // Convert input value to a number
    // Filter based on base experience
    const expSorted = pokemon.filter(
      (poke) => poke.data.base_experience >= expThreshold,
    );
    resetPage();
    sortfunc(expSorted); // Update the filtered Pokémon in your state
  };

  // using debounce 600ms search query
  useEffect(() => {
    const timer = setTimeout(() => {
      searchQuery();
      onSearchSimilarTags(query);
    }, 600);

    return () => clearTimeout(timer);
  }, [query, pokemon, tag]);

  return (
    <>
      <div className=" flex gap-5 items-center w-full h-16">
        {tag.map((t) => (
          <Tag key={t} tag={t} onDelete={(tag) => handeleDeleteTag(tag)} />
        ))}
      </div>
      <div className="w-full mx-auto h-16 gap-5 flex items-center border-2 mb-2">
        {/* searching */}
        <div className="w-1/2 flex gap-2">
          <span className="text-xl font-semibold flex text-center p-2 ">
            Search :{" "}
          </span>
          <input
            className="w-9/12 p-2 rounded-md border-2"
            type="text"
            value={query}
            onFocus={handleDisplayTags}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your query here"
          />
          <span className="flex items-center p-2 px-3 rounded-md cursor-pointer hover:opacity-90 active:opacity-70 text-xl font-bold bg-amber-400">
            <CiSearch />
          </span>
          {searchtag && searchtag.length > 0 && (
            <div
              id="displaySimilarQTag"
              className="absolute w-[614px] invisible rounded-md ml-[99px] top-[260px] h-96 py-5 px-10 bg-amber-300"
            >
              <div
                id="searchtab"
                className="flex flex-col overflow-y-auto h-full "
              >
                {searchtag.map((que, i) => (
                  <div
                    key={i}
                    onClick={() => handleAddTag(que)}
                    className="py-4 px-5 border-b-2 border-amber-500 hover:bg-amber-200 cursor-pointer "
                  >
                    {que}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-5">
          {/* pagelimit */}
          <div className="flex p-2">
            <div className="text-xl p-2 flex items-center">PageLimit : </div>
            <select
              className=" p-4 rounded-md bg-amber-200"
              name="page-limit"
              id="page-limit"
              onChange={(e) => {
                onChangepagelimit(e.target.value);
              }}
            >
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
          {/* filter */}
          <div className="flex items-center">
            <div className="p-2 text-xl">Filter: </div>
            <div className="p-2 flex items-center">
              <div className=" text-xl p-2.5 rounded-md bg-amber-400">
                exp &gt;
              </div>
              <select
                className="p-4 rounded-md bg-amber-200"
                name="exp-limit"
                id="exp-limit"
                onChange={(e) => searchViaExp(e)}
              >
                <option value="0">0</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
          </div>

          {/* sorrting */}
          <div className="flex gap-2 items-center">
            <div className="p-2 text-xl">Sort:</div>
            <div
              className="p-2 cursor-pointer flex gap-2 text-xl rounded-md hover:opacity-90 active:opacity-70 bg-amber-400"
              onClick={() => sortData("ascend")}
            >
              {" "}
              <span className="text-sm flex items-start">*a-z</span>{" "}
              <span>Sort</span>
            </div>
            <div
              className="p-2 cursor-pointer flex gap-2 text-xl rounded-md hover:opacity-90 active:opacity-70 bg-amber-400"
              onClick={() => sortData("descend")}
            >
              {" "}
              <span className="text-sm flex items-start">*z-a</span>{" "}
              <span>Sort</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPanel;

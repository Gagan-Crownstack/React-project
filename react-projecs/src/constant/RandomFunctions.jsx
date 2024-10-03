export const getSearchQuery = async (query) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);

        if (response.ok) {
            // throw new Error(`Error fetching data: ${response.status} ${response.statusText}`);

            const data = await response.json();
            console.log(data);
            return data;
        }

        

    } catch (e) {
        console.error('Error:', e);
        return null; // Return null or handle it accordingly
    }
};

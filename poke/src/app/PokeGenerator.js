export default async function GetRandomPokemon() {
  const randomId = Math.floor(Math.random() * 890) + 1;

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    const data = await res.json();

    return {
      name: data.name,
      image: data.sprites.front_default || null,
      type: data.types.map((t) => t.type.name).join(', '),
    };
  } catch (error) {
    console.error("Failed to fetch Pokémon:", error);
    return null;
  }
}

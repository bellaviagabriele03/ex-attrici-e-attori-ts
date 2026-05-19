// 📌 Milestone 1
// Crea un type alias Person per rappresentare una persona generica.

// Il tipo deve includere le seguenti proprietà:

// id: numero identificativo, non modificabile
// name: nome completo, stringa non modificabile
// birth_year: anno di nascita, numero
// death_year: anno di morte, numero opzionale
// biography: breve biografia, stringa
// image: URL dell'immagine, stringa

type Person = {
    readonly id: number,
    readonly name: string,
    birth_year: number,
    deat_year?: number,
    biography: string,
    image: string,
}

// 📌 Milestone 2
// Crea un type alias Actress che oltre a tutte le proprietà di Person, aggiunge le seguenti proprietà:

// most_famous_movies: una tuple di 3 stringhe
// awards: una stringa
// nationality: una stringa tra un insieme definito di valori.
// Le nazionalità accettate sono: American, British, Australian, 
// Israeli-American, South African, French, Indian, Israeli, Spanish, South Korean, Chinese.

type Actress = Person & {
    most_famous_movies: [string, string, string],
    awards: string,
    nationality: "American" | "British" | "Australian" | "Israeli-American" | "South African" | "French" | "Indian" | "Israeli" | "Spanish" | "South Korean" | "Chinese"

}

// 📌 Milestone 3
// Crea una funzione getActress che, dato un id, effettua una chiamata a:

// GET /actresses/:id
// La funzione deve restituire l’oggetto Actress, se esiste, oppure null se non trovato.

// Utilizza un type guard chiamato isActress per assicurarti 
// che la struttura del dato ricevuto sia corretta.
function isActress(dati: unknown): boolean {
    if (
        dati &&
        "id" in dati &&
        typeof dati.id === "number" &&
        "name" in dati &&
        typeof dati.name === "string" &&
        "most_famous_movies" in dati &&
        "awards" in dati &&
        typeof dati.awards === "string"
    ) {
        return true;
    }
    return false;
}


async function getActress(id: number): Promise<Actress | null> {
    try {
        const response = await fetch(`http://localhost:3333/actresses/${id}`)
        if (!response.ok) {
            throw new Error("Errore nel recupero dati")
        }
        const dati = await response.json()
        if (isActress(dati)) {
            return dati;
        }
        throw new Error("Formato dei dati non valido");

    } catch (error) {
        console.error(error)
        return null;
    }


}


getActress(2).then(data => console.log(data)).catch(error => console.error(error))
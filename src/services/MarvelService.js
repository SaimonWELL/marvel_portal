import {useHttp} from "../components/hooks/http.hook";

const useMarvelService=()=>{

    const{loading, request, error, clearError,process,setProcess} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=805df13e53662d329f8a1db9f387a41d';
    const _baseOffset = 210;



    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter)
    }

    const getCharacterByName = async (name) =>{
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return res.data.results.map(_transformCharacter)
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0])
    }

    const getAllComics = async (offset = 0) =>{
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transformComics)
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`)
        return _transformComics(res.data.results[0])
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name:char.name,
            description:char.description,
            thumbnail:char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage:char.url,
            wiki:char.urls[1].url,
            comics: char.comics.items
        }
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || "There is no description",
            pageCount: comics.pageCount
                ? `${comics.pageCount} pages.`
                : "No information about the number of pages",
            thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
            language: comics.textObjects[0]?.language || "en-us",
            // optional chaining operator
            price: comics.prices[0].price
                ? `${comics.prices[0].price}$`
                : "not available",
        };
    };

    return {loading,
            error,
            clearError,
            process,
            setProcess,
            getAllCharacters,
            getCharacter,
            getAllComics,
            getComic,
            getCharacterByName}
}

export default useMarvelService;
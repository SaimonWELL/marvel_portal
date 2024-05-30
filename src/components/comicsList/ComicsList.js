import './comicsList.scss';
import {useEffect, useState} from "react";
import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import {Link} from "react-router-dom";
const setContent = (process,Component,newItemLoading) =>{
    switch (process){
        case 'waiting':
            return <Spinner/>;
            break;
        case 'loading':
            return newItemLoading ? <Component/>: <Spinner/>;
            break;
        case 'confirmed':
            return <Component/>;
            break;
        case 'error':
            return <ErrorMessage/>;
            break;
        default:
            throw new Error('Unexpected process state');
    }
}
const ComicsList = () => {

    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [comicEnded, setComicEnded] = useState(false);

    const {getAllComics,process,setProcess} = useMarvelService();


    const onRequest = (offset,initial) =>{
        initial ? setNewItemLoading(false):setNewItemLoading(true);
        getAllComics(offset)
            .then(onComicsListLoaded)
            .then(()=>setProcess('confirmed'))
    }

    useEffect(() => {
        onRequest(offset,true)
    }, []);
    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList.length<8){
            ended = true;
        }

        setComicsList([...comicsList,...newComicsList]);
        setNewItemLoading(false);
        setOffset(offset => offset+8)
        setComicEnded(ended)
    }

    function renderItems(arr){
        const items = arr.map((item,i) => {
            return(
                <li
                    className='comics__item'
                    key={i}
                    onClick={() => {}}
                >
                    <Link to={`${item.id}`}>
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img" />
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>

                </li>
            )
        });

        return (
            <ul className='comics__grid'>
                {items}
            </ul>
        )

    }


    return (
        <div className="comics__list">
            {setContent(process,()=>renderItems(comicsList),newItemLoading)}
            <button className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{'display': comicEnded ? 'none' : "block"}}
                    onClick={()=> onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;
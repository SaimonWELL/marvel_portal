import './comicsList.scss';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';
import {useEffect, useRef, useState} from "react";
import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

const ComicsList = () => {

    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [comicEnded, setComicEnded] = useState(false);

    const {loading,error,getAllComics} = useMarvelService();


    const onRequest = (offset,initial) =>{
        initial ? setNewItemLoading(false):setNewItemLoading(true);
        getAllComics(offset)
            .then(onComicsListLoaded)
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
                    <a href="#">
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img" />
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </a>

                </li>
            )
        });

        return (
            <ul className='comics__grid'>
                {items}
            </ul>
        )

    }

    const items = renderItems(comicsList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            {/*<ul className="comics__grid">*/}
            {/*    <li className="comics__item">*/}
            {/*    <a href="#">*/}
            {/*            <img src={uw} alt="ultimate war" className="comics__item-img"/>*/}
            {/*            <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>*/}
            {/*            <div className="comics__item-price">9.99$</div>*/}
            {/*        </a>*/}
            {/*    </li>*/}
            {/*    <li className="comics__item">*/}
            {/*        <a href="#">*/}
            {/*            <img src={xMen} alt="x-men" className="comics__item-img"/>*/}
            {/*            <div className="comics__item-name">X-Men: Days of Future Past</div>*/}
            {/*            <div className="comics__item-price">NOT AVAILABLE</div>*/}
            {/*        </a>*/}
            {/*    </li>*/}
            {/*    <li className="comics__item">*/}
            {/*        <a href="#">*/}
            {/*            <img src={uw} alt="ultimate war" className="comics__item-img"/>*/}
            {/*            <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>*/}
            {/*            <div className="comics__item-price">9.99$</div>*/}
            {/*        </a>*/}
            {/*    </li>*/}
            {/*    <li className="comics__item">*/}
            {/*        <a href="#">*/}
            {/*            <img src={xMen} alt="x-men" className="comics__item-img"/>*/}
            {/*            <div className="comics__item-name">X-Men: Days of Future Past</div>*/}
            {/*            <div className="comics__item-price">NOT AVAILABLE</div>*/}
            {/*        </a>*/}
            {/*    </li>*/}
            {/*    <li className="comics__item">*/}
            {/*        <a href="#">*/}
            {/*            <img src={uw} alt="ultimate war" className="comics__item-img"/>*/}
            {/*            <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>*/}
            {/*            <div className="comics__item-price">9.99$</div>*/}
            {/*        </a>*/}
            {/*    </li>*/}
            {/*    <li className="comics__item">*/}
            {/*        <a href="#">*/}
            {/*            <img src={xMen} alt="x-men" className="comics__item-img"/>*/}
            {/*            <div className="comics__item-name">X-Men: Days of Future Past</div>*/}
            {/*            <div className="comics__item-price">NOT AVAILABLE</div>*/}
            {/*        </a>*/}
            {/*    </li>*/}
            {/*    <li className="comics__item">*/}
            {/*        <a href="#">*/}
            {/*            <img src={uw} alt="ultimate war" className="comics__item-img"/>*/}
            {/*            <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>*/}
            {/*            <div className="comics__item-price">9.99$</div>*/}
            {/*        </a>*/}
            {/*    </li>*/}
            {/*    <li className="comics__item">*/}
            {/*        <a href="#">*/}
            {/*            <img src={xMen} alt="x-men" className="comics__item-img"/>*/}
            {/*            <div className="comics__item-name">X-Men: Days of Future Past</div>*/}
            {/*            <div className="comics__item-price">NOT AVAILABLE</div>*/}
            {/*        </a>*/}
            {/*    </li>*/}
            {/*</ul>*/}
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
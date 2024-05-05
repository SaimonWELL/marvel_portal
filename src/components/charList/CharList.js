import './charList.scss';
import { useEffect, useRef, useState} from "react";

import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import PropTypes from "prop-types";

const  CharList = (props) =>{

    const [charList, setCharList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);


    const marvelService = new MarvelService();

    useEffect(() => {
        onRequest()
    }, []);



    const onRequest = (offset) => {
        onCharListLoading();
        marvelService.getAllCharacters(offset)
            .then(onCharListLoaded)
            .catch(onError)
    }

    const onCharListLoading = () => {
        setNewItemLoading(true)
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length<9){
            ended = true;
        }

        setCharList([...charList,...newCharList]);
        setLoading(false);
        setNewItemLoading(false);
        setOffset(offset => offset+9)
        setCharEnded(ended)

    }

    const onError = () => {
        this.setState({
            loading:false,
            error:true
        })
        setLoading(false)
        setError(true);
    }

    const itemsRef = useRef([])


    const focusOnItem = (id) =>{
        itemsRef.current.forEach(item=> item.classList.remove('char__item_selected'))
        itemsRef.current[id].classList.add('char__item_selected');
        itemsRef.current[id].focus();
    }

    function renderItems(arr) {
        const items = arr.map((item,i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }

            return(
                <li
                    className='char__item'
                    key={item.id}
                    ref={el=>itemsRef.current[i]=el}
                    onClick={()=> {
                        props.onCharSelected(item.id);
                        focusOnItem(i);
                    }}
                >
                    <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                    <div className='char__name'>{item.name}</div>
                </li>
            )
        });

        return(
            <ul className='char__grid'>
                {items}
            </ul>
        )
    }



    const items = renderItems(charList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? items : null;
    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {content}
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display': charEnded ? 'none' : "block"}}
                onClick={()=> onRequest(offset)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )

}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}
export default CharList;
import './charInfo.scss';

import { useEffect, useState} from "react";
import PropTypes from "prop-types";
import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import Skeleton from "../skeleton/Skeleton";
import CharacterSearch from "../сharacterSearch/CharacterSearch";

const CharInfo =(props)=> {

    const [char, setChar] = useState(null)


    const {loading,error,getCharacter,clearError} = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [props.charId]);


   const updateChar = () =>{
        const {charId} = props;
        if(!charId){
            return;
        }
        clearError()
        getCharacter(charId)
            .then(onCharLoaded)

    }

    const onCharLoaded = (char) => {
       setChar(char);
    }

    const skeleton = char || loading || error ? null : <Skeleton/>;
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/>: null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
            <CharacterSearch/>
        </div>
    )

}

const View = ({char}) =>{
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    let restrictionsComics

    if (comics.length>1){
         restrictionsComics = comics.slice(10)
    }else{
         restrictionsComics = 'Comics are Not Found'
    }

    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'unset'};
    }


    return(
        <div className="char__infoBlock">
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {Array.isArray(restrictionsComics) ? restrictionsComics.map((item, i) =>{

                    return (
                        <li key={i} className="char__comics-item">
                            {item.name}
                        </li>
                    )
                }): restrictionsComics

                }


            </ul>
        </div>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;
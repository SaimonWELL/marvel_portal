import {useState} from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';
import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";


const  App = () =>{

    const [selectedChar, setSelectedChar] = useState(null);



    const onCharSelected = (id) =>{
        setSelectedChar(id)
    }


    return (
        <div className="app">
            <AppHeader/>
            <main>
                {/*<ErrorBoundary>*/}
                {/*    <RandomChar/>*/}
                {/*</ErrorBoundary>*/}
                {/*<div className="char__content">*/}
                    {/*<ErrorBoundary>*/}
                    {/*    <CharList onCharSelected = {onCharSelected}/>*/}
                    {/*</ErrorBoundary>*/}
                    {/*<ErrorBoundary>*/}
                    {/*    <CharInfo charId={selectedChar}/>*/}
                    {/*</ErrorBoundary>*/}
                {/*</div>*/}
                <ErrorBoundary>
                    <AppBanner/>
                    <ComicsList />
                </ErrorBoundary>
                {/*<img className="bg-decoration" src={decoration} alt="vision"/>*/}
            </main>
        </div>
    )

}

export default App;
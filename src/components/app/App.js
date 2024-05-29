import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import {MainPage, ComicsPage, Page404, SingleComicPage, Layout} from '../../pages'
import AppHeader from "../appHeader/AppHeader";
import SingleCharPage from "../../pages/singleCharPage/SingleCharPage";
import SinglePage from "../../pages/SinglePage";


const  App = () =>{


    return (
        <Router basename="/">
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="comics" element={<Layout/>}>
                            <Route index element={<ComicsPage/>}/>
                            <Route path={':id'} element={<SinglePage Component={SingleComicPage} dataType="comic"/>}/>
                        </Route>
                        <Route path="characters" element={<Layout/>}>
                            <Route index path={':id'} element={<SinglePage Component={SingleCharPage} dataType="character"/>}/>
                        </Route>

                        <Route path="*" element={<Page404/>}></Route>
                    </Routes>
                </main>
            </div>
        </Router>
    )

}

export default App;
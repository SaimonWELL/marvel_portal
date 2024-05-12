import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import {MainPage, ComicsPage, Page404, SingleComicPage, Layout} from '../../pages'
import AppHeader from "../appHeader/AppHeader";


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
                            <Route path={':comicId'} element={<SingleComicPage/>}/>
                        </Route>

                        <Route path="*" element={<Page404/>}></Route>
                    </Routes>
                </main>
            </div>
        </Router>
    )

}

export default App;
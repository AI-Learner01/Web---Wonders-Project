import { BrowserRouter, Routes, Route } from "react-router-dom";
import Destinations from "./Destinations";
import DestinationDetailes from "./DestinationDetailes";
import ScrollToTop from "../../components/DestinationDetailPageComponents/ScrollToTop";

import React from 'react';

const DestApp = () => {
    return (
        <BrowserRouter>
          <ScrollToTop/>
            <Routes>
                <Route path="/destinations" element={<Destinations />} />

                <Route
                    path="/destinations/:slug"
                    element={<DestinationDetailes />}
                />

            </Routes>
        </BrowserRouter>
    )
}

export default DestApp

// import React from 'react'
// import DestApp from './pages/Destination-pages/DestApp'

// const App = () => {
//   return (
//     <div>
//       <DestApp/>
//     </div>
//   )
// }

// export default App

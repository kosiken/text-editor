
import {
  Routes,
  Route,
} from "react-router-dom";
import Box from "../design-system/components/Box";

import NewPost from "./posts/NewPost";



function EntryPoint() {

  return (
    <Box>
    <Routes>
      <Route path="/" element={< NewPost />} />

    </Routes>
    </Box>
  )
}


export default EntryPoint;

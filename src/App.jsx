
import Stack from "./pages/Stack "
import PerspectiveBoxDrag from "./pages/PerspectiveBoxDrag";
import CursorTrack from "./pages/CursorTrack";
import  { Album } from "./pages/Gallery";
import Fall from "./pages/Fall";
import InteractuveCircle from "./pages/InteractuveCircle";
function App() {
  return (
    <>
      {/* <Stack/> */}
      <PerspectiveBoxDrag />
      <CursorTrack />
      {/* <Album/> */}
      <Fall/>
      <InteractuveCircle/>
    </>
  )
}

export default App
import { Container } from "@chakra-ui/react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AtranWeightTable } from "./views/AtranWeightTable/AtranWeightTable";

function App() {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<Navigate to="/atran/dow" />} />
        <Route path="/atran/dow" element={<AtranWeightTable />} />
      </Routes>
    </Container>
  );
}

export default App;

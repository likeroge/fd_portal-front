import { Container } from "@chakra-ui/react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { AddAtranAcftView } from "./views/AddAtranAcftView/AddAtranAcftView";
import { AtranWeightTable } from "./views/AtranWeightTable/AtranWeightTable";
import { DlaMessagesView } from "./views/DlaMessagesView/DlaMessagesView";
import { OFPparserView } from "./views/OFPparserView/OFPparserView";

function App() {
  return (
    <Container>
      <Navigation />
      <Routes>
        <Route path="/" element={<Navigate to="/atran/dow" />} />
        <Route path="/atran/dow" element={<AtranWeightTable />} />
        <Route path="/acft" element={<AddAtranAcftView />} />
        <Route path="/ofp/get-airports" element={<OFPparserView />} />
        <Route path="/ofp/get-dla" element={<DlaMessagesView />} />
      </Routes>
    </Container>
  );
}

export default App;

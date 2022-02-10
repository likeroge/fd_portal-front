import {
  Button,
  Container,
  Divider,
  Heading,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [ofpText, setOfpText] = useState("");

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get("http://localhost:5001/users/test");
      console.log(data);
    }
    fetchData();
  }, []);

  const postHandler = async () => {
    const { data } = await axios.post("http://localhost:5001/ofp", {
      msg: ofpText,
    });
    setOfpText("");
    console.log(data);
  };

  return (
    <Container>
      <Heading marginBottom={5}>Front App</Heading>
      <Textarea
        value={ofpText}
        onChange={(e) => setOfpText(e.target.value)}
        placeholder="Here is a sample placeholder"
      />

      <Button mt={5} colorScheme="orange" onClick={postHandler}>
        POST request
      </Button>
    </Container>
  );
}

export default App;

import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  List,
  ListItem,
  Spacer,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";

export const DlaMessagesView = () => {
  const [fplText, setFplText] = useState("");
  const [dlaList, setDlaList] = useState([]);

  const getRawFplString = (text) => {
    const rawFplStr = text
      .match(/FPL.+(?=-)/)[0]
      .split("-")
      .map((el) => (el === "FPL" ? "DLA" : el));

    // const depWithEtd = text.match(/-(\w+\d\+\n)/)[1].slice(0, 8);
    const depWithEtd = text.match(/-\w\w\w\w\d\d\d\d/)[0].slice(1, 9);
    const arr = text.match(/-\w\w\w\w\d\d\d\d\s\w\w\w\w/)[0].slice(1, 5);
    const dof = text.match(/DOF\/\d+/)[0];

    let resultString = `(${rawFplStr[0]}-${rawFplStr[1]}-${depWithEtd}-${arr}-${dof})`;

    return resultString;
  };

  const parseFplToDlaMessage = (fplText) => {
    const rawFplStr = getRawFplString(fplText);
    setDlaList((prev) => {
      let newState = [...prev, rawFplStr];
      return newState;
    });
    console.log(dlaList);
  };

  return (
    <Box>
      <Heading mb="4" size="xl" align="center">
        DLA messages
      </Heading>
      <Textarea
        onChange={(e) => setFplText(e.target.value)}
        value={fplText}
        rows="10"
        size="sm"
        placeholder="Вставьте текст OFP или FPL"
      />
      <Flex mt="4" mb="4">
        <Spacer />
        <Button
          onClick={() => parseFplToDlaMessage(fplText)}
          colorScheme="green"
          w="40"
        >
          Сформировать
        </Button>
        <Spacer />
        <Button onClick={() => setFplText("")} colorScheme="red" w="40">
          Стереть
        </Button>
        <Spacer />
      </Flex>
      <List spacing={5} mt="8">
        {dlaList.map((el, idx) => (
          <ListItem key={idx}>
            <Flex>
              <Text>{el}</Text>
            </Flex>
            <Divider />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

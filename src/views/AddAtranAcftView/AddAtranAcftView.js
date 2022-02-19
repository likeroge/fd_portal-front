import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spacer,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { config } from "../../config/config";

export const AddAtranAcftView = () => {
  const [tail, setTail] = useState("");
  const [water, setWater] = useState("");
  const [oew, setOew] = useState("");
  const [fak, setFak] = useState("");

  const onFindAcft = async () => {
    const { data } = await axios.get(config.findAcftUrl, {
      params: {
        tail,
      },
    });
    if (!data.tail) {
      setOew(data.oew);
      setWater(data.water);
      setFak(data.fak);
    } else {
      setOew(
        data.oew + 2 * config.atran.atranCrewWeight + data.fak + data.water
      );
      setWater(data.water);
      setFak(data.fak);
    }
  };

  const onAddAcft = async () => {
    const newAcft = {
      tail,
      water,
      oew,
      fak,
    };
    const { data } = await axios.post(config.addAcftDataUrl, { newAcft });
    console.log(data);
  };

  return (
    <Box>
      <Heading mb="4" size="xl" align="center">
        Данные ВС
      </Heading>
      <FormControl>
        <FormLabel>Бортовой номер ВС</FormLabel>
        <Input mb="4" onChange={(e) => setTail(e.target.value)} value={tail} />
        <Flex>
          <Button onClick={onFindAcft} w="40" colorScheme="blue" mb="4">
            Найти
          </Button>
          <Spacer />
          <Button onClick={onAddAcft} w="40" colorScheme="whatsapp" mb="4">
            Внести данные
          </Button>
        </Flex>

        <Divider mb="4" />

        <FormLabel>Вода</FormLabel>
        <Input onChange={(e) => setWater(e.target.value)} value={water} />
        <FormLabel>DOW</FormLabel>
        <Input onChange={(e) => setOew(e.target.value)} value={oew} />
        <FormLabel>Текущий FAK</FormLabel>
        <Input onChange={(e) => setFak(e.target.value)} value={fak} />
      </FormControl>
    </Box>
  );
};

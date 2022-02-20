import {
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  Input,
  Spacer,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";

export const OFPparserView = () => {
  const [ofpText, setOfpText] = useState("");
  const [icaoCodes, setIcaoCodes] = useState("");

  const getAltnIcaoArray = (text) => {
    const rawAltnArray = [...text.matchAll(/AL\d\s\s+\w+\/\w+/g)];
    const rawIcaoCodesArray = rawAltnArray.map((rawAltn) => rawAltn[0]);
    const altnIcaoCodesArray = rawIcaoCodesArray.map((el) => el.slice(12, 17));
    return altnIcaoCodesArray;
  };

  const getEtpAirportsArray = (text) => {
    let etpArray = [];
    try {
      const rawArray = [...text.matchAll(/ETP\d\s+\w+\/\w+/g)].map(
        (rawAltn) => rawAltn[0]
      );
      rawArray
        .map((el) => el.match(/\w+\/\w+/)[0])
        .map((el) => el.split("/"))
        .map((el) => etpArray.push(...el));
      return Array.from(new Set(etpArray));
    } catch (error) {
      return [];
    }
  };

  const getDepArrAirportArray = (text) => {
    const rawDepArray = text.match(/RTE\s+\w+\/\w+\s+\w+\/\w+/)[0];
    const depAirport = rawDepArray.slice(4, 8);
    const arrAirport = rawDepArray.slice(18, 22);
    return [depAirport, arrAirport];
  };

  const getEraAirport = (text) => {
    try {
      const rawEraArray = text.match(/NOTE: ERA\s\w\w\w\w/)[0];
      return rawEraArray.slice(10, 14);
    } catch (err) {
      return "";
    }
  };

  const parseOFP = (ofpText) => {
    let resultArray = [];
    console.log("Parsing process");
    const altnArray = getAltnIcaoArray(ofpText);
    const etpArray = getEtpAirportsArray(ofpText);
    const depAirport = getDepArrAirportArray(ofpText)[0];
    const arrAirport = getDepArrAirportArray(ofpText)[1];
    const eraAirport = getEraAirport(ofpText);

    console.log(etpArray);

    resultArray.push(
      ...altnArray,
      ...etpArray,
      depAirport,
      arrAirport,
      eraAirport
    );
    resultArray = Array.from(new Set(resultArray));
    setIcaoCodes("SA FT FC " + resultArray.join(" "));
    // console.log(resultArray);
  };

  const onClearButton = () => {
    setOfpText("");
    setIcaoCodes("");
  };

  return (
    <Box>
      <Heading mb="4" size="xl" align="center">
        ICAO коды из OFP
      </Heading>
      <Textarea
        onChange={(e) => setOfpText(e.target.value)}
        value={ofpText}
        rows="15"
        size="sm"
        placeholder="Вставьте текст OFP"
      />
      <Flex mt="4" mb="4">
        <Button onClick={() => parseOFP(ofpText)} colorScheme="blue" w="40">
          Сформировать
        </Button>
        <Spacer />
        <Button onClick={onClearButton} colorScheme="red" w="40">
          Стереть
        </Button>
      </Flex>
      <FormLabel>ICAO коды</FormLabel>
      <Input value={icaoCodes} onChange={(e) => setIcaoCodes(e.target.value)} />
    </Box>
  );
};

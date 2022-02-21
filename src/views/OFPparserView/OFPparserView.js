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

  const getTkofAltn = (text) => {
    try {
      //   const rawDepAltnArray = [...text.match(/TKFAL\s+\w\w\w\/\w\w\w\w/)];
      const rawDepAltnArray = [...text.match(/TKFAL\s+(.*)\n+/)][1].slice(4);
      if (rawDepAltnArray[0] === "." && rawDepAltnArray[1] === ".") {
        return "";
      }
      return rawDepAltnArray;
    } catch (err) {
      return "";
    }
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
    const rawDepArray = text
      .match(/RTE\s+\w+\/\w+\s+\w+\/\w+/)[0]
      .matchAll(/\w\w\w\w/g);

    const depArrArray = [...rawDepArray].map((el) => el[0]);
    // const depAirport = rawDepArray.slice(4, 8);
    // const arrAirport = rawDepArray.slice(18, 22);
    // return [depAirport, arrAirport];
    return depArrArray;
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
    const depAltnAirport = getTkofAltn(ofpText);

    // console.log(getDepArrAirportArray(ofpText));

    resultArray.push(
      ...altnArray,
      ...etpArray,
      depAirport,
      arrAirport,
      eraAirport,
      depAltnAirport
    );
    // resultArray = Array.from(new Set(resultArray));
    // setIcaoCodes("SA FT FC " + resultArray.join(" "));
    setIcaoCodes((prev) => {
      let newState = "";
      if (prev.length !== 0) {
        newState = prev.slice(9);
        newState = newState.split(" ");
        newState = [...newState, ...resultArray];
        newState = Array.from(new Set(newState));
        newState = newState.filter((el) => el !== "");
        newState = "SA FT FC " + newState.join(" ");
        navigator.clipboard.writeText(newState);
        return newState;
      } else {
        resultArray = Array.from(new Set(resultArray));
        newState = resultArray.filter((el) => el !== "");
        newState = "SA FT FC " + resultArray.join(" ");
        navigator.clipboard.writeText(newState);
        return newState;
      }
    });
  };

  const onClearButton = () => {
    setOfpText("");
    setIcaoCodes("");
  };

  const addOfp = () => {
    setOfpText("");
    // parseOFP(ofpText);
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

        <Button onClick={addOfp} colorScheme="green" w="40">
          Добавить OFP
        </Button>
        <Spacer />

        <Button onClick={onClearButton} colorScheme="red" w="40">
          Новый запрос
        </Button>
      </Flex>
      <FormLabel>ICAO коды</FormLabel>
      <Input value={icaoCodes} onChange={(e) => setIcaoCodes(e.target.value)} />
    </Box>
  );
};

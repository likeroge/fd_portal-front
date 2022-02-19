import {
  Box,
  Heading,
  Input,
  Select,
  Switch,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { config } from "../../config/config";

export const AtranWeightTable = () => {
  const [state, setState] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const refreshField = (idx, e) => {
    console.log(e.target.type);
    let crewWeight = (state[idx].crew ?? 2) * 100;
    // let waterWeight = state[idx].waterWeight ?? 0;
    let waterWeight = state[idx].water ?? 0;
    let fakWeight = state[idx].fak;
    let is_water_on_board = state[idx].is_water_on_board;

    if (e.target.type === "select-one") {
      crewWeight = config.atran.atranCrewWeight * e.target.value;
      console.log(crewWeight);
    }
    if (e.target.type === "checkbox") {
      if (e.target.checked === true) {
        waterWeight = state[idx].water;
        is_water_on_board = true;
      } else {
        // waterWeight = 0;
        is_water_on_board = false;
      }
    }
    if (e.target.type === "number") {
      fakWeight = +e.target.value;
    }
    setState((prev) => {
      const newState = prev;
      // newState[idx].waterWeight = waterWeight;
      newState[idx].crew = crewWeight / 100;
      newState[idx].fak = fakWeight;
      newState[idx].is_water_on_board = is_water_on_board;
      console.log(waterWeight);
      if (newState[idx].is_water_on_board) {
        // newState[idx].water = waterWeight;
        newState[idx].dof =
          newState[idx].oew + crewWeight + fakWeight + waterWeight;
      } else {
        // newState[idx].water = 0;
        newState[idx].dof = newState[idx].oew + crewWeight + fakWeight;
      }

      return [...newState];
    });
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      console.log(state);
      const { data } = await axios.post(config.saveAtranAcftState, {
        data: state,
      });
      console.log(data);
    }, 3000);
    return () => clearTimeout(delayDebounceFn);
  }, [state]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(config.atran.all_actf_dow);
      // data.forEach((el) => (el.fak = 0));
      setState(data);
    }
    fetchData();
  }, []);

  return (
    <Box>
      <Heading mb="4" size="xl" align="center">
        Расчет DOW
      </Heading>
      <Table>
        {/* <TableCaption>Расчет DOW</TableCaption> */}
        <Thead>
          <Tr>
            <Th>Aircraft</Th>
            <Th>TPOB</Th>
            <Th>Water</Th>
            <Th>FAK</Th>
            <Th>DOW</Th>
          </Tr>
        </Thead>

        <Tbody>
          {state.map((acft, idx) => (
            <Tr key={idx}>
              <Td fontSize="xl">{acft.tail}</Td>
              <Td>
                <Select
                  defaultValue={acft.crew}
                  onChange={(e) => {
                    refreshField(idx, e);
                  }}
                  width={20}
                  size="md"
                >
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </Select>
              </Td>
              <Td>
                <Switch
                  isChecked={acft.is_water_on_board}
                  onChange={(e) => refreshField(idx, e)}
                  size="lg"
                />
              </Td>
              <Td>
                <Input
                  //   value={acft.fak}
                  defaultValue={acft.fak}
                  width="65px"
                  type="number"
                  onChange={(e) => {
                    refreshField(idx, e);
                  }}
                />
              </Td>
              <Td>{acft.dof}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

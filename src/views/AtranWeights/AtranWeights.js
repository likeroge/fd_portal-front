import {
  Box,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Switch,
} from "@chakra-ui/react";

export const AtranWeights = () => {
  return (
    <Box>
      <Heading mb="4" align="center">
        Atran DOW
      </Heading>
      <FormControl>
        <FormLabel>Выберите ВС</FormLabel>
        <Select mb="4">
          <option value="VPBFR">VPBFR</option>
        </Select>
        <FormLabel>Количество экипажа</FormLabel>
        <Select mb="4">
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </Select>
        <FormLabel htmlFor="water">Water onboard</FormLabel>
        <Switch size="lg" mb="4" id="water" />
        <FormLabel>Вес FKT</FormLabel>
        <Input mb="4" type="number" />
        <Heading as="h6" size="lg">
          DOW: 33333
        </Heading>
      </FormControl>
    </Box>
  );
};

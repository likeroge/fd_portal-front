import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const Navigation = () => {
  const navigate = useNavigate();
  return (
    <Tabs size="md" variant="enclosed" mb="4">
      <TabList>
        <Tab onClick={() => navigate("/atran/dow")}>АТРАН DOW</Tab>
        <Tab onClick={() => navigate("/acft")}>Данные ВС</Tab>
      </TabList>
    </Tabs>

    // <Breadcrumb separator="-" bgColor="blue.300" >
    //   <BreadcrumbItem>
    //     <BreadcrumbLink href="#">Home</BreadcrumbLink>
    //   </BreadcrumbItem>

    //   <BreadcrumbItem>
    //     <BreadcrumbLink href="#">About</BreadcrumbLink>
    //   </BreadcrumbItem>

    //   <BreadcrumbItem isCurrentPage>
    //     <BreadcrumbLink href="#">Contact</BreadcrumbLink>
    //   </BreadcrumbItem>
    // </Breadcrumb>
  );
};

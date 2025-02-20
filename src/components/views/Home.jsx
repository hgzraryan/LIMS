import React from "react";
import { Box } from "@mui/material";
import labImage from "../../dist/img/med-lab.jpg";
import VerticalBarChart from "../VerticalBarChart";
import InfoTable from "../InfoTable";
import { useSelector } from "react-redux";
import { selectPatientsCount } from "../../redux/features/patients/patientsCountSlice";
import { selectDiagnosticsCount } from "../../redux/features/diagnostics/diagnosticsCountSlice";
import { selectUsersCount } from "../../redux/features/users/usersCountSlice";
import { selectResearchListCount } from "../../redux/features/researches/researchListCountSlice";
import { selectDoctorCount } from "../../redux/features/doctor/doctorCountSlice";
import StackedBarChart from "../StackedBarChart";
import { CustomActiveShapePieChart } from "../CustomActiveShapePieChart";

const Home = () => {
  const doctorsCount = useSelector(selectDoctorCount);
  const patientsCount = useSelector(selectPatientsCount);
  const usersCount = useSelector(selectUsersCount);
  const diagnosticsCount = useSelector(selectDiagnosticsCount);
  const researchListCount = useSelector(selectResearchListCount);

  return (
    <Box p="1px">
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        justifyContent="center"
        alignItems="stretch"
        flexWrap="wrap"
        gap="10px"
        ml={{ xs: 0, md: "10px" }}
        mt={{ xs: "10px", md: 0 }}
      >
        <Box flex="1" maxWidth={{ xs: "100%", md: "25%" }}>
          <img
            src={labImage}
            alt="labImg"
            style={{ width: "100%", height: "auto" }}
          />
          <Box
            p="20px"
            bgcolor="#0a2f4c"
            color="#fff"
            fontSize={{ xs: "20px", md: "35px" }}
            fontStyle="italic"
            mb="10px"
          >
            <p>{patientsCount}</p>
            <p style={{ fontSize: "18px" }}>Գրանցված այցելուներ</p>
          </Box>
          <Box
            p="20px"
            bgcolor="#0a2f4c"
            color="#fff"
            fontSize={{ xs: "20px", md: "35px" }}
            fontStyle="italic"
            mb="10px"
          >
            <p>{diagnosticsCount}</p>
            <p style={{ fontSize: "18px" }}> Կատարված ախտորոշումներ</p>
          </Box>
          <Box
            p="20px"
            bgcolor="#0a2f4c"
            color="#fff"
            fontSize={{ xs: "20px", md: "35px" }}
            fontStyle="italic"
            mb="10px"
          >
            <p>{doctorsCount}</p>
            <p style={{ fontSize: "18px" }}>Գրանցված բժիշկներ</p>
          </Box>
          <Box
            p="20px"
            bgcolor="#0a2f4c"
            color="#fff"
            fontSize={{ xs: "20px", md: "35px" }}
            fontStyle="italic"
            mb="10px"
          >
            <p>{researchListCount}</p>
            <p style={{ fontSize: "18px" }}>Հետազոտություններ</p>
          </Box>
          <Box
            p="20px"
            bgcolor="#0a2f4c"
            color="#fff"
            fontSize={{ xs: "20px", md: "35px" }}
            fontStyle="italic"
            mb="10px"
          >
            <p>{usersCount}</p>
            <p style={{ fontSize: "18px" }}>Գրանցված աշխատակիցներ</p>
          </Box>
          {/* Add similar boxes for diagnosticsCount, doctorsCount, researchListCount, usersCount */}
        </Box>
        <Box flex="1" maxWidth={{ xs: "100%", md: "60%" }}>
          <Box mb="10px" backgroundColor="#EDF7F7">
            <StackedBarChart />
          </Box>
          <Box
            display={{ xs: "block", md: "flex" }}
            justifyContent="space-between"
            overflow="hidden"
          >
            <Box
              mr={{ xs: 0, md: "5px" }}
              mb={{ xs: "10px", md: 0 }}
              backgroundColor="#EDF7F7"
              flex="1"
              maxWidth="400px"
            >
              <InfoTable />
            </Box>
            <Box backgroundColor="#EDF7F7" flex="1">
              <VerticalBarChart />
            </Box>
          </Box>
        </Box>
        <Box flex="1" maxWidth={{ xs: "100%", md: "25%" }} mb={{ xs: "10px", md: 0 }}>
          <CustomActiveShapePieChart />
          <VerticalBarChart />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
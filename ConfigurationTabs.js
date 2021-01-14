import React from "react";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import "../../../css/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { ThemeProvider } from "@material-ui/styles";
import TabPanel, { theme, a11yProps } from "../TabPages/TabPanel/TabPanel.js";
import Configuration from "./Configuration";

const ConfigurationTabs = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor='primary'
        textColor='primary'
        variant='scrollable'
        scrollButtons='auto'
        aria-label='scrollable auto tabs example'
        TabIndicatorProps={{
          style: {
            background: "#30c7ed",
          },
        }}
      >
        <Tab label='Landing Page' key='Landing Page' {...a11yProps(0)} />
      </Tabs>
      <TabPanel value={value} key='users' index={0}>
        <Configuration />
      </TabPanel>
    </ThemeProvider>
  );
};

export default ConfigurationTabs;

import React, { useEffect, useState, useContext } from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import "./CommonComponent.css";
import TabPages from "../../../Common/TabPages/TabPages";
import FormRendererIO from "../../../formIOBuilder/FormRendererIO";
import FormBuilderIO from "../../../formIOBuilder/FormBuilderIO";
import ApplicationMappingTable from "../../../applicationMapping/ApplicationMappingTable";
import BPMNModeler from "../../../bpmnModeler/bpmnModeler";
import Todo from "../Content/Todo/Todo";
import * as APIConstants from "../../../Common/Constants/APIConstants";
import Reports from "../../../Reports/Reports";
import TaskTable from "../../../taskTable/TaskTable";
import DocumentSearch from "../../../documentSearch/DocumentSearch";
import UserTabs from "../../../userManagement/UserTabs";
import TaskList from "../../../taskTable/TaskList";
import alert from "sweetalert";
import MenuItemsContext from "../../../Common/Contexts/MenuItemsContext";
import UnauthorizedAccess from "../../../Common/Access/UnauthorizedAccess";
import MessageList from "../../../Common/Messages/MessageList";
import Hierarchy from "../../../Common/UI/Hierarchy/Hierarchy";
import ConfigurationTabs from "../../../Common/Configuration/ConfigurationTabs";
// import Hierarchy from '../../../Common/UI/Hierarchy/DummyHierarchy';

const CommonComponent = () => {
  const appList = useContext(MenuItemsContext);

  // const [appList, setAppList] = useState([]);

  const urlMapping = [];

  // const requestOptions = {
  //     method: "GET",
  //     credentials: "include",
  // };

  // useEffect(() => {
  //     // fetch('https://bpmnapps.firebaseio.com/appList.json')
  //     fetch(localStorage.getItem("apiURL") + '/GRCNextBPMN/getAppDefinitions', requestOptions)
  //         .then(results => results.json())
  //         .then(response => {
  //             setAppList(response.data);
  //         })
  //         .catch(
  //             alert({
  //                 text: "Server Down Check with Network Administrator",
  //                 icon: "error",
  //             })
  //         );
  // }, []);

  function getAppList() {
    if (appList) {
      for (var i = 0; i < appList.length; i++) {
        var applicationObject = appList[i];
        for (var j = 0; j < applicationObject.data.length; j++) {
          urlMapping.push(applicationObject.data[j]);
        }
      }
    }
  }

  return (
    <div className='common-component'>
      {getAppList()}
      <Switch>
        <Route exact path='/' component={Dashboard} />
        {urlMapping.map((item) => (
          <Route path={"/" + item.appDefinitionKey} key={item.appDefinitionKey}>
            <TabPages
              header={item.name}
              appKey={item.appDefinitionKey}
              tabsRequired
            />
          </Route>
        ))}
        <Route path='/process-builder'>
          <TabPages header='Process Builder'>
            <BPMNModeler />
          </TabPages>
        </Route>
        <Route path='/application-manager'>
          <TabPages header='Application Mapping'>
            <ApplicationMappingTable />
          </TabPages>
        </Route>
        <Route path='/form-builder'>
          <TabPages header='Form Builder'>
            <FormBuilderIO />
          </TabPages>
        </Route>
        <Route path='/configuration'>
          <TabPages header='Configuration'>
            <ConfigurationTabs />
          </TabPages>
        </Route>
        <Route path='/form-renderer'>
          <TabPages header='Form Renderer'>
            <FormRendererIO />
          </TabPages>
        </Route>
        <Route path='/task-list'>
          <TabPages header='Task List'>
            {/* <TaskTable /> */}
            <TaskList />
          </TabPages>
        </Route>
        <Route path='/document-search'>
          <TabPages header='Search Document'>
            <DocumentSearch />
          </TabPages>
        </Route>
        <Route path='/user-management'>
          <TabPages header='User Management'>
            <UserTabs />
          </TabPages>
        </Route>
        <Route path='/no-access'>
          <TabPages header='Unauthorized Access'>
            <UnauthorizedAccess />
          </TabPages>
        </Route>
        <Route path='/reporting'>
          <TabPages header='Reporting'>
            <Reports />
          </TabPages>
        </Route>
        <Route path='/messages'>
          <TabPages header='Message List'>
            <MessageList />
          </TabPages>
        </Route>
        <Route path='/hierarchy'>
          <TabPages header='Hierarchy'>
            <Hierarchy />
          </TabPages>
        </Route>
        {/* All hard coded pages below */}
        <Route path='/op-risk'>
          <Todo header='Operational Risk' />
        </Route>
        <Route path='/business'>
          {/* <TabPages header="Business Continuity Management" /> */}
          <Todo header='Business Continuity Management' />
        </Route>
        <Route path='/complianceM'>
          <Todo header='Compliance Management' />
        </Route>
        <Route path='/fraud'>
          <Todo header='Fraud Risk Management' />
        </Route>
        <Route path='/infosec'>
          <Todo header='Information Security Risk Management' />
        </Route>
        <Route path='/audit'>
          <Todo header='Audit Management' />
        </Route>
        <Route path='/governance'>
          <Todo header='Governance' />
        </Route>
      </Switch>
    </div>
  );
};

export default CommonComponent;

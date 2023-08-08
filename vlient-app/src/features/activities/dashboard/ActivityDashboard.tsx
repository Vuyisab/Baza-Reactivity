import React, { useEffect } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoaderComponent from "../../../app/layout/Loader";

const ActivityDashboard = () => {
  const { activityStore } = useStore();
  const { activityRegistry, loadActivities } = activityStore;

  useEffect(() => {
    if (activityRegistry.size <= 1) loadActivities();
  }, [loadActivities, activityRegistry.size]);

  if (activityStore.loadingInitial)
    return <LoaderComponent content="Loading app" />;

  return (
    <Grid>
      <GridColumn width="10">
        <ActivityList />
      </GridColumn>
      <GridColumn width="6">
        <h2>Activity filters</h2>
      </GridColumn>
    </Grid>
  );
};

export default observer(ActivityDashboard);

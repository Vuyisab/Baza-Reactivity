import React from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

interface Props {
  activities: Activity[];
  createOrEditActivity: (activity: Activity) => void;
  deleteActivity: (id: string) => void;
  submitting: boolean;
}

const ActivityDashboard = ({
  activities,
  createOrEditActivity,
  deleteActivity,
  submitting,
}: Props) => {
  const { activityStore } = useStore();
  const { selectedActivity, editMode } = activityStore;

  return (
    <Grid>
      <GridColumn width="10">
        <ActivityList
          activities={activities}
          deleteActivity={deleteActivity}
          submitting={submitting}
        />
      </GridColumn>
      <GridColumn width="6">
        {selectedActivity && <ActivityDetails />}
        {editMode && (
          <ActivityForm
            createOrEditActivity={createOrEditActivity}
            submitting={submitting}
          />
        )}
      </GridColumn>
    </Grid>
  );
};

export default observer(ActivityDashboard);

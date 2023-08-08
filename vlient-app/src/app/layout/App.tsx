import React, { Fragment, useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";
import LoaderComponent from "./Loader";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

function App() {
  const { activityStore } = useStore();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setselectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);
  const [submitting, setsubmitting] = useState(false);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  const handleCreateOrEditActivity = (activity: Activity) => {
    setsubmitting(true);
    if (activity.id) {
      agent.Activities.update(activity).then((response) => {
        setActivities([
          ...activities.filter((x) => x.id !== activity.id),
          activity,
        ]);
        setselectedActivity(activity);
        setEditMode(false);
        setsubmitting(false);
      });
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then((response) => {
        setActivities([...activities, activity]);
        setselectedActivity(activity);
        setEditMode(false);
        setsubmitting(false);
      });
    }
  };

  const handleDeleteActivity = (id: string) => {
    setsubmitting(true);
    agent.Activities.delete(id).then((response) => {
      setActivities([...activities.filter((x) => x.id !== id)]);
      setsubmitting(false);
    });
  };

  if (activityStore.loadingInitial)
    return <LoaderComponent content="Loading app" />;
  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activityStore.activities}
          createOrEditActivity={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
        />
      </Container>
    </Fragment>
  );
}

export default observer(App);

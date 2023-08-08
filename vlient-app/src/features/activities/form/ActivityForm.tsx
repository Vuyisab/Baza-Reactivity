import React, { useState, ChangeEvent } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";

interface Props {
  createOrEditActivity: (activity: Activity) => void;
  submitting: boolean;
}

const ActivityForm = ({ createOrEditActivity, submitting }: Props) => {
  const { activityStore } = useStore();
  const { selectedActivity, closeForm } = activityStore;

  const initialState = selectedActivity ?? {
    id: "",
    title: "",
    description: "",
    category: "",
    city: "",
    country: "",
    date: "",
    venue: "",
  };

  const [activity, setActivity] = useState(initialState);

  const handleSubmit = () => {
    createOrEditActivity(activity);
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event?.target;
    setActivity({ ...activity, [name]: value });
  };
  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          placeholder="Titles"
          value={activity.title}
          name="title"
          onChange={handleInputChange}
        />
        <Form.TextArea
          placeholder="Description"
          value={activity.description}
          name="description"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Category"
          value={activity.category}
          name="category"
          onChange={handleInputChange}
        />
        <Form.Input
          type="date"
          placeholder="Date"
          value={activity.date}
          name="date"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="City"
          value={activity.city}
          name="city"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Venue"
          value={activity.venue}
          name="venue"
          onChange={handleInputChange}
        />
        <Button
          floated="right"
          positive
          type="submit"
          content="Submit"
          loading={submitting}
        />
        <Button
          floated="right"
          type="submit"
          content="Cancel"
          onClick={closeForm}
        />
      </Form>
    </Segment>
  );
};

export default ActivityForm;

import React, { useState, ChangeEvent } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
  closeForm: () => void;
  activity: Activity | undefined;
  createOrEditActivity: (activity: Activity) => void;
}

const ActivityForm = ({
  closeForm,
  activity: selectedActivity,
  createOrEditActivity,
}: Props) => {
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
        <Button floated="right" positive type="submit" content="Submit" />
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

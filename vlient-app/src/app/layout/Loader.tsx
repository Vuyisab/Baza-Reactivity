import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";
interface Props {
  inverted?: boolean;
  content?: string;
}

const LoaderComponent = ({ content = "Loading", inverted = true }: Props) => {
  return (
    <Dimmer active inverted={inverted}>
      <Loader content={content} />
    </Dimmer>
  );
};

export default LoaderComponent;

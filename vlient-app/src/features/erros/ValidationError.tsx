import { Message } from "semantic-ui-react";

interface Props {
  errors: any;
}

const ValidationError = ({ errors }: Props) => {
  return (
    <Message error>
      {errors && (
        <Message.List>
          {errors.map((err: string, index: any) => (
            <Message.Item key={index}>{err}</Message.Item>
          ))}
        </Message.List>
      )}
    </Message>
  );
};

export default ValidationError;

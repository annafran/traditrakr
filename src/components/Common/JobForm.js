import {
  Button,
  NumberInput,
  Container,
  TextInput,
  createStyles,
  Select,
} from "@mantine/core";

import { useForm } from "@mantine/form";

const useStyles = createStyles((theme) => ({
  control: {
    backgroundColor: "#D9480F",
    "&:hover": {
      backgroundColor: "#F08C00",
    },
    [theme.fn.smallerThan("xs")]: {
      flex: 1,
    },
  },
  input: {
    paddingBottom: "1rem;",
  },
}));

export const JobForm = ({ job, onJobSubmit, buttonText }) => {
  const { classes } = useStyles();

  const form = useForm({
    initialValues: job,
    validate: {
      clientEmail: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email",
    },
  });

  return (
    <Container mt="2rem">
      <form onSubmit={form.onSubmit(onJobSubmit)}>
        <div className="formGrid">
          <TextInput
            required
            label="Client name"
            {...form.getInputProps("clientName")}
            placeholder={job.clientName || "Client Name"}
            className={classes.input}
          />
          <TextInput
            required
            label="Job name"
            {...form.getInputProps("jobName")}
            placeholder="Job Name"
            className={classes.input}
          />
          <Select
            label="Job status"
            placeholder="Select a status"
            data={[
              { value: "scheduled", label: "scheduled" },
              { value: "active", label: "active" },
              { value: "invoicing", label: "invoicing" },
              { value: "priced", label: "priced" },
              { value: "completed", label: "completed" },
            ]}
            {...form.getInputProps("status")}
            className={classes.input}
          />
          <TextInput
            required
            label="Client phone number"
            {...form.getInputProps("clientPhoneNumber")}
            placeholder="Client Phone Number"
            className={classes.input}
          />
          <TextInput
            required
            label="Client email"
            {...form.getInputProps("clientEmail")}
            placeholder="Client email"
            className={classes.input}
          />
          <TextInput
            required
            label="Notes"
            {...form.getInputProps("notes")}
            placeholder="Notes"
            className={classes.input}
          />
        </div>
        <Button
          radius="xl"
          size="md"
          mt="1rem"
          type="submit"
          className={classes.control}
        >
          {buttonText}
        </Button>
      </form>
    </Container>
  );
};

import {
  Button,
  NumberInput,
  Box,
  TextInput,
  createStyles,
  Select,
} from "@mantine/core";

import { useForm } from "@mantine/form";

const useStyles = createStyles((theme) => ({
  control: {
    width: "80%",
    backgroundColor: "#345c72",
    "&:hover": {
      backgroundColor: "#95DCDE",
    },
    [theme.fn.smallerThan("xs")]: {
      flex: 1,
    },
  },
}));

export const JobForm = ({ job, onJobSubmit }) => {
  const { classes } = useStyles();

  const form = useForm({
    initialValues: job,
    validate: {
      clientEmail: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email",
    },
  });

  return (
    <Box mx="auto" mt="2rem">
      <form onSubmit={form.onSubmit(onJobSubmit)}>
        <div className="formGrid">
          <TextInput
            required
            label="Client name"
            {...form.getInputProps("clientName")}
            placeholder="Client Name"
          />
          <TextInput
            required
            label="Job name"
            {...form.getInputProps("jobName")}
            placeholder="Job Name"
          />
          <Select
            label="Job status"
            placeholder="Select a status"
            data={[
              { value: "scheduled", label: "Scheduled" },
              { value: "active", label: "Active" },
              { value: "invoicing", label: "Invoicing" },
              { value: "priced", label: "Priced" },
              { value: "completed", label: "Completed" },
            ]}
            {...form.getInputProps("status")}
          />
          <NumberInput
            required
            label="Client phone number"
            {...form.getInputProps("clientPhoneNumber")}
            placeholder="Client Phone Number"
          />
          <TextInput
            required
            label="Client email"
            {...form.getInputProps("clientEmail")}
            placeholder="Client email"
          />
          <TextInput
            required
            label="Notes"
            {...form.getInputProps("notes")}
            placeholder="Notes"
          />
        </div>
        <Box className="buttonContainer">
          <Button
            radius="xl"
            size="md"
            type="submit"
            className={`submitButton ${classes.control}`}
          >
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
};

import {
  Button,
  ActionIcon,
  Container,
  TextInput,
  createStyles,
  Select,
  Group,
  Box,
} from "@mantine/core";
import { randomId } from "@mantine/hooks";
import { Trash } from "tabler-icons-react";
import { useForm } from "@mantine/form";
import { FunctionComponent } from "react";
import { Job } from "../../models";

const useStyles = createStyles(() => ({
  input: {
    paddingBottom: "1rem;",
  },
}));

interface JobFormProps {
  job: Job;
  onJobSubmit: (values: Job) => void;
}

export const JobForm: FunctionComponent<JobFormProps> = ({
  job,
  onJobSubmit,
}) => {
  const { classes } = useStyles();

  const form = useForm({
    initialValues: job,
    validate: {
      clientEmail: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email",
    },
  });

  const fields = form.values.notes.map((item, index) => (
    <Group key={item.key} mt="xs">
      <TextInput
        placeholder="Notes"
        label="Notes"
        sx={{ flex: 1 }}
        {...form.getListInputProps("notes", index, "note")}
      />
      <ActionIcon
        color="red"
        variant="hover"
        onClick={() => form.removeListItem("notes", index)}
      >
        <Trash size={23} />
      </ActionIcon>
    </Group>
  ));

  return (
    <Container mt="2rem" size="xs">
      <form onSubmit={form.onSubmit(onJobSubmit)}>
        <div className="formGrid">
          <TextInput
            required
            maxLength={20}
            label="Client name"
            {...form.getInputProps("clientName")}
            placeholder={job.clientName || "Client Name"}
            className={classes.input}
          />
          <TextInput
            required
            label="Job name"
            maxLength={25}
            {...form.getInputProps("jobName")}
            placeholder="Job Name"
            className={classes.input}
          />
          <Select
            label="Job status"
            searchable
            required
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
            maxLength={10}
            label="Client mobile number"
            {...form.getInputProps("clientPhoneNumber")}
            placeholder="Client Mobile Number"
            className={classes.input}
          />
          <TextInput
            required
            label="Client email"
            {...form.getInputProps("clientEmail")}
            placeholder="Client email"
            className={classes.input}
          />
          <Box sx={{ maxWidth: "100%" }}>
            {fields}
            <Group position="left" mt="md">
              <Button
                color="orange"
                size="xs"
                onClick={() =>
                  form.addListItem("notes", {
                    note: "",
                    key: randomId(),
                  })
                }
              >
                Add note
              </Button>
            </Group>
          </Box>
        </div>
        <Button radius="xl" size="md" mt="1rem" type="submit" color="red">
          Add Job
        </Button>
      </form>
    </Container>
  );
};

import {
  Button,
  Group,
  NumberInput,
  Box,
  TextInput,
  Text,
  createStyles,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { randomId } from "@mantine/hooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "/JobForm.css";

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

const JobForm = ({ setActive }) => {
  const { classes } = useStyles();

  const form = useForm({
    initialValues: {
      clientName: "",
      clientPhoneNumber: null,
      notes: [],
      status: null,
      createdDate: Date.now(),
    },
  });

  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    setIsPending(true);
    setJobList(...jobList, ...values);
    setIsPending(false);

    navigate("/jobs");
  };

  return (
    <Box mx="auto" mt="2rem">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <div className="formGrid">
          <TextInput
            required
            label="Your first name"
            {...form.getInputProps("clientName")}
            placeholder="Client Name"
          />
          <NumberInput
            required
            label="client phone number"
            {...form.getInputProps("clientPhoneNumber")}
            placeholder="Client Phone Number"
          />

          <Box sx={{ maxWidth: "100%" }} className="notesGrid">
            {fields.length > 0 ? (
              <Group mb="xs">
                <Text weight={700} size="sm" sx={{ flex: 1 }}>
                  Notes
                </Text>
              </Group>
            ) : (
              <Text color="dimmed">You must add some notes</Text>
            )}
            {fields}
            <Group position="left" mt="md">
              <Button
                className={classes.addNote}
                onClick={() => form.addListItem("notes")}
              >
                Add note
              </Button>
            </Group>
          </Box>
        </div>
        <Box className="buttonContainer">
          {!isPending && (
            <Button
              radius="xl"
              size="md"
              type="submit"
              className={`submitButton ${classes.control}`}
              onClick={() => setActive("/jobs")}
            >
              Submit job
            </Button>
          )}
          {isPending && (
            <Button
              type="submit"
              disabled
              radius="xl"
              size="md"
              className={`submitButton ${classes.control}`}
            >
              Adding job
            </Button>
          )}
        </Box>
      </form>
    </Box>
  );
};

export default JobForm;

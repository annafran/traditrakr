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
                    <Box sx={{ maxWidth: "100%" }}>
                        {/* {fields.length > 0 ? (
                            <Group mb="xs">
                                <Text weight={700} size="sm" sx={{ flex: 1 }}>
                                    Notes
                                </Text>
                            </Group>
                        ) : (
                            <Text color="dimmed">
                                You must add at least one note
                            </Text>
                        )} */}
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

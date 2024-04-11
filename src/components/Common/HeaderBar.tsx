import { FunctionComponent } from "react";
import {
    createStyles,
    Header,
    Container,
    Group,
    Burger,
    Paper,
    Transition,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { TraditrakrLogo } from "./TraditrakrLogo";
import { useNavigate, useLocation } from "react-router-dom";

const HEADER_HEIGHT = "15vh";

const useStyles = createStyles((theme) => ({
    root: {
        backgroundColor: "#F7B32B",
        position: "relative",
        zIndex: 1,
    },

    dropdown: {
        position: "absolute",
        top: HEADER_HEIGHT,
        left: 0,
        right: 0,
        zIndex: 100,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        borderTopWidth: 0,
        overflow: "hidden",
        backgroundColor: "#F8DE7E",
        [theme.fn.largerThan("sm")]: {
            display: "none",
        },
    },

    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%",
    },

    links: {
        [theme.fn.smallerThan("sm")]: {
            display: "none",
        },
    },

    burger: {
        [theme.fn.largerThan("sm")]: {
            display: "none",
        },
    },

    link: {
        display: "block",
        lineHeight: 1,
        padding: "8px 12px",
        borderRadius: theme.radius.sm,
        textDecoration: "none",
        color: theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,
        "&:hover": {
            backgroundColor: theme.colors.gray[0],
        },

        [theme.fn.smallerThan("sm")]: {
            borderRadius: 0,
            padding: theme.spacing.md,
        },
    },

    linkActive: {
        "&, &:hover": {
            backgroundColor: theme.colors.gray[0],
        },
    },
}));

export const HeaderBar: FunctionComponent = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const links = [
        { link: "/", label: "Jobs" },
        { link: "/createjob", label: "Create a job" },
    ];

    const [opened, { toggle, close }] = useDisclosure(false);
    const { classes, cx } = useStyles();

    const items = links.map((link) => (
        <a
            key={link.label}
            href={link.link}
            className={cx(classes.link, {
                [classes.linkActive]: link.link == pathname,
            })}
            onClick={(event) => {
                event.preventDefault();
                close();
                navigate(link.link);
            }}
        >
            {link.label}
        </a>
    ));

    return (
        <Header height={HEADER_HEIGHT} className={classes.root}>
            <Container className={classes.header}>
                <TraditrakrLogo />
                <Group spacing={5} className={classes.links}>
                    {items}
                </Group>

                <Burger
                    opened={opened}
                    onClick={toggle}
                    className={classes.burger}
                    size="sm"
                />

                <Transition
                    transition="pop-top-right"
                    duration={200}
                    mounted={opened}
                >
                    {(styles) => (
                        <Paper
                            className={classes.dropdown}
                            withBorder
                            style={styles}
                        >
                            {items}
                        </Paper>
                    )}
                </Transition>
            </Container>
        </Header>
    );
};

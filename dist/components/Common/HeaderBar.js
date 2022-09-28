"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeaderBar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const core_1 = require("@mantine/core");
const hooks_1 = require("@mantine/hooks");
const TraditrakrLogo_1 = require("./TraditrakrLogo");
const react_router_dom_1 = require("react-router-dom");
const HEADER_HEIGHT = "15vh";
const useStyles = (0, core_1.createStyles)((theme) => ({
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
const HeaderBar = ({ active, setActive, }) => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const links = [
        { link: "/", label: "Jobs" },
        { link: "/createjob", label: "Create a job" },
    ];
    const [opened, { toggle, close }] = (0, hooks_1.useDisclosure)(false);
    const { classes, cx } = useStyles();
    const items = links.map((link) => ((0, jsx_runtime_1.jsx)("a", Object.assign({ href: link.link, className: cx(classes.link, {
            [classes.linkActive]: active === link.link,
        }), onClick: (event) => {
            event.preventDefault();
            setActive(link.link);
            close();
            navigate(link.link);
        } }, { children: link.label }), link.label)));
    return ((0, jsx_runtime_1.jsx)(core_1.Header, Object.assign({ height: HEADER_HEIGHT, className: classes.root }, { children: (0, jsx_runtime_1.jsxs)(core_1.Container, Object.assign({ className: classes.header }, { children: [(0, jsx_runtime_1.jsx)(TraditrakrLogo_1.TraditrakrLogo, {}), (0, jsx_runtime_1.jsx)(core_1.Group, Object.assign({ spacing: 5, className: classes.links }, { children: items })), (0, jsx_runtime_1.jsx)(core_1.Burger, { opened: opened, onClick: toggle, className: classes.burger, size: "sm" }), (0, jsx_runtime_1.jsx)(core_1.Transition, Object.assign({ transition: "pop-top-right", duration: 200, mounted: opened }, { children: (styles) => ((0, jsx_runtime_1.jsx)(core_1.Paper, Object.assign({ className: classes.dropdown, withBorder: true, style: styles }, { children: items }))) }))] })) })));
};
exports.HeaderBar = HeaderBar;

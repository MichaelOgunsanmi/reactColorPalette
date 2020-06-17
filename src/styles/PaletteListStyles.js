import sizes from "./mediaBreakPoints";
import background from './background.svg';


const styles = {
    root: {
        height: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        backgroundColor: '#3648aa',
        backgroundImage: `url(${background})`,
        overflow: 'scroll'
    },
    heading: {
        fontSize: '2rem'
    },
    container: {
        width: "50%",
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        flexWrap: "wrap",
        [sizes.down('sm')]: {
            width: '60%',
        },
        [sizes.down('xs')]: {
            width: '50%',
        }
    },
    nav: {
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        color: "white",
        alignItems: "center",
        "& a": {
            color: "white"
        }
    },
    palettes: {
        boxSizing: "border-box",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(3, 30%)",
        gridGap: "1.5rem",
        [sizes.down('md')]: {
            gridTemplateColumns: "repeat(2, 50%)"
        },
        [sizes.down('xs')]: {
            gridTemplateColumns: "repeat(1, 100%)"
        }
    }
};

export default styles;
import { ProgressCircular } from "ui-neumorphism";
import "ui-neumorphism/dist/index.css";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	spinnerWrapper: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
}));

const Loader = () => {
	const classes = useStyles();

	return (
		<div className={classes.spinnerWrapper}>
			<ProgressCircular
				indeterminate
				color="var(--info)"
				size={64}
				width={8}
				elevated
				value={80}
			/>
		</div>
	);
};

export default Loader;

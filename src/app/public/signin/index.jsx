import React from "react";
import {withRouter} from "react-router";
import {LoggerFactory,Redux} from "reakit/lib/utils";
import Form from "reakit/lib/form";
import Field from "reakit/lib/field";
import Button from "reakit/lib/button";
import Container from "reakit/lib/container";
import Grid from "reakit/lib/grid";
import i18n from "reakit/lib/i18n";
import Spinner from "reakit/lib/spinner";
import styles from "./styles";
import logoIcon from "assets/images/logo_icon.png";
import {Auth} from "common";

let Logger = new LoggerFactory("public.signin");

/**
 * Main component class.
 */
class Component extends React.Component {
    /** React properties **/
    static displayName = "public.signin";
    static defaultProps = {};
    static propTypes = {};

    /** Instance properties **/
    state = {};

    /**
     * LYFECICLE : This function is called when component
     * got mounted in the view.
     */
    componentDidMount() {
        let logger = Logger.create("componentDidMount");
        logger.info("enter");
    }

    /**
     * This function submits the login form.
     */
    async onSubmit(data) {
        let logger = Logger.create("onSubmit");
        logger.info("enter", {data});

        this.setState({loading: true});

        try {
            // Dispatch signin action
            let signinResponse = await Redux.dispatch(
                Auth.actions.signin({
                    nickOrEmail: data.nickOrEmail,
                    password: data.password
                })
            );

            logger.debug("Auth signin action success", signinResponse);

            // Redirect to private home.
            this.props.router.replace("/");
        }
        catch(error) {
            logger.error("signup process error", error);
            this.setState({loading: false});
        }
    }

    /**
     * This function is responsible for generating the component's view.
     */
    render() {
        return (
            <div className={styles.page}>
                <Container>
                    <Grid>
                        <Grid.Cell></Grid.Cell>

                        <Grid.Cell span={1}>
                            <div className={styles.logoContainer}>
                                <img className={styles.logo} src={logoIcon} />
                            </div>

                            <div className={styles.box}>
                                <Form loading={this.state.loading}
                                    onSubmit={this.onSubmit}>
                                    <Field.Section>
                                        <div className={styles.label}>
                                            <i18n.Translate text="_LOGIN_FIELD_LABEL_" />
                                        </div>
                                        <Field.Text
                                            name="nickOrEmail"
                                            placeholder="_LOGIN_FIELD_PLACEHOLDER_"
                                            scale={1.5}
                                            validators="required"/>
                                        <Field.Error
                                            for="test"
                                            validator="required|email"
                                            message="_FIELD_ERROR_REQUIRED_"/>
                                    </Field.Section>

                                    <Field.Section>
                                        <div className={styles.label}>
                                            <i18n.Translate text="_PASSWORD_FIELD_LABEL_" />
                                        </div>
                                        <Field.Text
                                            type="password"
                                            name="password"
                                            placeholder="_PASSWORD_FIELD_PLACEHOLDER_"
                                            scale={1.5}
                                            validators="required"/>
                                    </Field.Section>

                                    <Field.Section>
                                        <div className={styles.buttonContainer}>
                                            <Button type="submit"
                                                loadingComponent={
                                                    <span>
                                                        <i18n.Translate text="_LOADING_" />
                                                        <span className={styles.spinnerContainer}>
                                                            <Spinner.Bars color="#fff" />
                                                        </span>
                                                    </span>
                                                }
                                                scale={1.3}>
                                                <i18n.Translate text="_SIGNIN_" />
                                            </Button>
                                        </div>
                                    </Field.Section>
                                </Form>
                            </div>
                        </Grid.Cell>

                        <Grid.Cell></Grid.Cell>
                    </Grid>
                </Container>
            </div>
        );
    }
}

/**
 * Export component
 */
export default withRouter(Component);

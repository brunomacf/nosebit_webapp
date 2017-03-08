import React from "react";
import {Link} from "react-router";
import {LoggerFactory} from "reakit/lib/utils";
//import i18n from "reakit/src/i18n";
import Bar from "reakit/lib/bar";
import logoIcon from "assets/images/logo_icon.png";
import styles from "./styles";

let Logger = new LoggerFactory("landing.page");

/**
 * Main component class.
 */
export default class Component extends React.Component {
    /** React properties **/
    static displayName = "landing.page";
    static defaultProps = {};
    static propTypes = {};

    /** Instance properties **/
    state = {};

    componentDidMount() {
        let logger = Logger.create("componentDidMount");
        logger.info("enter");
    }

    render() {
        return (
            <div className="landing-page">
                <Bar fixedOnTop={true} open={this.state.barOpen} onToggle={() => { this.setState({barOpen: !this.state.barOpen}); }}>
                    <Bar.Container withBottomLine={true}>
                        <Bar.Header>
                            <Bar.Menu togglable={false}>
                                <Bar.Item>
                                    <Link to="/">
                                        <img className={styles.logo} src={logoIcon} />
                                    </Link>
                                </Bar.Item>
                            </Bar.Menu>

                            {/*<Bar.Toggle
                                openComponent={<span className="icon-menu"></span>}
                                closeComponent={<span className="icon-delete"></span>}>
                            </Bar.Toggle>*/}
                        </Bar.Header>
                        {/*<Bar.Body>
                            <Bar.Menu>
                                <Bar.Item>
                                    <Link to="/messages" activeClassName="active">
                                        <i18n.Translate text="_NAV_BAR_MESSAGES_ITEM_LABEL_" />
                                    </Link>
                                </Bar.Item>

                                <Bar.Item>
                                    <Link to="/explore" activeClassName="active">
                                        <i18n.Translate text="_NAV_BAR_EXPLORE_ITEM_LABEL_" />
                                    </Link>
                                </Bar.Item>

                                <Bar.Item>
                                    <Link to="/create/room" className={styles.createButton}>
                                        <i18n.Translate text="_NAV_BAR_CREATE_ITEM_LABEL_" />
                                    </Link>
                                </Bar.Item>

                                <Bar.Item>
                                    <Link to="/account" className={styles.accountButton} style={{display: "block"}}>
                                        <span className="icon-circled-user"></span>
                                    </Link>
                                </Bar.Item>
                            </Bar.Menu>
                        </Bar.Body>*/}
                    </Bar.Container>
                </Bar>

                {this.props.children}
            </div>
        );
    }
}

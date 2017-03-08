import React from "react";
import gravatar from "gravatar";
import {LoggerFactory} from "reakit/src/utils";
import i18n from "reakit/src/i18n";
import styles from "./styles";

let Logger = new LoggerFactory("common.room.message", {level:"debug"});

/**
 * Main component class.
 */
export default class Component extends React.Component {
    /** React properties **/
    static displayName = "common.room.message";
    static defaultProps = {};

    static propTypes = {
        data: React.PropTypes.object.isRequired,
        creator: React.PropTypes.object
    };

    /**
     * LYFECICLE : This function is called when component
     * got mounted in the view.
     */
    componentDidMount() {
        let logger = Logger.create("componentDidMount");
        logger.info("enter");
    }

    /**
     * This function is responsible for generating the component's view.
     */
    render() {
        let {data,creator} = this.props;

        return (
            <div className={styles.message}>
                <div className={styles.left}>
                    <div className={styles.avatar}>
                        {creator ? (
                            <img src={gravatar.url(creator.email, {s: "100", d: "retro"})} />
                        ) : null}
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.text}>{data.text}</div>
                    {creator ? (
                        <div className={styles.footer}>
                            <span className={styles.nickname}>@{creator.nickName}</span>
                            <span className={styles.separator}>•</span>
                            <i18n.Moment date={data.createdAt} />
                        </div>
                    ) : null}
                </div>
            </div>
        );
    }
}
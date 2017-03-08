import React from "react";
import i18n from "reakit/src/i18n";
import {LoggerFactory} from "reakit/src/utils";
import styles from "./styles";

let Logger = new LoggerFactory("common.room.card", {level:"debug"});

/**
 * Main component class.
 */
export default class Component extends React.Component {
    /** React properties **/
    static displayName = "common.room.card";

    static defaultProps = {};

    static propTypes = {
        data: React.PropTypes.object.isRequired,
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
        let room = this.props.data;

        return (
            <div className={styles.card}>
                <div className={styles.roomName}>{room.name}</div>

                <div className={styles.info}>
                    <div className={styles.row}>
                        <div className={styles.item}>
                            <span className="icon-marker"></span>{room.locationName}
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.item}>
                            <span className="icon-tags"></span>

                            {room.tags.slice(0,2).map((tag, idx) => {
                                return (
                                    <span key={tag.name} className={styles.tag}>{(idx>0?", ":"")+tag.name}</span>
                                );
                            })}
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.item}>
                            <span className="icon-group"></span><b>{room.membersCount}</b> {room.membersCount > 1 ? <i18n.Translate text="_ROOM_MEMBERS_LABEL_" /> : <i18n.Translate text="_ROOM_MEMBER_LABEL_" />}
                        </div>
                    </div>

                    {/*<div className={styles.row}>
                        <div className={styles.item}>
                            <span className="icon-group"></span><b>{room.membersCount}</b> {room.membersCount > 1 ? <i18n.Translate text="_ROOM_MEMBERS_LABEL_" /> : <i18n.Translate text="_ROOM_MEMBER_LABEL_" />}
                        </div>
                    </div>*/}
                </div>
            </div>
        );
    }
}

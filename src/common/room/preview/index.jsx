import React from "react";
import classNames from "classnames";
import {LoggerFactory} from "reakit/src/utils";
import i18n from "reakit/src/i18n";
import styles from "./styles";

let Logger = new LoggerFactory("common.room.preview", {level:"debug"});

/**
 * Main component class.
 */
export default class Component extends React.Component {
    /** React properties **/
    static displayName = "common.room.preview";

    static defaultProps = {
        active: false,
        onSelect: () => {}
    };

    static propTypes = {
        active: React.PropTypes.bool,
        data: React.PropTypes.object.isRequired,
        onSelect: React.PropTypes.func.isRequired
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
     * This function handle mouse down on room preview.
     */
    onMouseDown() {
        this.props.onSelect(this.props.data);
    }

    /**
     * This function is responsible for generating the component's view.
     */
    render() {
        let room = this.props.data;
        let locationName = room.locationName;

        let roomClasses = [
            styles.preview,
            this.props.active?styles.active:""
        ];

        // Extract location name from components
        if(room.locationComponents) {
            let names = [];

            let levels = [
                "sublocality", 
                "administrative_area_level_1",
                "country"
            ];
            let currLevel = 0;

            room.locationComponents.forEach((component) => {
                if(currLevel < levels.length 
                && component.types.indexOf(levels[currLevel]) >= 0) {
                    names.push(component.shortName);
                    currLevel++;
                }
            });

            locationName = names.join(", ");
        }

        return (
            <div className={classNames(roomClasses)} onMouseDown={this.onMouseDown}>
                <div className={styles.left}>
                    <div className={styles.image}></div>
                </div>

                <div className={styles.right}>
                    <div className={styles.name}>{room.name}</div>
                    
                    <div className={styles.info}>
                        <div className={styles.row}>
                            <div className={styles.item}>
                                <span className="icon-marker"></span>{locationName}
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.item}>
                                <span className="icon-group"></span><b>{room.membersCount}</b> {room.membersCount > 1 ? <i18n.Translate text="_ROOM_MEMBERS_LABEL_" /> : <i18n.Translate text="_ROOM_MEMBER_LABEL_" />}
                            </div>

                            <div className={styles.item}>
                                <span className="icon-tags"></span>

                                {room.tags.slice(0,2).map((tag, idx) => {
                                    return (
                                        <span key={tag.name} className={styles.tag}>{(idx>0?", ":"")+tag.name}</span>
                                    );
                                })}
                            </div>
                        </div>

                        {/*<div className={styles.row}>
                            <div className={styles.item}>
                                <span className="icon-group"></span><b>{room.membersCount}</b> {room.membersCount > 1 ? <i18n.Translate text="_ROOM_MEMBERS_LABEL_" /> : <i18n.Translate text="_ROOM_MEMBER_LABEL_" />}
                            </div>
                        </div>*/}
                    </div>
                </div>
            </div>
        );
    }
}

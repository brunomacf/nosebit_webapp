import React from "react";
import {connect} from "react-redux";
import lodash from "lodash";
import moment from "moment";
import {findDOMNode} from "react-dom";
import {LoggerFactory,Redux} from "reakit/src/utils";
import Form from "reakit/src/form";
import Field from "reakit/src/field";
import i18n from "reakit/src/i18n";
import Scroll from "reakit/src/scroll";
import styles from "./styles";
import {Api,Socket,User} from "common";
import Message from "./message";
import actions from "./actions";

let Logger = new LoggerFactory("common.room", {level:"debug"});

/**
 * Redux map state to props function.
 *
 * @param {object} state
 * @param {object} ownProps
 */
function mapStateToProps(state) {
    return {
        profiles: state.user.profiles
    };
}

/**
 * Redux dispatch to props map.
 */
let mapDispatchToProps = {

};

/**
 * Main component class.
 */
class Component extends React.Component {
    /** React properties **/
    static displayName = "common.room";
    
    static defaultProps = {};

    static propTypes = {
        data: React.PropTypes.object.isRequired
    };

    /** Nested components */
    static Card = require("./card");
    static Preview = require("./preview");
    static actions = require("./actions");
    static reducer = require("./reducer");

    /** Instance properties */
    state = {
        loadingMessages: false,
        messages: []
    };

    /**
     * LYFECICLE : This function is called when component
     * got mounted in the view.
     */
    componentDidMount() {
        let logger = Logger.create("componentDidMount");
        logger.info("enter");
        
        this.joinRoom();

        /**
         * Load new messages.
         */
        //this.loadMessages();

        // Subscribe to message created event.
        Socket.shared.on("message:created", this.handleMessageCreatedEvent.bind(this));

        // Scroll body to bottom.
        //this.scrollToBottom();
    }

    /**
     * LIFECYCLE : This function is called when component
     * gonna unmount from the view.
     */
    componentWillUnmount() {
        let logger = Logger.create("componentWillUnmount");
        logger.info("enter");

        this.leaveRoom();

        // Remove listener
        Socket.shared.removeListener("message:created", this.handleMessageCreatedEvent);
    }

    /**
     * LIFECYCLE : This function is called when component props
     * of state get changed.
     */
    componentDidUpdate(prevProps) {
        let logger = Logger.create("componentDidUpdate");

        let roomId = lodash.get(this.props, "data._id");
        let prevRoomId = lodash.get(prevProps, "data._id");

        logger.info("enter", {roomId,prevRoomId});

        // If data has changed, then join the new room.
        if(roomId != prevRoomId) {
            this.joinRoom({prevRoomId});

            //this.loadMessages();
        }

        // Scroll body to bottom.
        //this.scrollToBottom();
    }

    /**
     * This function scroll to bottom.
     */
    scrollToBottom() {
        // Scroll to bottom.
        const bottom = findDOMNode(this.bottomRef);
        bottom.scrollIntoView({behavior: "smooth"});
    }

    /**
     * This function join user to the room via socket.
     */
    joinRoom({roomId=lodash.get(this.props,"data._id"), prevRoomId} = {}) {
        if(prevRoomId){ this.leaveRoom(prevRoomId); }

        // Join new room.
        Socket.shared.emit("room:join", roomId, {reemitOn: "sign"});
    }

    /**
     * This function leave user from the room via socket.
     */
    leaveRoom({roomId=lodash.get(this.props,"data._id")} = {}) {
        // Leave room.
        Socket.shared.emit("room:leave", roomId);

        // Remove event to reemit.
        Socket.shared.removeEventToReemit("room:join");
    }

    /**
     * This function handles message created event.
     */
    async handleMessageCreatedEvent(message) {
        let logger = Logger.create("handleMessageCreatedEvent");
        logger.info("enter", message);

        let {messages} = this.state;
        let {profiles} = this.props;
        let roomId = lodash.get(this.props, "data._id");

        // Get message creator if not fetched yet.
        if(!profiles[message.creator]) {
            try {
                await Redux.dispatch(
                    User.actions.userFind({_id: [message.creator]})
                );

                logger.debug("userFind actions success");
            }
            catch(error) {
                logger.error("userFind actions error", error);   
            }
        }

        // Dispatch
        try {
            await Redux.dispatch(
                actions.incRoomOpenMessagesCount(roomId, 1)
            );
        }
        catch(error) {
            logger.error("userFind actions error", error);
        }

        // Push message into stack.
        messages.push(message);

        // Set messages.
        this.setState({messages});
    }

    /**
     * This function loads first messages into the scene.
     */
    async loadMessages({event} = {}) {
        if(!event){return;}

        let firstLoad = event=="mount"||event == "id:changed",
            messages = this.state.messages||[],
            {profiles} = this.props,
            room = this.props.data,
            logger = Logger.create("loadMessages");
        
        logger.info("enter", {event});

        this.setState(lodash.merge({loadingMessages: true}, {
            messages: firstLoad?[]:messages
        }));

        let query = {
            room: room._id,
            limit: 20,
            sort: {
                createdAt: -1
            }
        };

        if(firstLoad) {
            query.createdAt = {
                upper: moment().toISOString()
            };
        }
        else if(messages.length) {
            query.count = {
                upper: (messages[0].count-1)
            };
        }

        try {
            let response = await Api.shared.messageFind(query);

            logger.debug("api messageFind success", response);
            let resultMessages = response.results.reverse();

            if(!firstLoad) { messages.unshift(...resultMessages); }
            else { messages = resultMessages; }
        }
        catch(error) {
            this.setState({loadingMessages: false});
            return logger.error("api messageFind error", error);
        }

        // Grab creators that was not fetched yet.
        let uids = lodash.reduce(messages, (uids, message) => {
            if(!profiles[message.creator]) {uids.push(message.creator);}
            return uids;
        }, []);

        if(uids.length) {
            try {
                await Redux.dispatch(
                    User.actions.userFind({
                        _id: uids
                    })
                );

                logger.error("userFind action success");
            }
            catch(error) {
                logger.error("userFind action error", error);
            }
        }

        await new Promise((resolve) => {
            this.setState({messages, loadingMessages: false}, resolve);
        });

        return firstLoad?{scrollToEnd: true}:undefined;
    }

    /**
     * This function submit a message to the room.
     */
    async onMessageSubmit(data) {
        let logger = Logger.create("onMessageSubmit");
        logger.info("enter", {data});

        this.setState({messageFormLoading: true});

        let sendData = {
            text: data.text,
            room: this.props.data._id
        };

        try {
            let response = Api.shared.messageCreate(sendData);
            logger.debug("api messageCreate success", response);
        }
        catch(error) {
            logger.error("api messageCreate error", error);
        }

        // Reset field.
        return {text: ""};
    }

    /**
     * This function is responsible for generating the component's view.
     */
    render() {
        let {loadingMessages,messages} = this.state;
        let {data,profiles} = this.props;

        return (
            <div className={styles.room}>
                <div className={styles.body}>
                    <Scroll
                        id={data._id}
                        direction="bottom"
                        loadOffset={300}
                        autoScrollOffset={50}
                        onLoad={this.loadMessages}
                        loading={loadingMessages}
                        loadingComponent={
                            <div style={{textAlign: "center"}}>
                                <i18n.Translate text="_LOADING_MESSAGES_" />
                            </div>
                        }>
                        {/* Render room messages */}
                        {messages.map((message) => {
                            return <Message 
                                key={message._id} 
                                data={message}
                                creator={profiles[message.creator]}
                            />;
                        })}

                        <div ref={(ref) => {this.bottomRef = ref;}}></div>
                    </Scroll>
                </div>

                <div className={styles.footer}>
                    <div className={styles.messageFormContainer}>
                        <Form loading={this.state.messageFormLoading}
                        onSubmit={this.onMessageSubmit}>
                            <Field.Text
                                name="text"
                                placeholder="_SEND_MESSAGE_FIELD_PLACEHOLDER_"
                                scale={1.2}/>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

/** Export **/
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Component);

import {createActions} from "redux-actions";
import {LoggerFactory} from "reakit/src";

let Logger = new LoggerFactory("common.message.actions", {level:"debug"});

export default createActions({
    onMessageCreated(data) {
        return data;
    }
});

import {LoggerFactory} from "reakit/src";
let Logger = new LoggerFactory("message");

/**
 * Main class definition.
 */
export default class Message {
    /** Nested modules  */
    static actions = require("./actions");
    static reducer = require("./reducer");

    /**
     * This function init the message module.
     */
    static init() {
        let logger = Logger.create("init");
        logger.info("enter");

        // Start listen to socket events.
    }
}
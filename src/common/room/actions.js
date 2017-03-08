import {createActions} from "redux-actions";
import {LoggerFactory} from "reakit/src";
import Api from "../utils/api";

let Logger = new LoggerFactory("common.room.actions", {level:"debug"});

export default createActions({
    setActiveRoomId(id) {
        var logger = Logger.create("setActiveRoomId");
        logger.info("enter", id);

        return id;
    },

    incRoomOpenMessagesCount(roomId, inc) {
        var logger = Logger.create("incRoomOpenMessagesCount");
        logger.info("enter", {roomId, inc});

        return {roomId,inc};
    },

    async createRoom(data, opts) {
        var logger = Logger.create("createRoom");
        logger.info("enter", data);

        let createResponse = await Api.shared.roomCreate(data, opts);

        logger.debug("Api roomCreate success", createResponse);

        return createResponse.result;
    },

    async createMessage(data, opts) {
        var logger = Logger.create("createMessage");
        logger.info("enter", data);

        let createResponse = await Api.shared.messageCreate(data, opts);
        logger.debug("Api messageCreate success", createResponse);

        return createResponse.result;
    },

    async findRooms(query, opts) {
        var logger = Logger.create("findRooms");
        logger.info("enter", query);

        let findResponse = await Api.shared.roomFind(query, opts);

        logger.debug("Api roomFind success", findResponse);

        return findResponse.results;
    },
});

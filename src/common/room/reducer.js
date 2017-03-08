import {handleActions} from "redux-actions";
import {LoggerFactory} from "reakit/src/utils";
import lodash from "lodash";

let Logger = new LoggerFactory("common.room.reducer", {level:"debug"});

let initialState = {
    data: {},
    activeId: null
};

export default handleActions({
    setActiveRoomId(state, action) {
        let logger = Logger.create("setActiveRoomId");
        logger.info("enter", {state: state, action: action});

        return lodash.assign({}, state, {activeId: action.payload});
    },

    incRoomOpenMessagesCount(state, action) {
        let logger = Logger.create("incRoomOpenMessagesCount");
        logger.info("enter", {state: state, action: action});

        let {roomId, inc} = action.payload;
        let room = state.data[roomId];
        let count = lodash.get(room, "openMessagesCount")||0;

        lodash.set(room, "openMessagesCount", count+inc);

        let newState = lodash.assign(
            {}, 
            state, 
            {
                data: lodash.assign(
                    state.data,
                    lodash.set({}, roomId, room)
                )
            }
        );

        logger.debug("newState", newState);

        return newState;
    },

    findRooms_COMPLETED(state, action) {
        let logger = Logger.create("findRooms_COMPLETED");
        logger.info("enter", {state: state, action: action});

        let rooms = lodash.reduce(action.payload, (map, room) => {
            map[room._id] = room;
            return map;
        }, {});

        let data = lodash.assign({}, state.data, rooms);

        logger.debug("new rooms", {rooms});

        return lodash.assign({}, state, {data});
    }
}, initialState);

//import lodash from "lodash";
//import {Redux} from "reakit/src/utils";

module.exports = {
    path: "",

    /*onEnter(nextState, replace, cb) {
        if(lodash.get(Redux.shared.store.getState(), "user.uid")) {
            replace("/");
        }

        cb();
    },*/

    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require("./page"));
        });
    },

    getChildRoutes(partialNextState, cb) {
        require.ensure([], (require) => {
            cb(null, [
                //require("./signin/route"),
                //require("./signup/route"),
                require("./landing/route")
            ]);
        });
    }
};

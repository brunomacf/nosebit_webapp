import {LoggerFactory,Redux,i18n} from "reakit/src";
//import {User} from "common";

let Logger = new LoggerFactory("app.route");

module.exports = {
    path: "/",

    onEnter(nextState, replace, cb) {
        // Initialize i18n
        let logger = Logger.create("onEnter");
        logger.info("enter");

        var _initPromise = Promise.all([
            Redux.dispatch(i18n.actions.i18NInit("pt-br"))
        ]);

        // Fire callback anyway
        _initPromise.then(function(result) {
            logger.info("all promises resolved", result);
            cb();
        }).catch(function() {cb();});
    },

    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require("./page"));
        });
    },

    getChildRoutes(partialNextState, cb) {
        require.ensure([], (require) => {
            cb(null, [
                require("./public/route")
            ]);
        });
    }
};

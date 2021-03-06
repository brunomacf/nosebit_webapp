import {createActions} from "redux-actions";
import {LoggerFactory} from "reakit/src";
import Api from "../utils/api";
import Socket from "../utils/socket";

let Logger = new LoggerFactory("common.auth.actions", {level:"error"});

export default createActions({
    async signin({nickOrEmail, password} = {}, opts) {
        var logger = Logger.create("signin");
        logger.info("enter", {nickOrEmail, password});

        let signinResponse = await Api.shared.signin({
            nickOrEmail, password
        }, opts);

        logger.debug("Api signin success", signinResponse);

        // Set api http auth token
        await Api.shared.http.setAuthToken(signinResponse.result);
        logger.debug("Api http setAuthToken success");

        // Sign socket
        Socket.shared.sign(signinResponse.result);

        // Get user profile.
        let userMeResponse = await Api.shared.userMe(opts);
        logger.debug("Api userMe success", {userMeResponse});

        return userMeResponse.result;
    }
});

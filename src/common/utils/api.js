import lodash from "lodash";
import {Http,LoggerFactory,Redux,Toaster} from "reakit/src";
import config from "config";

let Logger = new LoggerFactory("common.utils.api");

/**
 * Main class definition.
 */
export default class Api {
    constructor({http=new Http(), shared=false} = {}) {
        if(shared){Api.shared = this;}

        this.baseUrl = `//${config.hostnames.api}/v1`;
        this.http = http;
    }

    /****************************************************************
    * Request method
    ****************************************************************/
    request(method, path, data, opts = {}) {
        let logger = Logger.create("request");
        logger.info("enter", {method, path, data, opts});

        return this.http.request(
            method,
            `${this.baseUrl}/${path}`,
            data
        ).catch((error) => {
            logger.error("catch error", error);

            if(!opts.preventErrorInterceptor) {
                let data = lodash.get(error, "response.data");


                if(data && data.name) {
                    let name = lodash.toUpper(lodash.snakeCase(data.name));
                    let code = data.code;

                    // Let's show error message.
                    Redux.dispatch(
                        Toaster.actions.push("danger", `_${name}_${code}_`)
                    );
                }
                
            }

            throw error;
        });
    }

    /****************************************************************
    * Api methods
    ****************************************************************/
    signin(data, opts) {
        return this.request("POST", "auth/signin", data, opts);
    }

    signed(opts) {
        return this.request("GET", "auth/signed", null, opts);
    }

    signout(opts) {
        return this.request("POST", "auth/signout", null, opts);
    }

    signup(data, opts) {
        return this.request("POST", "user/signup", data, opts);
    }

    userMe(opts) {
        return this.request("GET", "user/me", null, opts);
    }

    userFind(data, opts) {
        return this.request("GET", "user", data, opts);
    }

    userUpdate(data, opts) {
        return this.request("PUT", "user/me", data, opts);
    }

    userNickNameCheck(data, opts) {
        return this.request("GET", "user/nickname", data, opts);
    }

    roomCreate(data, opts) {
        return this.request("POST", "room", data, opts);
    }

    roomFind(data, opts) {
        return this.request("GET", "room", data, opts);
    }

    memberFind(data, opts) {
        return this.request("GET", "member", data, opts);
    }

    tagCreate(data, opts) {
        return this.request("POST", "tag", data, opts);
    }

    tagFind(data, opts) {
        return this.request("GET", "tag", data, opts);
    }

    messageCreate(data, opts) {
        return this.request("POST", "message", data, opts);
    }

    messageFind(data, opts) {
        return this.request("GET", "message", data, opts);
    }
}

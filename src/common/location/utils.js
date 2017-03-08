import {LoggerFactory} from "reakit/src";

let Logger = new LoggerFactory("common.location.utils", {level:"debug"});

export default class Utils {
    static getLocation() {
        var logger = Logger.create("getLocation");
        logger.info("enter");

        return new Promise((resolve, reject) => {
            if(!navigator.geolocation) {
                logger.error("geolocation not supported");
                return reject(new Error("geolocation not supported"));
            }

            navigator.geolocation.getCurrentPosition((location) => {
                logger.debug("geolocation getCurrentPosition success", location);
                resolve(location);
            });
        });
    }
}
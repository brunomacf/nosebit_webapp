import React from "react";
import lodash from "lodash";
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";
import MapboxClient from "mapbox";
import {findDOMNode} from "react-dom";
import {LoggerFactory} from "reakit/src/utils";
import styles from "./styles";
import "mapbox-gl/dist/mapbox-gl.css";

let Logger = new LoggerFactory("common.location.map", {level:"error"});

/**
 * Main component class.
 */
export default class Component extends React.Component {
    /** React properties **/
    static displayName = "common.location.map";
    
    static defaultProps = {
        width: "100%",
        height: "50pt"
    };
    
    static propTypes = {
        width: React.PropTypes.string,
        height: React.PropTypes.string,
        center: React.PropTypes.arrayOf(React.PropTypes.number),
        zoom: React.PropTypes.number
    };

    /** Static functions */
    static setAccessToken(accessToken) {
        mapboxgl.accessToken = accessToken;

        Component.client = new MapboxClient(accessToken);
    }

    /**
     * This function constructs a new instance of the component.
     */
    constructor(props) {
        super(props);
    }

    /**
     * LYFECICLE : This function is called when component
     * got mounted in the view.
     */
    componentDidMount() {
        let logger = Logger.create("componentDidMount");
        logger.info("enter");

        // Initialize the map.
        this.map = new mapboxgl.Map({
            container: findDOMNode(this.mapContainerRef),
            style: "mapbox://styles/mapbox/streets-v9"
        });
    }

    /**
     * LYFECICLE : This function is called when component
     * props or state has changed.
     */
    componentDidUpdate(prevProps) {
        let logger = Logger.create("componentDidUpdate");
        logger.info("enter");

        // If layers changed, then add them again.
        

        // Recenter data.
        if(!lodash.isEqual(this.props.center, prevProps.center)
        || !lodash.isEqual(this.props.zoom, prevProps.zoom)) {
            this.map.easeTo({
                center: this.props.center,
                zoom: this.props.zoom
            });
        }
    }

    /**
     * This function is responsible for generating the component's view.
     */
    render() {
        let {width,height} = this.props;

        return (
            <div>
                <div style={{width,height}} 
                    ref={(ref) => { this.mapContainerRef = ref; }}></div>
            </div>
        );
    }
}

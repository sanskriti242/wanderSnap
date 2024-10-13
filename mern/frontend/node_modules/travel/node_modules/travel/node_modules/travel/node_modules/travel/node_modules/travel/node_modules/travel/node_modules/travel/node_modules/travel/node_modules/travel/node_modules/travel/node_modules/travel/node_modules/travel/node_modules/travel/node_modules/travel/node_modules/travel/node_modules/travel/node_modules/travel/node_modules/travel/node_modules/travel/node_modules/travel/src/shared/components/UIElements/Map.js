import React, { useRef, useEffect } from "react";
import "./Map.css";

const Map = (props) => {
  const mapRef = useRef(); //In this constant we store a pointer to below div

  const { center, zoom } = props; //to get center and zoom from props and store in new constants and use as dependency

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: center,
      zoom: zoom,
    }); //This is a constructor function which will now be available on the global window object in the end
    //current prop holds the actual pointer we need

    new window.google.maps.Marker({ position: center, map: map }); //This will create new marker in center of map
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
};

export default Map;

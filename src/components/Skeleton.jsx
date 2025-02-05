import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader
    speed={2}
    width={280}
    height={467}
    viewBox="0 0 280 467"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="136" cy="106" r="106" />
    <rect x="11" y="220" rx="0" ry="0" width="271" height="23" />
    <rect x="114" y="288" rx="0" ry="0" width="0" height="1" />
    <rect x="10" y="252" rx="0" ry="0" width="271" height="69" />
    <rect x="475" y="428" rx="0" ry="0" width="101" height="29" />
    <rect x="12" y="336" rx="0" ry="0" width="101" height="30" />
    <rect x="177" y="335" rx="0" ry="0" width="101" height="30" />
  </ContentLoader>
);

export default Skeleton;

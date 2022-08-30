import React from 'react';
export const TwitterIcon = ({
  color = 'currentColor',
  width = '17px',
  height = '17px',
}) => {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 1000 1000"
      enableBackground="new 0 0 1000 1000"
      xmlSpace="preserve"
      width={width}
      height={height}
    >
      <g>
        <path d="M990,196.1c-36.1,16-74.8,26.8-115.4,31.7c41.5-24.9,73.3-64.3,88.4-111.2c-38.9,23-81.9,39.8-127.8,48.8c-36.6-39.1-88.9-63.5-146.7-63.5c-111,0-201.1,90-201.1,201c0,15.7,1.8,31.1,5.2,45.8c-167.1-8.4-315.2-88.4-414.4-210.1C61,168.3,51.1,202.8,51.1,239.7c0,69.8,35.5,131.3,89.4,167.3c-32.9-1.1-63.9-10.2-91.1-25.2v2.5c0,97.4,69.3,178.7,161.3,197.2c-16.8,4.5-34.6,7-53,7c-13,0-25.5-1.3-37.8-3.7c25.6,79.9,99.8,138,187.8,139.6c-68.8,53.9-155.5,86-249.7,86c-16.2,0-32.2-1-48-2.8c89,57.1,194.6,90.4,308.2,90.4c369.8,0,572-306.4,572-572.1l-0.7-26C928.9,271.8,963.1,236.4,990,196.1z"
          fill={color}
        />
      </g>
    </svg>
  );
};

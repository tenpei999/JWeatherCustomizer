import { useState, useEffect } from 'react';

/**
 * A custom hook for generating CSS border styles from a given borders object. 
 * This hook creates a consistent border style object for use in React component styling.
 * 
 * @param {Object} borders - An object containing border properties for each side of an element (top, right, bottom, left).
 * @returns {Object} A CSS-in-JS style object containing the border styles for each side.
 */
function useBorderStyles(borders) {
  const defaultBorderStyle = { width: '0px', style: 'none', color: '#000000' };
  const [borderStyles, setBorderStyles] = useState({});

  useEffect(() => {
    const borderTop = borders.top || defaultBorderStyle;
    const borderRight = borders.right || defaultBorderStyle;
    const borderBottom = borders.bottom || defaultBorderStyle;
    const borderLeft = borders.left || defaultBorderStyle;

    setBorderStyles({
      borderTop: `${borderTop.width} ${borderTop.style} ${borderTop.color}`,
      borderRight: `${borderRight.width} ${borderRight.style} ${borderRight.color}`,
      borderBottom: `${borderBottom.width} ${borderBottom.style} ${borderBottom.color}`,
      borderLeft: `${borderLeft.width} ${borderLeft.style} ${borderLeft.color}`,
    });
  }, [borders]);

  return borderStyles;
};

export default useBorderStyles;

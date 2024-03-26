/**
 * Determines the CSS background styles based on the specified background type and its value.
 * Supports 'image', 'color', and 'gradient' as background types, providing appropriate
 * CSS properties for each. If the background type is 'image', it sets the image URL along
 * with styling for cover size, no repeat, and centered position. For 'color', it sets
 * the background color directly. For 'gradient', it applies the CSS gradient.
 * 
 * @param {Object} params - Parameters containing information about the background style.
 * @param {string} params.backgroundStyleType - The type of background ('image', 'color', 'gradient').
 * @param {string} params.selectedMedia - The URL of the selected background image (applicable if type is 'image').
 * @param {string} params.backgroundColor - The background color value (applicable if type is 'color').
 * @param {string} params.backgroundGradient - The CSS for the background gradient (applicable if type is 'gradient').
 * @returns {Object} - An object containing the appropriate CSS properties for the background styling.
 */

export const getBackgroundStyles = ({ backgroundStyleType, selectedMedia, backgroundColor, backgroundGradient }) => {
  switch (backgroundStyleType) {
    case 'image':
      return selectedMedia ? {
        backgroundImage: `url('${selectedMedia}')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      } : {};
    case 'color':
      return backgroundColor ? { backgroundColor } : {};
    case 'gradient':
      return backgroundGradient ? { background: backgroundGradient } : {};
    default:
      return {};
  }
};

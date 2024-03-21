// 背景スタイルを設定するためのヘルパー関数ex
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

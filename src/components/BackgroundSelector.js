import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { SelectControl, Button, ColorPalette, GradientPicker } from '@wordpress/components';

const BackgroundSelector = ({ attributes, setAttributes }) => {
  const { backgroundStyleType } = attributes;

  const handleMediaSelect = (media) => {
    if (!media) {
      setAttributes({
        backgroundImage: null,
        selectedMedia: null,
      });
      return;
    }

    const selectedMediaUrl = media.url;
    setAttributes({
      backgroundImage: selectedMediaUrl,
      selectedMedia: selectedMediaUrl,
    });
  };

  const handleColorChange = (color) => {
    // setBackgroundColor(color);
    setAttributes({ backgroundColor: color });
  };

  const handleGradientChange = (newGradient) => {
    setAttributes({ backgroundGradient: newGradient });
  };

  const handleBackgroundStyleChange = (newStyleType) => {
    setAttributes({ ...attributes, backgroundStyleType: newStyleType });
  };

  const formStyle = {
    width: '100%',
    textAlign: 'center',
    textAlign: 'left',
    paddingTop: '15px',
  }

  const flexCol = {
    display: 'flex',
    flexDirection: 'column',
  }

  const selectorStyle = {
    width: '83%',
    alignSelf: 'end',
    paddingTop: '10px',
  }

  const imageUploadButton = {
    textAlign: 'center',
    width: '50%',
  }

  const backgroundControlLabel = (
    <span style={{ display: 'block', transform: 'translateX(33%)' }}>背景</span>
  )

  return (
    <div style={flexCol} className='jwc-back-ground--wrapper'>
      <div className='jwc-back-ground' style={formStyle}>
        <SelectControl
          label={backgroundControlLabel}
          value={attributes.backgroundStyleType} // 現在の値をattributesから取得
          options={[
            { label: '画像', value: 'image' },
            { label: 'カラー', value: 'color' },
            { label: 'グラデーション', value: 'gradient' },
          ]}
          onChange={handleBackgroundStyleChange} // ここで新しい関数を使用します
        />
      </div>
      <div style={{...selectorStyle, ...imageUploadButton}} className='jwc-back-ground__image'>
        {backgroundStyleType === 'image' && (
          <MediaUploadCheck>
            <MediaUpload
              onSelect={handleMediaSelect}
              allowedTypes={['image']}
              value={attributes.backgroundImage}
              render={({ open }) => <Button className='button-insert' onClick={open}>メディアライブラリを開いて画像を選択</Button>}
            />
          </MediaUploadCheck>
        )}
        {backgroundStyleType === 'color' && (
          <ColorPalette
            onChange={handleColorChange}
            value={attributes.backgroundColor}
          />
        )}
        {backgroundStyleType === 'gradient' && (
          <GradientPicker
            value={attributes.backgroundGradient}
            onChange={handleGradientChange}
            gradients={[
              {
                name: 'JShine',
                gradient:
                  'linear-gradient(135deg,#12c2e9 0%,#c471ed 50%,#f64f59 100%)',
                slug: 'jshine',
              },
              {
                name: 'Moonlit Asteroid',
                gradient:
                  'linear-gradient(135deg,#0F2027 0%, #203A43 0%, #2c5364 100%)',
                slug: 'moonlit-asteroid',
              },
              {
                name: 'Rastafarie',
                gradient:
                  'linear-gradient(135deg,#1E9600 0%, #FFF200 0%, #FF0000 100%)',
                slug: 'rastafari',
              },
            ]}
          />
        )}
      </div>
    </div>
  );
};

export default BackgroundSelector;

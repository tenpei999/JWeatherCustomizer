import { useState } from '@wordpress/element';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { SelectControl, Button, ColorPalette, GradientPicker } from '@wordpress/components';
import styles from '../objects/styles';

/**
 * A control component for selecting a background style.
 * It allows users to select an option and updates the parent component's state accordingly.
 */
const BackgroundSelector = ({ attributes, setAttributes }) => {
  const { backgroundStyleType } = attributes;
  const [urlError, setUrlError] = useState('');
  const [colorError, setColorError] = useState('');
  const [gradientError, setGradientError] = useState('');

  // Validates if the provided URL is correctly formatted.
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  // Validates if the provided color is in a valid hex format.
  const isValidColor = (color) => /^#[0-9A-F]{6}$/i.test(color);

  // Validates if the provided gradient string is in a valid linear-gradient format.
  const isValidGradient = (gradient) => /^linear-gradient\((.+)\)$/i.test(gradient);

  // Handles media selection from the WordPress media library.
  const handleMediaSelect = (media) => {
    if (!media || !isValidUrl(media.url)) {
      setUrlError('不正な画像URLです。');
      setAttributes({
        backgroundImage: null,
        selectedMedia: null,
      });
      return;
    }
    setUrlError('');
    setAttributes({
      backgroundImage: media.url,
      selectedMedia: media.url,
    });
  };

  // Handles changes to the background color, including validation.
  const handleColorChange = (color) => {
    if (!isValidColor(color)) {
      setColorError('不正なカラーコードです。');
      return;
    }
    setColorError('');
    setAttributes({ backgroundColor: color });
  };

  // Handles changes to the background gradient, including validation.
  const handleGradientChange = (newGradient) => {
    if (!isValidGradient(newGradient)) {
      setGradientError('不正なグラディエントです。');
      return;
    }
    setGradientError('');
    setAttributes({ backgroundGradient: newGradient });
  };

  // Updates the attribute for the background style type when it's changed.
  const handleBackgroundStyleChange = (newStyleType) => {
    setAttributes({ ...attributes, backgroundStyleType: newStyleType });
  };

  const backgroundControlLabel = (
    <span style={{ display: 'block', transform: 'translateX(33%)' }}>背景</span>
  )

  return (
    <div style={styles.flexCol} className='jwc-back-ground--wrapper'>
      <div className='jwc-back-ground' style={styles.formStyle}>
        <SelectControl
          label={backgroundControlLabel}
          value={attributes.backgroundStyleType} // Current selection value.
          options={[
            { label: '画像', value: 'image' },
            { label: 'カラー', value: 'color' },
            { label: 'グラデーション', value: 'gradient' },
          ]}
          onChange={handleBackgroundStyleChange} // Function to execute on selection change.
        />
        {urlError && <p style={styles.validErrorStyle}>{urlError}</p>}
        {colorError && <p style={styles.validErrorStyle}>{colorError}</p>}
        {gradientError && <p style={styles.validErrorStyle}>{gradientError}</p>}
      </div>
      <div style={{ ...styles.selectorStyle, ...styles.imageUploadButton }} className='jwc-back-ground__image'>
        {backgroundStyleType === 'image' && (
          <div>
            <MediaUploadCheck>
              <MediaUpload
                onSelect={handleMediaSelect} // Function to call when a media item is selected.
                allowedTypes={['image']}
                value={attributes.backgroundImage}
                render={({ open }) => <Button className='button-insert' onClick={open}>メディアライブラリを開いて画像を選択</Button>}
              />
            </MediaUploadCheck>
          </div>
        )}
        {backgroundStyleType === 'color' && (
          <ColorPalette
            onChange={handleColorChange} // Function to call when a new color is selected.
            value={attributes.backgroundColor}
          />
        )}
        {backgroundStyleType === 'gradient' && (
          <div>
            <GradientPicker
              value={attributes.backgroundGradient}
              onChange={handleGradientChange} // Function to call when a new gradient is selected.
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
          </div>
        )}
      </div>
    </div>
  );
};

export default BackgroundSelector;

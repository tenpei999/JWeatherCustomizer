import { __ } from '@wordpress/i18n';
import { RangeControl, SelectControl } from '@wordpress/components';
import { __experimentalBorderBoxControl as BorderBoxControl } from '@wordpress/components';
import { useBorderControl } from '../hooks/useBorderControl';
import styles from '../objects/styles';

export default function BorderControlGroup({ attributes, setAttributes }) {
    const {
        borders,
        onChangeBorder,
        handleRangeChange,
        handleUnitChange,
        borderColors,
        units,
        newBorderSetErrorMessage,
        handleRangeChangeErrorMessage,
        handleUnitChangeErrorMessage,
    } = useBorderControl(attributes, setAttributes);

    return (
        <>
            <div className='jwc-border-main' style={styles.borderMainStyle}>
                <BorderBoxControl
                    colors={borderColors} 
                    label={('枠線の色と形')}
                    onChange={onChangeBorder}
                    value={borders}
                />
                {newBorderSetErrorMessage && <p style={styles.validErrorStyle}>{newBorderSetErrorMessage}</p>}
            </div>
            <div className='jwc-border-radius' style={styles.radiusStyle}>
                <div style={styles.valueStyle}>
                    <RangeControl
                        label="丸み"
                        value={parseInt(attributes.borderRadiusValue, 10)}
                        onChange={handleRangeChange}
                        min={0}
                        max={(attributes.borderRadiusValue && attributes.borderRadiusValue.includes('px')) ? 100 : 100}
                    />
                    {handleRangeChangeErrorMessage && <p style={styles.validErrorStyle}>{handleRangeChangeErrorMessage}</p>}
                </div>
                <div style={styles.unitStyle}>
                    <SelectControl
                        value={attributes.borderRadiusValue && attributes.borderRadiusValue.replace(/[0-9]/g, '')}
                        options={units}
                        onChange={handleUnitChange}
                    />
                    {handleUnitChangeErrorMessage && <p style={styles.validErrorStyle}>{handleUnitChangeErrorMessage}</p>}
                </div>
            </div>
        </>
    );
}

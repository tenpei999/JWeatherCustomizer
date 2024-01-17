// BorderControlGroup.js
import { __ } from '@wordpress/i18n';
import { RangeControl, SelectControl } from '@wordpress/components';
import { __experimentalBorderBoxControl as BorderBoxControl } from '@wordpress/components';
import { useBorderControl } from '../functions/useBorderControl';

export default function BorderControlGroup({ attributes, setAttributes }) {
    const {
        borders,
        onChangeBorder,
        handleRangeChange: originalHandleRangeChange,
        handleUnitChange: originalHandleUnitChange,
        borderColors,
        units,
        errorMessage,
    } = useBorderControl(attributes, setAttributes);

    const borderMainStyle = {
        width: '83.5%',
        alignSelf: 'end',
        paddingTop: '15px',
    }

    const radiusStyle = {
        paddingTop: '15px',
        display: 'flex',
        gap: '10px',
        alignItems: 'end',
        alignSelf: 'end',
        width: '83.5%',
    }

    const valueStyle = {
        width: '90%',
    }

    const unitStyle = {
        width: '10%',
    }

    const validErrorStyle = {
        color: 'red',
        transform: 'translateX(23%)'
    }

    console.log(errorMessage)

    return (
        <>
            <div className='jwc-border-main' style={borderMainStyle}>
                <BorderBoxControl
                    colors={borderColors} // ここを変更しました
                    label={('枠線の色と形')}
                    onChange={onChangeBorder}
                    value={borders}
                />
                {errorMessage && <p style={validErrorStyle}>{errorMessage}</p>}
            </div>
            <div className='jwc-border-radius' style={radiusStyle}>
                <div style={valueStyle}>
                    <RangeControl
                        label="丸み"
                        value={parseInt(attributes.borderRadiusValue, 10)}
                        onChange={originalHandleRangeChange} 
                        min={0}
                        max={(attributes.borderRadiusValue && attributes.borderRadiusValue.includes('px')) ? 100 : 100}
                    />
                    {errorMessage && <p style={validErrorStyle}>{errorMessage}</p>}
                </div>
                <div style={unitStyle}>
                    <SelectControl
                        value={attributes.borderRadiusValue && attributes.borderRadiusValue.replace(/[0-9]/g, '')}
                        options={units}
                        onChange={originalHandleUnitChange} 
                    />
                    {errorMessage && <p style={validErrorStyle}>{errorMessage}</p>}
                </div>
            </div>
        </>
    );
}

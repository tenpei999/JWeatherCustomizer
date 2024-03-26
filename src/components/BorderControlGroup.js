import { __ } from '@wordpress/i18n';
import { RangeControl, SelectControl } from '@wordpress/components';
import { __experimentalBorderBoxControl as BorderBoxControl } from '@wordpress/components';
import { useBorderControl } from '../hooks/useBorderControl';
import styles from '../objects/styles';

/**
 * The BorderControlGroup component provides a comprehensive UI for editing border properties
 * of a block or element. It leverages the WordPress components library and a custom hook to
 * offer controls for setting the border color, style, radius, and unit. It showcases how to
 * compose a functional component with stateful logic and conditional rendering based on
 * user interaction and validation.
 * 
 * Features:
 * - Border color and style customization through BorderBoxControl.
 * - Border radius adjustment with a RangeControl.
 * - Selection of border radius units (e.g., px, em) using SelectControl.
 * - Integration of custom hook logic for state management and validation.
 * - Dynamic error messaging based on validation to guide the user.
 * 
 * @param {Object} attributes - Contains the current values of the attributes related to the border.
 * @param {Function} setAttributes - A function provided by WordPress to update attribute values.
 */
export default function BorderControlGroup({ attributes, setAttributes }) {
    // Destructuring properties and methods from the custom hook to manage border attributes and validation.
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
                    colors={borderColors} // Assigns the available border colors.
                    label={('枠線の色と形')}
                    onChange={onChangeBorder} // Handles changes to border color or style.
                    value={borders} // Sets the current border settings.
                />
                {/* Error message display for border setting errors */}
                {newBorderSetErrorMessage && <p style={styles.validErrorStyle}>{newBorderSetErrorMessage}</p>}
            </div>
            {/* Container for border radius and unit selection */}
            <div className='jwc-border-radius' style={styles.radiusStyle}>
                <div style={styles.valueStyle}>
                    <RangeControl
                        label="丸み"
                        value={parseInt(attributes.borderRadiusValue, 10)}
                        onChange={handleRangeChange} // Function to call on value change.
                        min={0} // Minimum value for the control.
                        max={(attributes.borderRadiusValue && attributes.borderRadiusValue.includes('px')) ? 100 : 100}  // Maximum value for the control, dynamic based on the unit.
                    />
                    {handleRangeChangeErrorMessage && <p style={styles.validErrorStyle}>{handleRangeChangeErrorMessage}</p>}
                </div>
                {/* Control for selecting the unit of the border-radius value */}
                <div style={styles.unitStyle}>
                    <SelectControl
                        value={attributes.borderRadiusValue && attributes.borderRadiusValue.replace(/[0-9]/g, '')} // Extracts and sets the current unit for border-radius.
                        options={units} // Available unit options.
                        onChange={handleUnitChange} // Function to call on unit change.

                    />
                    {handleUnitChangeErrorMessage && <p style={styles.validErrorStyle}>{handleUnitChangeErrorMessage}</p>}
                </div>
            </div>
        </>
    );
}

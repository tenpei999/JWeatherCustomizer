import { CheckboxControl } from '@wordpress/components';
import PropTypes from 'prop-types';
import { useState, useEffect } from '@wordpress/element';

/**
 * Provides a UI for toggling visibility settings of various elements. This component
 * is divided into two groups and manages local state for immediate feedback and special
 * conditions for disabling/enabling checkboxes based on certain criteria.
 * 
 * @param {Object} props - Component properties.
 * @param {Array} props.settings - An array of visibility settings, each with a label, checked state, and onChange handler.
 */
const VisibilityControl = ({ settings, onUpdateGroup1Count }) => {
    // Local state to manage the visibility settings and special conditions for interactions.
    const [localSettings, setLocalSettings] = useState(settings);

    const [isSpecialCheckboxClicked, setIsSpecialCheckboxClicked] = useState(false);
    const [clickedCheckboxIndex, setClickedCheckboxIndex] = useState(null);

    // Divide the settings into two groups for separate rendering.
    const group1 = settings.slice(0, 3);
    const group2 = settings.slice(3);
    const onCountGroup1 = group1.filter(setting => setting.checked).length;

    // Synchronize local state with props.
    useEffect(() => {
        setLocalSettings(settings);
    }, [settings]);

    // Update the parent component with the new count of checked checkboxes in group1
    // whenever the localSettings state changes.
    useEffect(() => {
        const newCount = localSettings.slice(0, 3).filter(setting => setting.checked).length;
        onUpdateGroup1Count(newCount);
    }, [localSettings, onUpdateGroup1Count]);

    // Special condition handling: Resets the special click state after a short delay.
    useEffect(() => {
        if (isSpecialCheckboxClicked) {
            const timer = setTimeout(() => {
                setIsSpecialCheckboxClicked(false);
            }, 150);
            return () => clearTimeout(timer);
        }
    }, [isSpecialCheckboxClicked]);


    /**
     * Handles changes to visibility checkboxes, including special logic for preventing
     * the last checkbox in group 1 from being unchecked under certain conditions.
     * 
     * @param {number} index - The index of the checkbox being changed.
     * @param {boolean} isChecked - Whether the checkbox is being checked or unchecked.
     */
    const handleVisibilityChange = (index, isChecked) => {
        const updatedSettings = [...localSettings];

        // Prevent unchecking the last checkbox in group 1 if it's the only one checked.
        if (onCountGroup1 === 1 && !isChecked && index < 3) {
            setClickedCheckboxIndex(index);
            setIsSpecialCheckboxClicked(true);
            return;
        }

        updatedSettings[index] = { ...updatedSettings[index], checked: isChecked };
        setLocalSettings(updatedSettings);
        updatedSettings[index].onChange(isChecked);
    };

    /**
     * Determines the class name for checkbox wrappers, applying a special class
     * for faded effect when necessary based on special click conditions.
     * 
     * @param {number} index - The index of the checkbox.
     * @returns {string} The class name for the checkbox wrapper.
     */
    const getCheckboxWrapperClass = (index) => {
        if (isSpecialCheckboxClicked && onCountGroup1 === 1 && index === clickedCheckboxIndex) {
            return 'faded-checkbox';
        }
        return '';
    };


    const boxStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: '15px',
    }

    const columnStyle = {
        display: 'flex',
        gap: '15px',
        width: '50%',
    }

    const validErrorStyle = {
        color: 'red',
        transform: 'translateX(23%)'
    }

    return (
        <div className="jwc-visibility-control" style={boxStyle}>
            <div className='jwc-visibility-control__title'>
                <p style={{ fontSize: '20px' }}>表示設定</p>
            </div>
            <div style={columnStyle}>
                <div className="visibility-group" id="group1">
                    {group1.map((setting, index) => (
                        <div className={getCheckboxWrapperClass(index)}>
                            <CheckboxControl
                                key={index}
                                label={setting.label}
                                checked={setting.checked}
                                onChange={(isChecked) => handleVisibilityChange(index, isChecked)}
                            />
                        </div>
                    ))}
                </div>
                <div className="visibility-group" id="group2">
                    {group2.map((setting, index) => (
                        <CheckboxControl
                            key={index + group1.length}
                            label={setting.label}
                            checked={setting.checked}
                            onChange={(isChecked) => handleVisibilityChange(index + group1.length, isChecked)}
                        />
                    ))}
                </div>
            </div>
        </div >
    );
};

/**
 * PropTypes validation for the VisibilityControl component.
 * Ensures that settings passed to the component conform to the expected structure,
 * containing a label, a checked state, and an onChange handler for each setting.
 */
VisibilityControl.propTypes = {
    settings: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired, // The label for the visibility setting.
            checked: PropTypes.bool.isRequired, // The current checked state of the setting.
            onChange: PropTypes.func.isRequired, // Function to call when the checked state changes.
        })
    ).isRequired, // The settings array is required for the component to function properly.
};

export default VisibilityControl;

import { CheckboxControl } from '@wordpress/components';
import PropTypes from 'prop-types'; // プロパティのバリデーションのための追加
import { useState, useEffect } from '@wordpress/element';

const VisibilityControl = ({ settings }) => {
    const [localSettings, setLocalSettings] = useState(settings);
    const [isSpecialCheckboxClicked, setIsSpecialCheckboxClicked] = useState(false);
    const [clickedCheckboxIndex, setClickedCheckboxIndex] = useState(null);
    const group1 = settings.slice(0, 3); // 最初の3つ
    const group2 = settings.slice(3);    // 残りの2つ
    const onCountGroup1 = group1.filter(setting => setting.checked).length; 

    useEffect(() => {
        setLocalSettings(settings);
    }, [settings]);

    useEffect(() => {
        if (isSpecialCheckboxClicked) {
            const timer = setTimeout(() => {
                setIsSpecialCheckboxClicked(false);
            }, 150);
            return () => clearTimeout(timer);
        }
    }, [isSpecialCheckboxClicked]);

    const handleVisibilityChange = (index, isChecked) => {
        const updatedSettings = [...localSettings];

        if (onCountGroup1 === 1 && !isChecked && index < 3) {
            setClickedCheckboxIndex(index);
            setIsSpecialCheckboxClicked(true);
            return;
        }
    
        updatedSettings[index] = { ...updatedSettings[index], checked: isChecked };
        setLocalSettings(updatedSettings);
        updatedSettings[index].onChange(isChecked);
    };

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
                <div className="visibility-group"id="group1">
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
                            key={index + group1.length} // インデックスを調整
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

VisibilityControl.propTypes = {
    settings: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            checked: PropTypes.bool.isRequired,
            onChange: PropTypes.func.isRequired,
        })
    ).isRequired,
};

export default VisibilityControl;

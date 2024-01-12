import { CheckboxControl } from '@wordpress/components';
import PropTypes from 'prop-types'; // プロパティのバリデーションのための追加

const VisibilityControl = ({ settings }) => {

    const group1 = settings.slice(0, 4); // 最初の3つ
    const group2 = settings.slice(4);    // 残りの2つ

    const handleVisibilityChange = (index, isChecked) => {
        const updatedSettings = [...settings];
        updatedSettings[index].checked = isChecked;
        updatedSettings[index].onChange(isChecked);
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

    return (
        <div className="jwc-visibility-control" style={boxStyle}>
            <div className='jwc-visibility-control__title'>
                <p style={{ fontSize: '20px' }}>表示設定</p>
            </div>
            <div style={columnStyle}>
                <div className="visibility-group" id="group1">
                    {group1.map((setting, index) => (
                        <CheckboxControl
                            key={index}
                            label={setting.label}
                            checked={setting.checked}
                            onChange={(isChecked) => handleVisibilityChange(index, isChecked)}
                        />
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

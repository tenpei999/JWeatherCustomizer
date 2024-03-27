/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/BackgroundSelector.js":
/*!**********************************************!*\
  !*** ./src/components/BackgroundSelector.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _objects_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../objects/styles */ "./src/objects/styles.js");






/**
 * A control component for selecting a background style.
 * It allows users to select an option and updates the parent component's state accordingly.
 */
const BackgroundSelector = ({
  attributes,
  setAttributes
}) => {
  const {
    backgroundStyleType
  } = attributes;
  const [urlError, setUrlError] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [colorError, setColorError] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [gradientError, setGradientError] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');

  // Validates if the provided URL is correctly formatted.
  const isValidUrl = url => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  // Validates if the provided color is in a valid hex format.
  const isValidColor = color => /^#[0-9A-F]{6}$/i.test(color);

  // Validates if the provided gradient string is in a valid linear-gradient format.
  const isValidGradient = gradient => /^linear-gradient\((.+)\)$/i.test(gradient);

  // Handles media selection from the WordPress media library.
  const handleMediaSelect = media => {
    if (!media || !isValidUrl(media.url)) {
      setUrlError('不正な画像URLです。');
      setAttributes({
        backgroundImage: null,
        selectedMedia: null
      });
      return;
    }
    setUrlError('');
    setAttributes({
      backgroundImage: media.url,
      selectedMedia: media.url
    });
  };

  // Handles changes to the background color, including validation.
  const handleColorChange = color => {
    if (!isValidColor(color)) {
      setColorError('不正なカラーコードです。');
      return;
    }
    setColorError('');
    setAttributes({
      backgroundColor: color
    });
  };

  // Handles changes to the background gradient, including validation.
  const handleGradientChange = newGradient => {
    if (!isValidGradient(newGradient)) {
      setGradientError('不正なグラディエントです。');
      return;
    }
    setGradientError('');
    setAttributes({
      backgroundGradient: newGradient
    });
  };

  // Updates the attribute for the background style type when it's changed.
  const handleBackgroundStyleChange = newStyleType => {
    setAttributes({
      ...attributes,
      backgroundStyleType: newStyleType
    });
  };
  const backgroundControlLabel = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    style: {
      display: 'block',
      transform: 'translateX(33%)'
    }
  }, "\u80CC\u666F");
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: _objects_styles__WEBPACK_IMPORTED_MODULE_3__["default"].flexCol,
    className: "jwc-back-ground--wrapper"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "jwc-back-ground",
    style: _objects_styles__WEBPACK_IMPORTED_MODULE_3__["default"].formStyle
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
    label: backgroundControlLabel,
    value: attributes.backgroundStyleType // Current selection value.
    ,
    options: [{
      label: '画像',
      value: 'image'
    }, {
      label: 'カラー',
      value: 'color'
    }, {
      label: 'グラデーション',
      value: 'gradient'
    }],
    onChange: handleBackgroundStyleChange // Function to execute on selection change.
  }), urlError && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    style: _objects_styles__WEBPACK_IMPORTED_MODULE_3__["default"].validErrorStyle
  }, urlError), colorError && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    style: _objects_styles__WEBPACK_IMPORTED_MODULE_3__["default"].validErrorStyle
  }, colorError), gradientError && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    style: _objects_styles__WEBPACK_IMPORTED_MODULE_3__["default"].validErrorStyle
  }, gradientError)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      ..._objects_styles__WEBPACK_IMPORTED_MODULE_3__["default"].selectorStyle,
      ..._objects_styles__WEBPACK_IMPORTED_MODULE_3__["default"].imageUploadButton
    },
    className: "jwc-back-ground__image"
  }, backgroundStyleType === 'image' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaUploadCheck, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaUpload, {
    onSelect: handleMediaSelect // Function to call when a media item is selected.
    ,
    allowedTypes: ['image'],
    value: attributes.backgroundImage,
    render: ({
      open
    }) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
      className: "button-insert",
      onClick: open
    }, "\u30E1\u30C7\u30A3\u30A2\u30E9\u30A4\u30D6\u30E9\u30EA\u3092\u958B\u3044\u3066\u753B\u50CF\u3092\u9078\u629E")
  }))), backgroundStyleType === 'color' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ColorPalette, {
    onChange: handleColorChange // Function to call when a new color is selected.
    ,
    value: attributes.backgroundColor
  }), backgroundStyleType === 'gradient' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.GradientPicker, {
    value: attributes.backgroundGradient,
    onChange: handleGradientChange // Function to call when a new gradient is selected.
    ,
    gradients: [{
      name: 'JShine',
      gradient: 'linear-gradient(135deg,#12c2e9 0%,#c471ed 50%,#f64f59 100%)',
      slug: 'jshine'
    }, {
      name: 'Moonlit Asteroid',
      gradient: 'linear-gradient(135deg,#0F2027 0%, #203A43 0%, #2c5364 100%)',
      slug: 'moonlit-asteroid'
    }, {
      name: 'Rastafarie',
      gradient: 'linear-gradient(135deg,#1E9600 0%, #FFF200 0%, #FF0000 100%)',
      slug: 'rastafari'
    }]
  }))));
};
/* harmony default export */ __webpack_exports__["default"] = (BackgroundSelector);

/***/ }),

/***/ "./src/components/BalanceControl.js":
/*!******************************************!*\
  !*** ./src/components/BalanceControl.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _objects_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../objects/styles */ "./src/objects/styles.js");





/**
 * A control component for selecting a font balance option.
 * It allows users to select an option and updates the parent component's state accordingly.
 * 
 * @param {Object} props Component properties.
 * @param {Object} props.selectedOption The currently selected option.
 * @param {Function} props.setSelectedOption Function to update the parent component's state with the selected option.
 * @param {Array} props.fontBalanceOptions An array of options for the font balance.
 * @returns JSX.Element The rendered component.
 */
const BalanceControl = ({
  selectedOption,
  setSelectedOption,
  fontBalanceOptions
}) => {
  const [error, setError] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(''); // State for managing validation error messages.

  /**
   * Handles changes to the selected option. It validates the selection and updates the state accordingly.
   * If the selected option is valid, it updates the parent component's state; otherwise, sets an error message.
   * 
   * @param {string} label The label of the selected option.
   */
  const handleOptionChange = label => {
    const option = fontBalanceOptions.find(opt => opt.label === label);
    if (option) {
      setSelectedOption(option); // Update the parent component's state with the selected option.
      setError(''); // Clear any existing error message.
    } else {
      setError('選択されたオプションが見つかりません。');
    }
  };

  // Label for the balance control with custom styles applied.
  const balanceControlLabel = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    style: {
      display: 'block',
      transform: 'translateX(33%)'
    }
  }, " \u30D0\u30E9\u30F3\u30B9");
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "jwc-font-balance",
    style: _objects_styles__WEBPACK_IMPORTED_MODULE_2__["default"].formStyle
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: balanceControlLabel,
    value: selectedOption.label,
    options: fontBalanceOptions.map(opt => ({
      label: opt.label,
      value: opt.label
    })),
    onChange: handleOptionChange // Handler for when a new option is selected.
  }), error && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    style: _objects_styles__WEBPACK_IMPORTED_MODULE_2__["default"].validErrorStyle
  }, error));
};
/* harmony default export */ __webpack_exports__["default"] = (BalanceControl);

/***/ }),

/***/ "./src/components/BorderControlGroup.js":
/*!**********************************************!*\
  !*** ./src/components/BorderControlGroup.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ BorderControlGroup; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _hooks_useBorderControl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../hooks/useBorderControl */ "./src/hooks/useBorderControl.js");
/* harmony import */ var _objects_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../objects/styles */ "./src/objects/styles.js");







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
function BorderControlGroup({
  attributes,
  setAttributes
}) {
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
    handleUnitChangeErrorMessage
  } = (0,_hooks_useBorderControl__WEBPACK_IMPORTED_MODULE_3__.useBorderControl)(attributes, setAttributes);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "jwc-border-main",
    style: _objects_styles__WEBPACK_IMPORTED_MODULE_4__["default"].borderMainStyle
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalBorderBoxControl, {
    colors: borderColors // Assigns the available border colors.
    ,
    label: '枠線の色と形',
    onChange: onChangeBorder // Handles changes to border color or style.
    ,
    value: borders // Sets the current border settings.
  }), newBorderSetErrorMessage && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    style: _objects_styles__WEBPACK_IMPORTED_MODULE_4__["default"].validErrorStyle
  }, newBorderSetErrorMessage)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "jwc-border-radius",
    style: _objects_styles__WEBPACK_IMPORTED_MODULE_4__["default"].radiusStyle
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: _objects_styles__WEBPACK_IMPORTED_MODULE_4__["default"].valueStyle
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
    label: "\u4E38\u307F",
    value: parseInt(attributes.borderRadiusValue, 10),
    onChange: handleRangeChange // Function to call on value change.
    ,
    min: 0 // Minimum value for the control.
    ,
    max: attributes.borderRadiusValue && attributes.borderRadiusValue.includes('px') ? 100 : 100 // Maximum value for the control, dynamic based on the unit.
  }), handleRangeChangeErrorMessage && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    style: _objects_styles__WEBPACK_IMPORTED_MODULE_4__["default"].validErrorStyle
  }, handleRangeChangeErrorMessage)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: _objects_styles__WEBPACK_IMPORTED_MODULE_4__["default"].unitStyle
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
    value: attributes.borderRadiusValue && attributes.borderRadiusValue.replace(/[0-9]/g, '') // Extracts and sets the current unit for border-radius.
    ,
    options: units // Available unit options.
    ,
    onChange: handleUnitChange // Function to call on unit change.
  }), handleUnitChangeErrorMessage && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    style: _objects_styles__WEBPACK_IMPORTED_MODULE_4__["default"].validErrorStyle
  }, handleUnitChangeErrorMessage))));
}

/***/ }),

/***/ "./src/components/CurrentWeather.js":
/*!******************************************!*\
  !*** ./src/components/CurrentWeather.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CurrentWeather: function() { return /* binding */ CurrentWeather; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Temp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Temp */ "./src/components/Temp.js");
/* harmony import */ var _TimeZone__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TimeZone */ "./src/components/TimeZone.js");
/* harmony import */ var _hooks_useBorderStyles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../hooks/useBorderStyles */ "./src/hooks/useBorderStyles.js");
/* harmony import */ var _hooks_getBackgroundStyles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../hooks/getBackgroundStyles */ "./src/hooks/getBackgroundStyles.js");
/* harmony import */ var _hooks_getTextColor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../hooks/getTextColor */ "./src/hooks/getTextColor.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../style.scss */ "./src/style.scss");








/**
 * Renders the current weather conditions with customizable styles.
 * Utilizes custom hooks and components to display weather data dynamically based on props.
 * 
 * @param {Object} props - Properties passed to the component including weather data and style preferences.
 * @returns JSX.Element | null - The CurrentWeather component or null if weather data is missing.
 */
const CurrentWeather = ({
  borders,
  borderRadius,
  fontFamily,
  color,
  weather,
  title,
  showPrecipitation,
  showHoliday,
  styleVariant,
  backgroundStyleType,
  selectedMedia,
  backgroundGradient,
  backgroundColor
}) => {
  const textColor = (0,_hooks_getTextColor__WEBPACK_IMPORTED_MODULE_5__["default"])(weather);

  // Return null early if weather data is not provided.
  if (!weather || !weather.day) return null;
  const borderStyles = (0,_hooks_useBorderStyles__WEBPACK_IMPORTED_MODULE_3__["default"])(borders);
  const backgroundStyles = (0,_hooks_getBackgroundStyles__WEBPACK_IMPORTED_MODULE_4__.getBackgroundStyles)({
    backgroundStyleType,
    selectedMedia,
    backgroundColor,
    backgroundGradient
  });
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("article", {
    className: `block--current ${styleVariant}`,
    style: {
      ...borderStyles,
      borderRadius: borderRadius,
      fontFamily: fontFamily,
      ...backgroundStyles,
      color
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, title), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
    style: {
      color: textColor
    }
  }, weather.day.date.fullDate), showHoliday && weather.day.isHoliday && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, weather.day.holidayName), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "weather__name"
  }, weather.name), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: weather.image,
    alt: "weather icon"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Temp__WEBPACK_IMPORTED_MODULE_1__["default"], {
    weather: weather
  }), showPrecipitation && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_TimeZone__WEBPACK_IMPORTED_MODULE_2__["default"], {
    weather: weather
  }));
};


/***/ }),

/***/ "./src/components/FontFamilyControl.js":
/*!*********************************************!*\
  !*** ./src/components/FontFamilyControl.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _objects_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../objects/styles */ "./src/objects/styles.js");





/**
 * Provides a control for selecting a font family from a predefined list of allowed fonts.
 * Validates the selected font and updates the parent component's state with the new selection.
 * Displays an error message if an invalid font is selected.
 * 
 * @param {Object} props The component props.
 * @param {string} props.fontFamily The current font family selected.
 * @param {Function} props.setFontFamily The function to update the font family in the parent component.
 */
function FontFamilyControl({
  fontFamily,
  setFontFamily
}) {
  // List of allowed fonts that users can select from.
  const allowedFonts = ["NotoSans, sans-serif", "NotoSerif, serif", "MPLUS1, sans-serif", "KosugiMaru, sans-serif", "SawarabiGothic, sans-serif"];
  const [error, setError] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');

  // Validates if the selected font family is allowed.
  const isValidFontFamily = font => allowedFonts.includes(font);

  /**
  * Handles changes to the font family selection. Updates the parent component's state
  * with the new selection if it is valid, or sets an error message otherwise.
  * 
  * @param {string} newFontFamily The new font family selected by the user.
  */
  const handleOnChange = newFontFamily => {
    if (isValidFontFamily(newFontFamily)) {
      setFontFamily(newFontFamily);
      setError('');
    } else {
      setError('無効なフォントが選択されました');
    }
  };
  const changeFontLavel = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    style: {
      display: 'block',
      transform: 'translateX(33%)'
    }
  }, " \u30D5\u30A9\u30F3\u30C8\u3092\u9078\u629E");
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: _objects_styles__WEBPACK_IMPORTED_MODULE_2__["default"].formStyle,
    className: "jwc-change-font"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: changeFontLavel,
    value: fontFamily,
    options: [{
      label: 'Noto Sans JP',
      value: "NotoSans, sans-serif"
    }, {
      label: 'Noto Serif JP',
      value: "NotoSerif, serif"
    }, {
      label: 'M PLUS 1p',
      value: "MPLUS1, sans-serif"
    }, {
      label: 'Kosugi Maru',
      value: "KosugiMaru, sans-serif"
    }, {
      label: 'Sawarabi Gothic',
      value: "SawarabiGothic, sans-serif"
    }],
    onChange: handleOnChange
  })), error && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    style: _objects_styles__WEBPACK_IMPORTED_MODULE_2__["default"].validErrorStyle
  }, error));
}
;
/* harmony default export */ __webpack_exports__["default"] = (FontFamilyControl);

/***/ }),

/***/ "./src/components/Preview.js":
/*!***********************************!*\
  !*** ./src/components/Preview.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Preview; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _CurrentWeather__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CurrentWeather */ "./src/components/CurrentWeather.js");
/* harmony import */ var _WeekWeather__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./WeekWeather */ "./src/components/WeekWeather.js");
/* harmony import */ var _weatherDate_fetchWeatherData__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../weatherDate/fetchWeatherData */ "./src/weatherDate/fetchWeatherData.js");
/* harmony import */ var _hooks_handleWeatherError__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../hooks/handleWeatherError */ "./src/hooks/handleWeatherError.js");
/* harmony import */ var _ResponseError__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ResponseError */ "./src/components/ResponseError.js");









/**
 * The Preview component displays current and weekly weather information based on the attributes passed to it.
 * It handles API errors and displays appropriate error messages when necessary.
 * 
 * @param {Object} props The component props.
 * @param {Object} props.attributes Attributes passed from the parent component, including weather data and display preferences.
 * @param {Object} props.commonProps Common properties passed to child components.
 */
function Preview({
  attributes,
  commonProps
}) {
  const {
    showTodayWeather,
    showTomorrowWeather,
    showWeeklyWeather,
    todayWeather,
    tomorrowWeather,
    weeklyWeather,
    showHoliday,
    showPrecipitation
  } = attributes;
  const [errorMessage, setErrorMessage] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);

  // Effect hook to check for API errors and set an appropriate error message using a custom handler.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (_weatherDate_fetchWeatherData__WEBPACK_IMPORTED_MODULE_4__.isApiError.isError) {
      const message = (0,_hooks_handleWeatherError__WEBPACK_IMPORTED_MODULE_5__.handleWeatherError)(_weatherDate_fetchWeatherData__WEBPACK_IMPORTED_MODULE_4__.isApiError);
      if (message) {
        setErrorMessage(message);
      }
    }
  }, [_weatherDate_fetchWeatherData__WEBPACK_IMPORTED_MODULE_4__.isApiError]);

  /**
  * Renders the CurrentWeather component for a given weather data set and title.
  * 
  * @param {Object} weather The weather data for the day.
  * @param {string} title The title to display for this weather data set.
  * @returns JSX.Element | null A CurrentWeather component or null if no weather data is provided.
  */
  const renderCurrentWeather = (weather, title) => {
    if (!weather || !weather.day) return null;
    const isHoliday = weather.day.isHoliday || weather.day.isSunday;
    const textColor = isHoliday ? 'red' : weather.day.isSaturday ? 'blue' : '';
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_CurrentWeather__WEBPACK_IMPORTED_MODULE_2__.CurrentWeather, {
      weather: weather,
      title: title,
      showHoliday: showHoliday,
      showPrecipitation: showPrecipitation,
      ...commonProps,
      textColor: textColor
    });
  };

  // Main render method of the Preview component. Displays an error message if there is an API error, otherwise renders weather information.
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, _weatherDate_fetchWeatherData__WEBPACK_IMPORTED_MODULE_4__.isApiError.isError ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ResponseError__WEBPACK_IMPORTED_MODULE_6__.ResponseError, {
    errorMessage: errorMessage
  }) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "layout"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "today-and-tomorrow weather-layout"
  }, showTodayWeather && renderCurrentWeather(todayWeather, '今日の天気'), showTomorrowWeather && renderCurrentWeather(tomorrowWeather, '明日の天気')), showWeeklyWeather && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_WeekWeather__WEBPACK_IMPORTED_MODULE_3__["default"], {
    weather: weeklyWeather,
    ...commonProps
  })));
}
;

/***/ }),

/***/ "./src/components/ResponseError.js":
/*!*****************************************!*\
  !*** ./src/components/ResponseError.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ResponseError: function() { return /* binding */ ResponseError; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

const ResponseError = ({
  errorMessage
}) => {
  if (!errorMessage) {
    return null;
  }
  const grid = {
    display: 'grid',
    gridTemplateColumn: '1fr',
    gridTemplateRows: '20% 40% 40%',
    border: 'solid #fe8509',
    borderRadius: '50px',
    height: '60vh'
  };
  const title = {
    textAlign: 'center',
    fontSize: '2.5rem',
    fontWeight: 'bold',
    margin: 'auto'
  };
  const image = {
    height: '100%'
  };
  const imageParent = {
    margin: '0 auto',
    paddingBottom: '2.2rem',
    height: '35%',
    position: 'relative'
  };
  const imageBox = {
    width: '50%',
    margin: '0 auto',
    fontWeight: 'bold',
    color: 'red',
    fontSize: '1.2rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'end',
    lineHeight: '1.2'
  };
  const letterSpacing = {
    letterSpacing: '-1px'
  };
  const letterSpacingWide = {
    letterSpacing: '1px'
  };
  const guidance = {
    fontSize: '1.7rem',
    display: 'inline',
    borderBottom: 'solid'
  };
  const noticeBox = {
    width: '70%',
    display: 'inlinBlock',
    margin: 'auto',
    lineHeight: '1.2'
  };
  const supplement = {
    paddingTop: '1rem'
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("article", {
    style: grid
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
    style: title
  }, errorMessage.title), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: imageBox
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "jwc-responseError-imageContainer",
    style: imageParent
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: errorMessage.icon,
    style: image,
    alt: "Error icon"
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, errorMessage.notice), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    style: letterSpacingWide
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    style: letterSpacing
  }, "JWeatherCustomizer"), "\u30A8\u30E9\u30FC:", errorMessage.statuscode)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: noticeBox
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    style: guidance
  }, errorMessage.guidance), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    style: supplement
  }, errorMessage.supplement)));
};

/***/ }),

/***/ "./src/components/SelectCity.js":
/*!**************************************!*\
  !*** ./src/components/SelectCity.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _objects_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../objects/styles */ "./src/objects/styles.js");





/**
 * Renders a select control for choosing a city from a list of options.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.selectedCity - The currently selected city.
 * @param {Array} props.cityOptions - An array of city options to choose from.
 * @param {Function} props.handleCityChange - The function to call when a new city is selected.
 * @returns JSX.Element - A rendered select control component for selecting a city.
 */

const SelectCity = ({
  selectedCity,
  cityOptions,
  handleCityChange
}) => {
  const selectedCityLabel = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    style: {
      display: 'block',
      transform: 'translateX(33%)'
    }
  }, " \u90FD\u5E02\u3092\u9078\u629E");
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: _objects_styles__WEBPACK_IMPORTED_MODULE_2__["default"].formStyle,
    className: "jwc-select-city"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    value: selectedCity.name,
    label: selectedCityLabel,
    options: cityOptions,
    onChange: handleCityChange,
    style: {
      textAlign: 'center'
    }
  }));
};

// Define prop types for component validation.
SelectCity.propTypes = {
  selectedCity: prop_types__WEBPACK_IMPORTED_MODULE_3___default().shape({
    name: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().string).isRequired // The name property of the selectedCity object must be a string.
  }).isRequired,
  // selectedCity object is required.
  cityOptions: prop_types__WEBPACK_IMPORTED_MODULE_3___default().arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_3___default().shape({
    value: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().string).isRequired,
    // Each city option must have a value property as a string.
    label: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().string).isRequired // Each city option must have a label property as a string.
  })).isRequired,
  // cityOptions array is required.
  handleCityChange: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().func).isRequired // handleCityChange function is required.
};

/* harmony default export */ __webpack_exports__["default"] = (SelectCity);

/***/ }),

/***/ "./src/components/SettingGroup.js":
/*!****************************************!*\
  !*** ./src/components/SettingGroup.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SelectCity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SelectCity */ "./src/components/SelectCity.js");
/* harmony import */ var _VisibilityControl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./VisibilityControl */ "./src/components/VisibilityControl.js");
/* harmony import */ var _UIControlGroup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./UIControlGroup */ "./src/components/UIControlGroup.js");





/**
 * A container component that groups together various UI controls for settings.
 * This component encapsulates controls for selecting a city, adjusting visibility,
 * and modifying UI elements like font family and text color.
 * 
 * @param {Object} props - Props containing settings and handler functions.
 */

const SettingGroup = ({
  selectedCity,
  cityOptions,
  handleCityChange,
  visibilitySettings,
  fontFamily,
  onChangeFontFamily,
  textColor,
  setTextColor,
  selectedOption,
  setSelectedOption,
  fontBalanceOptions,
  attributes,
  setAttributes
}) => {
  const wrapperStyle = {
    padding: '10px',
    display: 'flex',
    flexDirection: 'column'
  };
  const spacing = {
    transform: 'translateX(-8.15%)'
  };
  const headingTitle = {
    textAlign: 'center'
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: wrapperStyle
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    style: headingTitle
  }, "\u8A2D\u5B9A"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: spacing
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_SelectCity__WEBPACK_IMPORTED_MODULE_1__["default"], {
    selectedCity: selectedCity,
    cityOptions: cityOptions,
    handleCityChange: handleCityChange
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_VisibilityControl__WEBPACK_IMPORTED_MODULE_2__["default"], {
    settings: visibilitySettings
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_UIControlGroup__WEBPACK_IMPORTED_MODULE_3__["default"], {
    fontFamily: fontFamily,
    onChangeFontFamily: onChangeFontFamily,
    textColor: textColor,
    setTextColor: setTextColor,
    selectedOption: selectedOption,
    setSelectedOption: setSelectedOption,
    fontBalanceOptions: fontBalanceOptions,
    attributes: attributes,
    setAttributes: setAttributes
  })));
};
/* harmony default export */ __webpack_exports__["default"] = (SettingGroup);

/***/ }),

/***/ "./src/components/Temp.js":
/*!********************************!*\
  !*** ./src/components/Temp.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Displays the highest and lowest temperatures for a given day, along with temperature comparisons
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.weather - The weather data containing temperature information.
 * @returns JSX.Element | null - A list of temperature readings or null if the weather data is not valid.
 */

const Temp = ({
  weather
}) => {
  // Checks if the weather data is valid. If not, returns null to render nothing.
  if (!weather || typeof weather !== 'object') {
    return null;
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
    className: "temp"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    className: "highestAndComparison"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "highest"
  }, weather.highestTemperature, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "celsius"
  }, "\u2103")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "comparison"
  }, weather.maximumTemperatureComparison)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    className: "lowestAndComparison"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "lowest"
  }, weather.lowestTemperature, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "celsius"
  }, "\u2103")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "comparison"
  }, weather.lowestTemperatureComparison)));
};
/* harmony default export */ __webpack_exports__["default"] = (Temp);

/***/ }),

/***/ "./src/components/TextColorControl.js":
/*!********************************************!*\
  !*** ./src/components/TextColorControl.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);




/**
 * Provides a control for selecting a text color. Validates the selected color
 * against a list of allowed values and updates the parent component's attributes
 * with the new selection. Displays an error message if an invalid color is selected.
 *
 * @param {Object} props - The component props.
 * @param {string} props.textColor - The current text color selected.
 * @param {Function} props.setAttributes - The function to update attributes in the parent component.
 */
function TextColorControl({
  textColor,
  setAttributes
}) {
  const [error, setError] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');

  // Function to validate if the selected color is one of the allowed options.
  const isValidTextColor = color => ['black', 'white'].includes(color);

  // Handles changes to the text color selection. Updates the parent component's state if valid,
  // or sets an error message if invalid.
  const handleOnChangeTextColor = newTextColor => {
    if (isValidTextColor(newTextColor)) {
      setAttributes({
        textColor: newTextColor
      });
      setError('');
    } else {
      setError('無効なテキストの色が選択されました');
    }
  };
  const formStyle = {
    width: '100%',
    textAlign: 'left',
    paddingTop: '15px'
  };
  const validErrorStyle = {
    color: 'red',
    transform: 'translateX(23%)'
  };
  const textColorControlLabel = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    style: {
      display: 'block',
      transform: 'translateX(33%)'
    }
  }, " \u30C6\u30AD\u30B9\u30C8\u306E\u8272");
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: formStyle,
    className: "jwc-text-color-control"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: textColorControlLabel,
    value: textColor,
    options: [{
      label: '黒',
      value: 'black'
    }, {
      label: '白',
      value: 'white'
    }],
    onChange: handleOnChangeTextColor
  })), error && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    style: validErrorStyle
  }, error));
}
;
/* harmony default export */ __webpack_exports__["default"] = (TextColorControl);

/***/ }),

/***/ "./src/components/TimeZone.js":
/*!************************************!*\
  !*** ./src/components/TimeZone.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Displays the chance of rain for different times throughout the day.
 * This component renders a list showing precipitation probabilities at specific intervals.
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.weather - The weather data containing rain probability information.
 * @returns JSX.Element | null - A list of precipitation probabilities or null if weather data is not provided.
 */

const TimeZone = ({
  weather
}) => {
  if (!weather) return null;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
    className: "time-zone"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    className: "c-weather__chanceOfRain-index"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "time"
  }, "\u6642\u9593"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "rain"
  }, "\u964D\u6C34")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    className: "c-weather__chanceOfRain-timezone1"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "time"
  }, "0\u6642"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    id: "todayschanceOfRain1",
    className: "rain"
  }, weather.rainProbability[0].precipitation_probability, "%")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    className: "c-weather__chanceOfRain-timezone2"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "time"
  }, "6\u6642"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    id: "todayschanceOfRain2",
    className: "rain"
  }, weather.rainProbability[1].precipitation_probability, "%")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    className: "c-weather__chanceOfRain-timezone3"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "time"
  }, "12\u6642"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    id: "todayschanceOfRain3",
    className: "rain"
  }, weather.rainProbability[2].precipitation_probability, "%")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    className: "c-weather__chanceOfRain-timezone4"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "time"
  }, "18\u6642"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    id: "todayschanceOfRain4",
    className: "rain"
  }, weather.rainProbability[3].precipitation_probability, "%")));
};
/* harmony default export */ __webpack_exports__["default"] = (TimeZone);

/***/ }),

/***/ "./src/components/UIControlGroup.js":
/*!******************************************!*\
  !*** ./src/components/UIControlGroup.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _FontFamilyControl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FontFamilyControl */ "./src/components/FontFamilyControl.js");
/* harmony import */ var _TextColorControl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TextColorControl */ "./src/components/TextColorControl.js");
/* harmony import */ var _BackgroundSelector__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BackgroundSelector */ "./src/components/BackgroundSelector.js");
/* harmony import */ var _BorderControlGroup__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./BorderControlGroup */ "./src/components/BorderControlGroup.js");
/* harmony import */ var _BalanceControl__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./BalanceControl */ "./src/components/BalanceControl.js");







/**
 * Groups together various UI control components for setting font family, text color,
 * background style, border properties, and font balance. This allows for centralized
 * management of UI-related settings within a single component.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.fontFamily - The current font family.
 * @param {Function} props.onChangeFontFamily - Function to update the font family.
 * @param {string} props.selectedOption - The current selected option for font balance.
 * @param {Function} props.setSelectedOption - Function to update the selected font balance option.
 * @param {Array} props.fontBalanceOptions - The options available for font balance.
 * @param {Object} props.attributes - General attributes for UI control settings.
 * @param {Function} props.setAttributes - Function to update various UI control settings.
 * 
 * @returns JSX.Element - The rendered UI control group component.
 */

const UIControlGroup = ({
  fontFamily,
  onChangeFontFamily,
  selectedOption,
  setSelectedOption,
  fontBalanceOptions,
  attributes,
  setAttributes
}) => {
  const wrapperStyle = {
    display: 'flex',
    flexDirection: 'column'
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "detail-settings",
    style: wrapperStyle
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_BorderControlGroup__WEBPACK_IMPORTED_MODULE_4__["default"], {
    attributes: attributes,
    setAttributes: setAttributes
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_FontFamilyControl__WEBPACK_IMPORTED_MODULE_1__["default"], {
    fontFamily: fontFamily || attributes.fontFamily,
    setFontFamily: onChangeFontFamily
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_TextColorControl__WEBPACK_IMPORTED_MODULE_2__["default"], {
    textColor: attributes.textColor,
    setAttributes: setAttributes
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_BalanceControl__WEBPACK_IMPORTED_MODULE_5__["default"], {
    selectedOption: selectedOption,
    setSelectedOption: setSelectedOption,
    fontBalanceOptions: fontBalanceOptions
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_BackgroundSelector__WEBPACK_IMPORTED_MODULE_3__["default"], {
    attributes: attributes,
    setAttributes: setAttributes
  }));
};
/* harmony default export */ __webpack_exports__["default"] = (UIControlGroup);

/***/ }),

/***/ "./src/components/VisibilityControl.js":
/*!*********************************************!*\
  !*** ./src/components/VisibilityControl.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);





/**
 * Provides a UI for toggling visibility settings of various elements. This component
 * is divided into two groups and manages local state for immediate feedback and special
 * conditions for disabling/enabling checkboxes based on certain criteria.
 * 
 * @param {Object} props - Component properties.
 * @param {Array} props.settings - An array of visibility settings, each with a label, checked state, and onChange handler.
 */
const VisibilityControl = ({
  settings
}) => {
  // Local state to manage the visibility settings and special conditions for interactions.
  const [localSettings, setLocalSettings] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(settings);
  const [isSpecialCheckboxClicked, setIsSpecialCheckboxClicked] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [clickedCheckboxIndex, setClickedCheckboxIndex] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);

  // Divide the settings into two groups for separate rendering.
  const group1 = settings.slice(0, 3);
  const group2 = settings.slice(3);
  const onCountGroup1 = group1.filter(setting => setting.checked).length;

  // Synchronize local state with props.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setLocalSettings(settings);
  }, [settings]);

  // Special condition handling: Resets the special click state after a short delay.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
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
    updatedSettings[index] = {
      ...updatedSettings[index],
      checked: isChecked
    };
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
  const getCheckboxWrapperClass = index => {
    if (isSpecialCheckboxClicked && onCountGroup1 === 1 && index === clickedCheckboxIndex) {
      return 'faded-checkbox';
    }
    return '';
  };
  const boxStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '15px'
  };
  const columnStyle = {
    display: 'flex',
    gap: '15px',
    width: '50%'
  };
  const validErrorStyle = {
    color: 'red',
    transform: 'translateX(23%)'
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "jwc-visibility-control",
    style: boxStyle
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "jwc-visibility-control__title"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    style: {
      fontSize: '20px'
    }
  }, "\u8868\u793A\u8A2D\u5B9A")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: columnStyle
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "visibility-group",
    id: "group1"
  }, group1.map((setting, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: getCheckboxWrapperClass(index)
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.CheckboxControl, {
    key: index,
    label: setting.label,
    checked: setting.checked,
    onChange: isChecked => handleVisibilityChange(index, isChecked)
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "visibility-group",
    id: "group2"
  }, group2.map((setting, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.CheckboxControl, {
    key: index + group1.length,
    label: setting.label,
    checked: setting.checked,
    onChange: isChecked => handleVisibilityChange(index + group1.length, isChecked)
  })))));
};

/**
 * PropTypes validation for the VisibilityControl component.
 * Ensures that settings passed to the component conform to the expected structure,
 * containing a label, a checked state, and an onChange handler for each setting.
 */
VisibilityControl.propTypes = {
  settings: prop_types__WEBPACK_IMPORTED_MODULE_2___default().arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_2___default().shape({
    label: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string).isRequired,
    // The label for the visibility setting.
    checked: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool).isRequired,
    // The current checked state of the setting.
    onChange: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func).isRequired // Function to call when the checked state changes.
  })).isRequired // The settings array is required for the component to function properly.
};

/* harmony default export */ __webpack_exports__["default"] = (VisibilityControl);

/***/ }),

/***/ "./src/components/WeekWeather.js":
/*!***************************************!*\
  !*** ./src/components/WeekWeather.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Temp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Temp */ "./src/components/Temp.js");
/* harmony import */ var _hooks_useBorderStyles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../hooks/useBorderStyles */ "./src/hooks/useBorderStyles.js");
/* harmony import */ var _hooks_getBackgroundStyles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../hooks/getBackgroundStyles */ "./src/hooks/getBackgroundStyles.js");
/* harmony import */ var _hooks_getTextColor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../hooks/getTextColor */ "./src/hooks/getTextColor.js");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../editor.scss */ "./src/editor.scss");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../style.scss */ "./src/style.scss");








/**
 * Renders weather information for the week. Utilizes custom hooks for applying border
 * and background styles based on component attributes. Each day's weather information
 * includes temperature, condition name, and an icon.
 * 
 * @param {Object} props - Component properties.
 * @param {Object} props.borders - Border style settings.
 * @param {string} props.borderRadius - Border radius setting.
 * @param {string} props.fontFamily - Font family setting.
 * @param {Array} props.weather - Array containing weather data for each day.
 * @param {string} props.color - Text color setting.
 * @param {string} props.styleVariant - Additional CSS class for style variation.
 * @param {string} props.backgroundStyleType - Background style type (image, color, gradient).
 * @param {string} props.selectedMedia - URL for the background image, if applicable.
 * @param {string} props.backgroundGradient - CSS for the background gradient, if applicable.
 * @param {string} props.backgroundColor - Background color setting.
 * @param {boolean} props.showHoliday - Flag to display holidays.
 * 
 * @returns JSX.Element | null - A list of daily weather conditions for the week or null if no weather data is provided.
 */
const WeekWeather = ({
  borders,
  borderRadius,
  fontFamily,
  weather,
  color,
  styleVariant,
  backgroundStyleType,
  selectedMedia,
  backgroundGradient,
  backgroundColor,
  showHoliday
}) => {
  if (!weather || !Array.isArray(weather)) return null;

  // Using custom hooks to get styles for borders and background based on the props.
  const borderStyles = (0,_hooks_useBorderStyles__WEBPACK_IMPORTED_MODULE_2__["default"])(borders);
  const backgroundStyles = (0,_hooks_getBackgroundStyles__WEBPACK_IMPORTED_MODULE_3__.getBackgroundStyles)({
    backgroundStyleType,
    selectedMedia,
    backgroundColor,
    backgroundGradient
  });
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
    className: `block--weekly weather-layout ${styleVariant}`,
    style: {
      ...borderStyles,
      borderRadius: borderRadius,
      fontFamily: fontFamily,
      ...backgroundStyles,
      color
    }
  }, weather.slice(0, 6).map((dayWeather, index) => {
    if (!dayWeather || !dayWeather.day) return null;
    const textColor = (0,_hooks_getTextColor__WEBPACK_IMPORTED_MODULE_4__["default"])(dayWeather);
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
      className: "block--day",
      key: index
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
      className: "c-title__weather",
      style: {
        color: textColor
      }
    }, dayWeather.day.date.month, dayWeather.day.date.day, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), dayWeather.day.date.dayOfWeek), showHoliday && dayWeather.day.isHoliday && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, dayWeather.day.holidayName), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      className: "weather__name"
    }, dayWeather.name), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "weather__img"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: dayWeather.image,
      alt: "Weather Icon"
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Temp__WEBPACK_IMPORTED_MODULE_1__["default"], {
      weather: dayWeather
    }));
  }));
};
/* harmony default export */ __webpack_exports__["default"] = (WeekWeather);

/***/ }),

/***/ "./src/edit.js":
/*!*********************!*\
  !*** ./src/edit.js ***!
  \*********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Edit; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./editor.scss */ "./src/editor.scss");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _components_SettingGroup__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/SettingGroup */ "./src/components/SettingGroup.js");
/* harmony import */ var _hooks_useChangeCity__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./hooks/useChangeCity */ "./src/hooks/useChangeCity.js");
/* harmony import */ var _hooks_useOutsideClick__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./hooks/useOutsideClick */ "./src/hooks/useOutsideClick.js");
/* harmony import */ var _objects_visibilitySettings__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./objects/visibilitySettings */ "./src/objects/visibilitySettings.js");
/* harmony import */ var _weatherDate_getSpotWeather__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./weatherDate/getSpotWeather */ "./src/weatherDate/getSpotWeather.js");
/* harmony import */ var _hooks_useFontFamilyControl__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./hooks/useFontFamilyControl */ "./src/hooks/useFontFamilyControl.js");
/* harmony import */ var _hooks_useChangeBalance__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./hooks/useChangeBalance */ "./src/hooks/useChangeBalance.js");
/* harmony import */ var _components_Preview__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/Preview */ "./src/components/Preview.js");

/**
 * WordPress components that create the necessary UI elements for the block
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-components/
 */

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */













function Edit({
  attributes,
  setAttributes
}) {
  const defaultCityObject = {
    name: '東京',
    url: 'https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&hourly=precipitation_probability,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo&past_days=1&forecast_days=14'
  };
  const currentCityFromAttributes = attributes.selectedCity;
  const [selectedCity, setSelectedCity] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(currentCityFromAttributes || defaultCityObject);
  const ref = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const {
    fontFamily,
    onChangeFontFamily
  } = (0,_hooks_useFontFamilyControl__WEBPACK_IMPORTED_MODULE_10__.useFontFamilyControl)(attributes, setAttributes);
  const [textColor, setTextColor] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(attributes.textColor);
  const weatherData = (0,_hooks_useChangeCity__WEBPACK_IMPORTED_MODULE_6__.useChangeCity)(selectedCity);
  const visibilitySettings = (0,_objects_visibilitySettings__WEBPACK_IMPORTED_MODULE_8__.createVisibilitySettings)({
    attributes,
    setAttributes
  });
  const [selectedMedia, setSelectedMedia] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(attributes.selectedMedia);
  const {
    showSelection,
    handleLayoutClick
  } = (0,_hooks_useOutsideClick__WEBPACK_IMPORTED_MODULE_7__["default"])();

  // ブロックにIDがない場合、生成して設定
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!attributes.uniqueID) {
      // ランダムなIDを生成
      const uniqueID = `block_${Math.random().toString(36).substr(2, 9)}`;
      setAttributes({
        uniqueID
      });
    }
  }, []);
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
    className: 'J-Weather-Customizer'
  });
  const cityOptions = Object.entries(_weatherDate_getSpotWeather__WEBPACK_IMPORTED_MODULE_9__.cities).map(([key, city]) => ({
    label: city.name,
    // 'name'属性を表示テキストとして使用
    value: key // キー（都市名）を内部値として使用
  }));

  const handleCityChange = selectedCityKey => {
    const newSelectedCity = _weatherDate_getSpotWeather__WEBPACK_IMPORTED_MODULE_9__.cities[selectedCityKey];
    setSelectedCity(newSelectedCity);
    setAttributes({
      selectedCity: newSelectedCity
    }); // ここで新しい値を保存
  };

  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {}, [attributes]);
  const {
    selectedOption,
    setSelectedOption,
    fontBalanceOptions,
    applyFontBalance
  } = (0,_hooks_useChangeBalance__WEBPACK_IMPORTED_MODULE_11__.useChangeBalance)(attributes.balanceOption, setAttributes);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // selectedMediaが変更されたときに実行されるコード
    if (selectedMedia !== attributes.selectedMedia) {
      setSelectedMedia(attributes.selectedMedia);
    }
  }, [attributes.selectedMedia]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (attributes.selectedCity) {
      setSelectedCity(attributes.selectedCity);
    }
  }, [attributes.selectedCity]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // 天気データが取得された場合、それを属性に設定
    if (weatherData) {
      setAttributes({
        todayWeather: weatherData.today,
        tomorrowWeather: weatherData.tomorrow,
        weeklyWeather: weatherData.weekly
      });
    }
  }, [weatherData]);
  const commonProps = {
    borderRadius: attributes.borderRadiusValue,
    borders: attributes.borders,
    fontFamily: attributes.fontFamily,
    color: attributes.textColor,
    styleVariant: selectedOption.value,
    backgroundStyleType: attributes.backgroundStyleType,
    selectedMedia: selectedMedia,
    backgroundGradient: attributes.backgroundGradient,
    backgroundColor: attributes.backgroundColor,
    showHoliday: attributes.showHoliday,
    showPrecipitation: attributes.showPrecipitation
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ...blockProps,
    id: attributes.uniqueID
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    onClick: handleLayoutClick,
    ref: ref
  }, showSelection ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_SettingGroup__WEBPACK_IMPORTED_MODULE_5__["default"], {
    selectedCity: selectedCity,
    cityOptions: cityOptions,
    handleCityChange: handleCityChange,
    visibilitySettings: visibilitySettings,
    fontFamily: fontFamily,
    onChangeFontFamily: onChangeFontFamily,
    textColor: textColor,
    selectedOption: selectedOption,
    setSelectedOption: setSelectedOption,
    fontBalanceOptions: fontBalanceOptions,
    attributes: attributes,
    setAttributes: setAttributes
  }) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Preview__WEBPACK_IMPORTED_MODULE_12__["default"], {
    attributes: attributes,
    commonProps: commonProps
  })));
}

/***/ }),

/***/ "./src/hooks/getBackgroundStyles.js":
/*!******************************************!*\
  !*** ./src/hooks/getBackgroundStyles.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getBackgroundStyles: function() { return /* binding */ getBackgroundStyles; }
/* harmony export */ });
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

const getBackgroundStyles = ({
  backgroundStyleType,
  selectedMedia,
  backgroundColor,
  backgroundGradient
}) => {
  switch (backgroundStyleType) {
    case 'image':
      return selectedMedia ? {
        backgroundImage: `url('${selectedMedia}')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      } : {};
    case 'color':
      return backgroundColor ? {
        backgroundColor
      } : {};
    case 'gradient':
      return backgroundGradient ? {
        background: backgroundGradient
      } : {};
    default:
      return {};
  }
};

/***/ }),

/***/ "./src/hooks/getTextColor.js":
/*!***********************************!*\
  !*** ./src/hooks/getTextColor.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Determines the text color based on the provided weather conditions. 
 * The function checks if the day is a holiday or a weekend (Saturday or Sunday),
 * and assigns specific colors for these days. If the day is a holiday or Sunday,
 * 
 * @param {Object} weather - The weather object containing information about the day.
 * @returns {string} - The CSS color value as a string (e.g., "red", "blue", or an empty string for default color).
 */

const getTextColor = weather => {
  if (!weather || !weather.day) return null;
  const isHoliday = weather.day.isHoliday;

  // Determines if the current day is a holiday.
  if (isHoliday || weather.day.isSunday) {
    return "red";
  } else if (weather.day.isSaturday) {
    return "blue";
  }
  return "";
};
/* harmony default export */ __webpack_exports__["default"] = (getTextColor);

/***/ }),

/***/ "./src/hooks/getWeatherInfo.js":
/*!*************************************!*\
  !*** ./src/hooks/getWeatherInfo.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
* WMOのweatherCodeに対応する、天候名とアイコンを返す
*
* アイコンは気象庁の利用規約に基づいて使用させて頂いております。
* 出典: 気象庁「https://www.jma.go.jp/bosai/forecast/img/100.svg」,
      気象庁「https://www.jma.go.jp/bosai/forecast/img/101.svg」,
      気象庁「https://www.jma.go.jp/bosai/forecast/img/200.svg」,
      気象庁「https://www.jma.go.jp/bosai/forecast/img/202.svg」,
      気象庁「https://www.jma.go.jp/bosai/forecast/img/300.svg」,
      気象庁「https://www.jma.go.jp/bosai/forecast/img/302.svg」,
      気象庁「https://www.jma.go.jp/bosai/forecast/img/400.svg」
* @link https://www.jma.go.jp/jma/kishou/info/coment.html
*
* @param {number} weatherCode WMOに基づくweatherCode
* @returns {Object<label<String>, icon<String>>} weatherコードに対応するラベルとアイコンを格納したオブジェクト
*/

const getWeatherInfo = weatherCode => {
  const pluginImagePaths = JWeatherCustomizerData.pluginImagePath;

  // 0 : Clear Sky
  if (weatherCode === 0) {
    return {
      label: "快晴",
      icon: pluginImagePaths + '100.svg'
    };
  }
  if (weatherCode === 1) {
    return {
      label: "晴れ",
      icon: pluginImagePaths + '100.svg'
    };
  }
  // 2 : Partly Cloudy
  if (weatherCode === 2) {
    return {
      label: "一部曇",
      icon: pluginImagePaths + '101.svg'
    };
  }
  // 3 : Overcast
  if (weatherCode === 3) {
    return {
      label: "曇り",
      icon: pluginImagePaths + '200.svg'
    };
  }
  // 45, 48 : Fog And Depositing Rime Fog
  if (weatherCode <= 49) {
    return {
      label: "霧",
      icon: pluginImagePaths + '200.svg'
    };
  }
  // 51, 53, 55 : Drizzle Light, Moderate And Dense Intensity ・ 56, 57 : Freezing Drizzle Light And Dense Intensity
  if (weatherCode <= 59) {
    return {
      label: "霧雨",
      icon: pluginImagePaths + '202.svg'
    };
  }
  // 61, 63, 65 : Rain Slight, Moderate And Heavy Intensity ・66, 67 : Freezing Rain Light And Heavy Intensity
  if (weatherCode <= 69) {
    return {
      label: "雨",
      icon: pluginImagePaths + '300.svg'
    };
  }
  // 71, 73, 75 : Snow Fall Slight, Moderate And Heavy Intensity ・ 77 : Snow Grains
  if (weatherCode <= 79) {
    return {
      label: "雪",
      icon: pluginImagePaths + '400.svg'
    };
  }
  // 80, 81, 82 : Rain Showers Slight, Moderate And Violent
  if (weatherCode <= 84) {
    return {
      label: "俄か雨",
      icon: pluginImagePaths + '302.svg'
    };
  }
  // 85, 86 : Snow Showers Slight And Heavy
  if (weatherCode <= 94) {
    return {
      label: "雪・雹",
      icon: pluginImagePaths + '400.svg'
    };
  }
  // 95 : Thunderstorm Slight Or Moderate ・ 96, 99 : Thunderstorm With Slight And Heavy Hail
  if (weatherCode <= 99) {
    return {
      label: "雷雨",
      icon: pluginImagePaths + '300.svg'
    };
  }
  // その他はエラーとする
  return {
    label: "ERROR",
    icon: ""
  };
};
/* harmony default export */ __webpack_exports__["default"] = (getWeatherInfo);

/***/ }),

/***/ "./src/hooks/handleWeatherError.js":
/*!*****************************************!*\
  !*** ./src/hooks/handleWeatherError.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   handleWeatherError: function() { return /* binding */ handleWeatherError; }
/* harmony export */ });
/* harmony import */ var _objects_responseErrorMessages__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../objects/responseErrorMessages */ "./src/objects/responseErrorMessages.js");


/**
 * Handles API error responses by mapping error status codes to user-friendly error messages.
 * This function checks if there is an API error and, if so, retrieves a corresponding error message
 * based on the error's status code. If the status code does not have a predefined error message,
 * it returns a default unknown error message.
 * 
 * @param {Object} isApiError - An object containing information about the API error, including a boolean flag indicating an error and the status code.
 * @returns {Object|null} - An object containing details about the error message to be displayed to the user, or null if there is no error.
 */
const handleWeatherError = isApiError => {
  // If there is no API error, return null to indicate no error handling is needed.
  if (!isApiError.isError) {
    return null;
  }
  const pluginImagePaths = JWeatherCustomizerData.pluginImagePath;
  const messages = (0,_objects_responseErrorMessages__WEBPACK_IMPORTED_MODULE_0__.responseErrorMessage)(pluginImagePaths);
  const messageForStatusCode = messages[isApiError.statusCode];
  if (!messageForStatusCode) {
    return {
      title: 'Unknown Error',
      notice: 'An unknown error occurred.',
      icon: `${pluginImagePaths}default-error-icon.svg`
    };
  }
  return messageForStatusCode;
};

/***/ }),

/***/ "./src/hooks/useBorderControl.js":
/*!***************************************!*\
  !*** ./src/hooks/useBorderControl.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isValidBorder: function() { return /* binding */ isValidBorder; },
/* harmony export */   isValidBorderStyle: function() { return /* binding */ isValidBorderStyle; },
/* harmony export */   isValidBorderWidth: function() { return /* binding */ isValidBorderWidth; },
/* harmony export */   isValidColor: function() { return /* binding */ isValidColor; },
/* harmony export */   useBorderControl: function() { return /* binding */ useBorderControl; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);


/**
 * Checks if a given color is valid. A valid color is either undefined or matches a hex color format.
 */
function isValidColor(color) {
  return color === undefined || /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
}

/**
 * Validates if the given border style is one of the allowed values.
 */
function isValidBorderStyle(style) {
  return ['none', 'solid', 'dashed', 'dotted'].includes(style);
}

/**
 * Validates if the given border width is a positive number and optionally ends with 'px' or '%'.
 */
function isValidBorderWidth(width) {
  return /^(?!0($|px|%))\d+(\.\d+)?(px|%)?$/.test(width);
}

/**
 * Validates if the provided border object has valid color, style, and width properties.
 * Supports validation for individual border sides when specified as top, right, bottom, and left properties.
 */
function isValidBorder(border) {
  // Helper function to validate each border side or a single border when not split into sides.
  const isValidSingleBorder = border => {
    return isValidColor(border.color) && isValidBorderStyle(border.style) && isValidBorderWidth(border.width);
  };
  if (!border || typeof border !== 'object') {
    console.error('Invalid border object: ', border);
    return false;
  }

  // Validates all four sides if specified, otherwise validates the single border object.
  if (['top', 'right', 'bottom', 'left'].every(side => border.hasOwnProperty(side))) {
    return ['top', 'right', 'bottom', 'left'].every(side => isValidSingleBorder(border[side]));
  }
  return isValidSingleBorder(border);
}

/**
 * Custom hook to manage border settings and provide utility functions for changing these settings.
 */
function useBorderControl(attributes, setAttributes) {
  const [newBorderSetErrorMessage, setNewBorderSetErrorMessage] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [handleRangeChangeErrorMessage, setHandleRangeChangeErrorMessage] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [handleUnitChangeErrorMessage, setHandleUnitChangeErrorMessage] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const borderColors = [{
    name: 'Blue 20',
    color: '#72aee6'
  }];
  const defaultBorder = {
    color: '#72aee6',
    style: 'dashed',
    width: '1px'
  };

  // Initialize borders state with attributes or defaults.
  const [borders, setBorders] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(() => {
    // Supports split mode with individual borders defined.
    if (attributes.borders && typeof attributes.borders.top === 'object' && typeof attributes.borders.right === 'object' && typeof attributes.borders.bottom === 'object' && typeof attributes.borders.left === 'object') {
      return attributes.borders;
    }
    return {
      top: defaultBorder,
      right: defaultBorder,
      bottom: defaultBorder,
      left: defaultBorder
    };
  });
  const units = [{
    label: 'px',
    value: 'px'
  }, {
    label: '%',
    value: '%'
  }];

  // Checks if borders are defined in a flat mode (single border for all sides).
  const isFlatMode = borders => {
    return borders && typeof borders.color === 'string' && typeof borders.style === 'string' && typeof borders.width === 'string';
  };

  // Checks if borders are defined in a split mode (individual borders for each side).
  const isSplitMode = borders => {
    return borders && typeof borders.top === 'object' && typeof borders.right === 'object' && typeof borders.bottom === 'object' && typeof borders.left === 'object';
  };

  // Function to update border settings and validate them. Provides error handling.
  const onChangeBorder = newBorderSet => {
    try {
      if (!isValidBorder(newBorderSet)) {
        throw new Error('無効なボーダープロパティ');
      }
      let updatedBorders = {};

      // Updates all borders if in flat mode or merges new settings with existing ones in split mode.
      if (isFlatMode(newBorderSet)) {
        updatedBorders = {
          top: newBorderSet,
          right: newBorderSet,
          bottom: newBorderSet,
          left: newBorderSet
        };
      } else if (isSplitMode(newBorderSet)) {
        updatedBorders = {
          top: {
            ...borders.top,
            ...newBorderSet.top
          },
          right: {
            ...borders.right,
            ...newBorderSet.right
          },
          bottom: {
            ...borders.bottom,
            ...newBorderSet.bottom
          },
          left: {
            ...borders.left,
            ...newBorderSet.left
          }
        };
      }
      setAttributes({
        ...attributes,
        borders: updatedBorders
      });
      setBorders(updatedBorders);
      setNewBorderSetErrorMessage(null);
    } catch (error) {
      console.error(error);
      setNewBorderSetErrorMessage('無効なボーダープロパティ');
    }
  };

  // Effect hook to synchronize the component's border state with its attributes.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (attributes.borders) {
      setBorders(attributes.borders);
    }
  }, [attributes.borders]);

  // Handles changes in border radius value ensuring it falls within a valid range.
  const handleRangeChange = newValue => {
    const currentUnit = attributes.borderRadiusValue?.replace(/[0-9]/g, '') || 'px';
    if (!isNaN(newValue) && newValue >= 0 && newValue <= 100) {
      setAttributes({
        ...attributes,
        borderRadiusValue: `${newValue}${currentUnit}`
      });
      setHandleRangeChangeErrorMessage(null);
    } else {
      setHandleRangeChangeErrorMessage('有効な範囲ではありません');
    }
  };

  // Handles changes in the unit of border radius (px or %), ensuring it's a valid unit.
  const handleUnitChange = newUnit => {
    const validUnits = units.map(option => option.value);
    if (validUnits.includes(newUnit)) {
      const currentValue = parseInt(attributes.borderRadiusValue || '0', 10);
      setAttributes({
        ...attributes,
        borderRadiusValue: `${currentValue}${newUnit}`
      });
      setHandleUnitChangeErrorMessage(null);
    } else {
      setHandleUnitChangeErrorMessage('無効な単位です');
    }
  };
  return {
    borders,
    onChangeBorder,
    handleRangeChange,
    handleUnitChange,
    borderColors,
    units,
    newBorderSetErrorMessage,
    handleRangeChangeErrorMessage,
    handleUnitChangeErrorMessage
  };
}
;

/***/ }),

/***/ "./src/hooks/useBorderStyles.js":
/*!**************************************!*\
  !*** ./src/hooks/useBorderStyles.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


/**
 * A custom hook for generating CSS border styles from a given borders object. 
 * This hook creates a consistent border style object for use in React component styling.
 * 
 * @param {Object} borders - An object containing border properties for each side of an element (top, right, bottom, left).
 * @returns {Object} A CSS-in-JS style object containing the border styles for each side.
 */
function useBorderStyles(borders) {
  const defaultBorderStyle = {
    width: '0px',
    style: 'none',
    color: '#000000'
  };
  const [borderStyles, setBorderStyles] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({});
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const borderTop = borders.top || defaultBorderStyle;
    const borderRight = borders.right || defaultBorderStyle;
    const borderBottom = borders.bottom || defaultBorderStyle;
    const borderLeft = borders.left || defaultBorderStyle;
    setBorderStyles({
      borderTop: `${borderTop.width} ${borderTop.style} ${borderTop.color}`,
      borderRight: `${borderRight.width} ${borderRight.style} ${borderRight.color}`,
      borderBottom: `${borderBottom.width} ${borderBottom.style} ${borderBottom.color}`,
      borderLeft: `${borderLeft.width} ${borderLeft.style} ${borderLeft.color}`
    });
  }, [borders]);
  return borderStyles;
}
;
/* harmony default export */ __webpack_exports__["default"] = (useBorderStyles);

/***/ }),

/***/ "./src/hooks/useChangeBalance.js":
/*!***************************************!*\
  !*** ./src/hooks/useChangeBalance.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useChangeBalance: function() { return /* binding */ useChangeBalance; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);


/**
 * A custom hook to manage and apply font balance options to JWeatherCustomizer blocks.
 * It allows selecting between predefined font balance options and applies the selected
 * option by adding a corresponding class to the elements of the current and weekly weather blocks.
 * 
 * @param {Object} initialOption - The initial font balance option to be used.
 * @param {Function} setAttributes - Function provided by WordPress to update block attributes.
 * @returns {Object} - An object containing the selected option, setter function for the option,
 * the list of all font balance options, and a function to apply the selected font balance.
 */
function useChangeBalance(initialOption, setAttributes) {
  const defaultOption = {
    label: 'EmphasizeTheWeather',
    value: "EmphasizeTheWeather"
  };
  const [selectedOption, setSelectedOption] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(initialOption || defaultOption);

  // List of available font balance options.
  const fontBalanceOptions = [defaultOption, {
    label: 'EmphasizeTheTemperature',
    value: 'EmphasizeTheTemperature'
  }, {
    label: 'Comfortable',
    value: 'Comfortable'
  }, {
    label: 'data',
    value: 'data'
  }, {
    label: 'Simple',
    value: 'Simple'
  }];

  /**
  * Applies the selected font balance option by adding the corresponding class
  * to the elements of the current and weekly weather blocks. It first removes all
  * font balance classes before applying the new one to ensure cleanliness.
  * 
  * @param {Object} option - The font balance option to apply.
  */
  const applyFontBalance = option => {
    // Remove all font balance classes before applying the new one.
    fontBalanceOptions.forEach(opt => {
      document.querySelectorAll('.block--current').forEach(article => article.classList.remove(opt.value));
      document.querySelectorAll('.block--weekly').forEach(ul => ul.classList.remove(opt.value));
    });

    // Apply the selected font balance class if it's not the default option.
    if (option.value !== "default") {
      document.querySelectorAll('.block--current').forEach(article => article.classList.add(option.value));
      document.querySelectorAll('.block--weekly').forEach(ul => ul.classList.add(option.value));
    }
  };
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    applyFontBalance(selectedOption);
    setAttributes({
      balanceOption: selectedOption.value
    });
  }, [selectedOption]);
  return {
    selectedOption,
    setSelectedOption,
    fontBalanceOptions,
    applyFontBalance
  };
}
;

/***/ }),

/***/ "./src/hooks/useChangeCity.js":
/*!************************************!*\
  !*** ./src/hooks/useChangeCity.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useChangeCity: function() { return /* binding */ useChangeCity; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _weatherDate_MainWeatherLogic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../weatherDate/MainWeatherLogic */ "./src/weatherDate/MainWeatherLogic.js");



/**
 * A custom hook for fetching and updating weather data based on the selected city.
 * It utilizes the `mainWeatherLogic` function to retrieve weather data for today,
 * tomorrow, and the weekly forecast, then updates the component state accordingly.
 * 
 * @param {Object} selectedCity - The city object for which weather data is to be fetched. Must contain a 'url' property.
 * @returns {Object} An object containing weather data for today, tomorrow, and the weekly forecast.
 */
function useChangeCity(selectedCity) {
  // Initializes the state with null values for today, tomorrow, and weekly weather data.
  const [weatherData, setWeatherData] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)({
    today: null,
    tomorrow: null,
    weekly: null
  });

  // Effect hook that triggers whenever the selectedCity changes.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    async function fetchData() {
      // Checks if the selected city is valid and has a URL for fetching data.
      if (!selectedCity || !selectedCity.url) {
        console.error(`No URL found for city: ${selectedCity ? selectedCity.name : "Unknown city"}`);
        return;
      }
      const cityUrl = selectedCity.url;

      // Calls `mainWeatherLogic` with the city URL and callback functions to update the state with new weather data.
      await (0,_weatherDate_MainWeatherLogic__WEBPACK_IMPORTED_MODULE_1__.mainWeatherLogic)(cityUrl, todayWeather => {
        setWeatherData(prevData => ({
          ...prevData,
          today: todayWeather
        }));
      }, tomorrowWeather => {
        setWeatherData(prevData => ({
          ...prevData,
          tomorrow: tomorrowWeather
        }));
      }, weeklyWeather => {
        setWeatherData(prevData => ({
          ...prevData,
          weekly: weeklyWeather
        }));
      });
    }
    fetchData(); // Calls fetchData to execute the data retrieval.
  }, [selectedCity]); // Dependency array to re-run the effect if selectedCity changes.
  return weatherData;
}
;

/***/ }),

/***/ "./src/hooks/useFontFamilyControl.js":
/*!*******************************************!*\
  !*** ./src/hooks/useFontFamilyControl.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useFontFamilyControl: function() { return /* binding */ useFontFamilyControl; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);


/**
 * A custom hook for managing the font family attribute in a JWeatherCustomizer block.
 * It synchronizes the font family state with the block's attributes and provides
 * a method to update both the local state and the block's font family attribute.
 *
 * @param {Object} attributes - The block's current attributes, including fontFamily.
 * @param {Function} setAttributes - A function provided by WordPress to update block attributes.
 * @returns {Object} - An object containing the current font family and a function to update it.
 */

function useFontFamilyControl(attributes, setAttributes) {
  const [fontFamily, setFontFamily] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(attributes.fontFamily);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setFontFamily(attributes.fontFamily);
  }, [attributes.fontFamily]);

  /**
  * Updates the font family state and the block's font family attribute.
  * This ensures the local state and block attribute are always in sync.
  *
  * @param {string} newFontFamily - The new font family to be applied.
  */
  const onChangeFontFamily = newFontFamily => {
    setFontFamily(newFontFamily);
    setAttributes({
      fontFamily: newFontFamily
    });
  };
  return {
    fontFamily,
    onChangeFontFamily
  };
}
;

/***/ }),

/***/ "./src/hooks/useOutsideClick.js":
/*!**************************************!*\
  !*** ./src/hooks/useOutsideClick.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);



/**
 * It provides a state and a function to manage the visibility of JWeatherCustomizer UI elements
 * based on whether a block is selected. It also offers a method to handle click events
 * on a layout component to toggle this visibility state.
 *
 * @returns {Object} - An object containing the visibility state and a click event handler function.
 */
function useBlockSelection() {
  const [showSelection, setShowSelection] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  let previouslySelectedBlockId = null;
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // Subscribe to the block editor's selection changes.
    const unsubscribe = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.subscribe)(() => {
      // Get the currently selected block ID.
      const selectedBlockId = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.select)('core/block-editor').getSelectedBlockClientId();

      // If there is a new block selected and it's different from the previous one, show the selection.
      if (selectedBlockId && previouslySelectedBlockId !== selectedBlockId) {
        setShowSelection(true);
      }

      // If no block is selected and there was a previously selected block, hide the selection.

      if (!selectedBlockId && previouslySelectedBlockId) {
        setShowSelection(false);
      }

      // Update the previously selected block ID for the next check.
      previouslySelectedBlockId = selectedBlockId;
    });
    return () => unsubscribe();
  }, []); // Empty dependency array means this effect runs only on mount and unmount.

  /**
   * Handles click events on the layout component. If the selection is not currently shown,
   * it sets the state to show the selection. This function can be attached to any clickable
   * layout component to toggle its associated UI elements based on selection visibility.
   *
   * @param {Event} e - The click event object.
   */
  const handleLayoutClick = e => {
    e.stopPropagation();
    if (!showSelection) {
      setShowSelection(true);
    }
  };
  return {
    showSelection,
    handleLayoutClick
  };
}
;
/* harmony default export */ __webpack_exports__["default"] = (useBlockSelection);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./editor.scss */ "./src/editor.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./edit */ "./src/edit.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./block.json */ "./src/block.json");
/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor. All other files
 * get applied to the editor only.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */



/**
 * Internal dependencies
 */

// import save from './save';


/**
 * Only register block if it's not already registered
 */
if (!(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.getBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_4__.name)) {
  (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_4__.name, {
    ..._block_json__WEBPACK_IMPORTED_MODULE_4__,
    // メタデータを展開して設定に適用します
    edit: _edit__WEBPACK_IMPORTED_MODULE_3__["default"],
    // 編集コンポーネントを設定します
    save: () => null // PHP側で保存処理を行うので、ここではnullを返します
  });
}

/***/ }),

/***/ "./src/objects/responseErrorMessages.js":
/*!**********************************************!*\
  !*** ./src/objects/responseErrorMessages.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   responseErrorMessage: function() { return /* binding */ responseErrorMessage; }
/* harmony export */ });
const responseErrorMessage = pluginImagePaths => ({
  400: {
    title: "不正なリクエストエラー",
    notice: "無効なリクエストを検知したため機能を停止しました。",
    guidance: "JWeatherCustomizerを速やかに停止し、管理者に連絡してください。",
    supplement: "サイトに天気情報が表示されていない可能性があります。",
    icon: `${pluginImagePaths}attention.png`,
    statuscode: '400'
  },
  401: {
    title: "認証エラー",
    notice: "API Keyが一致しません。",
    guidance: "プラグインを速やかに停止し、管理者に連絡してください。",
    supplement: "サイトに天気情報が表示されていない可能性があります。",
    icon: `${pluginImagePaths}ID.png`,
    statuscode: '401'
  },
  403: {
    title: "アクセス禁止エラー",
    notice: "許可されていない操作を行いました。",
    guidance: "WordPressにログインし直してください",
    supplement: "設定は更新前の情報を維持します。",
    icon: `${pluginImagePaths}stop.png`,
    statuscode: '403'
  },
  404: {
    title: "URL不存在エラー",
    notice: "都市のurlが見つかりませんでした。",
    guidance: "JWeatherCustomizerを速やかに停止し、管理者に連絡してください。",
    supplement: "設定は更新前の情報を維持します。",
    icon: `${pluginImagePaths}question.png`,
    statuscode: '404'
  },
  500: {
    title: "サーバー内部エラー",
    notice: "サーバーに接続できないためJWeatherCustomizerはデータを更新できません。",
    guidance: "インターネット接続を確認してから再試行してください。",
    supplement: "サイトに天気情報が表示されていない可能性があります。",
    icon: `${pluginImagePaths}server.png`,
    statuscode: '500'
  },
  503: {
    title: "サービス利用不可エラー",
    notice: "API提供元サーバーの影響によりサービスが一時的に利用不可です",
    guidance: "時間をおいてから再度操作を行い、解決しなければ管理者に連絡してください。",
    supplement: "設定は更新前の情報を維持します。",
    icon: `${pluginImagePaths}attention.png`,
    statuscode: '503'
  },
  default: {
    title: "未知のエラー",
    notice: "予期せぬエラーが発生しました。",
    guidance: "サポートにお問い合わせください。",
    supplement: "詳細な情報は利用できません。",
    icon: `${pluginImagePaths}attention.png`,
    statuscode: ''
  }
});

/***/ }),

/***/ "./src/objects/styles.js":
/*!*******************************!*\
  !*** ./src/objects/styles.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const styles = {
  formStyle: {
    width: '100%',
    textAlign: 'left',
    paddingTop: '15px'
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column'
  },
  selectorStyle: {
    width: '83%',
    alignSelf: 'end',
    paddingTop: '10px'
  },
  imageUploadButton: {
    textAlign: 'center',
    width: '50%'
  },
  validErrorStyle: {
    color: 'red',
    transform: 'translateX(23%)'
  },
  borderMainStyle: {
    width: '83.5%',
    alignSelf: 'end',
    paddingTop: '15px'
  },
  radiusStyle: {
    paddingTop: '15px',
    display: 'flex',
    gap: '10px',
    alignItems: 'end',
    alignSelf: 'end',
    width: '83.5%'
  },
  valueStyle: {
    width: '90%'
  },
  unitStyle: {
    width: '10%'
  }
};
/* harmony default export */ __webpack_exports__["default"] = (styles);

/***/ }),

/***/ "./src/objects/visibilitySettings.js":
/*!*******************************************!*\
  !*** ./src/objects/visibilitySettings.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createVisibilitySettings: function() { return /* binding */ createVisibilitySettings; }
/* harmony export */ });
/**
 * Generates an array of settings for managing the visibility of different weather information components.
 * This utility function simplifies the process of creating consistent visibility controls for various weather data aspects,
 * such as today's weather, tomorrow's weather, weekly forecast, holidays, and precipitation probability.
 * 
 * @param {Object} params - The parameters object.
 * @param {Object} params.attributes - The current block attributes, containing visibility flags for various components.
 * @param {Function} params.setAttributes - Function provided by WordPress to update block attributes.
 * @returns {Array} - An array of visibility settings, each containing a label, a checked state, and an onChange handler.
 */

const createVisibilitySettings = ({
  attributes,
  setAttributes
}) => {
  const {
    showTomorrowWeather,
    showWeeklyWeather,
    showTodayWeather,
    showHoliday,
    showPrecipitation
  } = attributes;
  const updateAttribute = (attributeName, value) => {
    if (typeof value === 'boolean') {
      setAttributes({
        [attributeName]: value
      });
    } else {
      console.error('Invalid value type for visibility setting');
    }
  };
  return [{
    label: "今日の天気を表示",
    checked: showTodayWeather,
    onChange: isChecked => {
      updateAttribute('showTodayWeather', isChecked);
    }
  }, {
    label: '明日の天気を表示',
    checked: showTomorrowWeather,
    onChange: isChecked => {
      updateAttribute('showTomorrowWeather', isChecked);
    }
  }, {
    label: '週間天気を表示',
    checked: showWeeklyWeather,
    onChange: isChecked => {
      updateAttribute('showWeeklyWeather', isChecked);
    }
  }, {
    label: '祝日を表示',
    checked: showHoliday,
    onChange: isChecked => {
      updateAttribute('showHoliday', isChecked);
    }
  }, {
    label: '降水確率を表示',
    checked: showPrecipitation,
    onChange: isChecked => {
      updateAttribute('showPrecipitation', isChecked);
    }
  }];
};

/***/ }),

/***/ "./src/weatherDate/MainWeatherLogic.js":
/*!*********************************************!*\
  !*** ./src/weatherDate/MainWeatherLogic.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mainWeatherLogic: function() { return /* binding */ mainWeatherLogic; }
/* harmony export */ });
/* harmony import */ var _fetchWeatherData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fetchWeatherData */ "./src/weatherDate/fetchWeatherData.js");
/* harmony import */ var _processWeatherData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./processWeatherData */ "./src/weatherDate/processWeatherData.js");



/**
 * Orchestrates the fetching and processing of weather data for a specific city and updates
 * state hooks for today's, tomorrow's, and the weekly weather forecasts.
 * 
 * @param {string} cityurl - The URL to fetch weather data for a specific city.
 * @param {Function} setTodayWeather - State setter function for today's weather.
 * @param {Function} setTomorrowWeather - State setter function for tomorrow's weather.
 * @param {Function} setWeeklyWeather - State setter function for the weekly weather forecast.
 * @param {boolean} addBreak - Optional parameter indicating whether to add a break in the processing of weather data.
 */
async function mainWeatherLogic(cityurl, setTodayWeather, setTomorrowWeather, setWeeklyWeather, addBreak = false) {
  try {
    // Fetch raw weather data from the provided city URL.
    const rawData = await (0,_fetchWeatherData__WEBPACK_IMPORTED_MODULE_0__.fetchWeatherData)(cityurl);
    // Process the raw weather data, optionally adding breaks based on the addBreak parameter.
    const processedData = await (0,_processWeatherData__WEBPACK_IMPORTED_MODULE_1__["default"])(rawData, addBreak);

    // Update the state for today's weather using the first item from the processed daily data.
    setTodayWeather(processedData.dailyData[0]);
    // Update the state for tomorrow's weather using the second item from the processed daily data.
    setTomorrowWeather(processedData.dailyData[1]);
    // Update the state for the weekly weather forecast using the rest of the items from the processed daily data.
    setWeeklyWeather(processedData.dailyData.slice(2));
  } catch (error) {
    // Log any errors that occur during the fetching or processing of weather data.
    console.error('Error in weatherObject function:', error);
  }
}
;


/***/ }),

/***/ "./src/weatherDate/dayWithHoloday.js":
/*!*******************************************!*\
  !*** ./src/weatherDate/dayWithHoloday.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Asynchronously fetches holiday data from a public API and returns dates for one week,
 * along with holiday information for each date if available. Optionally, a break can be added between
 * each date in the returned array.
 *
 * @param {boolean} addBreak - Whether to add a break between each date in the returned array.
 * @returns {Promise<Array>} - A promise that resolves to an array of date objects, each with holiday information.
 */

const dayWithHoliday = async (addBreak = false) => {
  // Cache object to store fetched holiday data to prevent multiple requests.
  const cache = {};

  /**
  * Fetches holiday data from the specified URL and returns it as a JSON object.
  * If the request fails, logs the error and returns an empty object.
  */
  const fetchHolidays = async () => {
    const url = 'https://holidays-jp.github.io/api/v1/date.json';
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching holidays:', error);
      return {};
    }
  };

  /**
  * Retrieves holiday data for today from the cache or fetches it if not cached.
  */
  const getHolidays = async () => {
    const today = new Date().toISOString().slice(0, 10);
    if (!cache[today]) {
      cache[today] = await fetchHolidays();
    }
    return cache[today];
  };

  /**
  * Generates an array of dates between the specified start and end dates.
  */
  function getDateRangeArray(startDate, endDate) {
    const dateArray = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      dateArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray;
  }
  ;

  /**
   * Generates an array of dates for one week from today, each annotated with whether it's a holiday
   * (and the holiday's name if applicable), whether it's Saturday or Sunday, and the date in various formats.
   */
  async function getOneWeekDatesWithHolidays(addBreak = false) {
    const today = new Date();
    const sixDaysLater = new Date(today);
    sixDaysLater.setDate(today.getDate() + 6);
    const oneWeekDates = getDateRangeArray(today, sixDaysLater);
    const holidays = await getHolidays();
    const oneWeekDatesWithHolidays = oneWeekDates.map(date => {
      const weekDays = ["日", "月", "火", "水", "木", "金", "土"];
      const dayOfWeek = weekDays[date.getDay()];
      const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      return {
        date: {
          month: `${String(date.getMonth() + 1)}月`,
          day: `${String(date.getDate())}日`,
          dayOfWeek: `(${dayOfWeek})`,
          fullDate: `${String(date.getMonth() + 1)}月${String(date.getDate())}日(${dayOfWeek})`
        },
        isHoliday: !!holidays[formattedDate],
        // True if the date is a holiday.
        holidayName: holidays[formattedDate] || null,
        // The holiday's name, if it's a holiday.
        isSaturday: date.getDay() === 6,
        // True if the date is a Saturday.
        isSunday: date.getDay() === 0 // True if the date is a Sunday.
      };
    });

    return oneWeekDatesWithHolidays;
  }

  // Call the async function to generate the array and return its result.
  return await getOneWeekDatesWithHolidays(addBreak);
};
/* harmony default export */ __webpack_exports__["default"] = (dayWithHoliday);

/***/ }),

/***/ "./src/weatherDate/fetchWeatherData.js":
/*!*********************************************!*\
  !*** ./src/weatherDate/fetchWeatherData.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchWeatherData: function() { return /* binding */ fetchWeatherData; },
/* harmony export */   isApiError: function() { return /* binding */ isApiError; }
/* harmony export */ });
// Initial state for tracking API errors.
let isApiError = {
  isError: false,
  statusCode: null
};

/**
 * Asynchronously fetches weather data for a given city URL. Implements caching to reduce API calls.
 * Updates `isApiError` state in case of fetch failure.
 * 
 * @param {string} cityUrl - The URL to fetch weather data from.
 * @returns {Promise<Object>} The fetched weather data as a JSON object.
 * @throws {Error} Throws an error if the URL is invalid or the fetch operation fails.
 */
async function fetchWeatherData(cityUrl) {
  const cacheDuration = 14400;
  const cacheKey = 'weatherDataCache';
  const cacheUrlKey = 'weatherDataUrl';
  const cacheTimestampKey = 'weatherDataTimestamp';

  // Validates if the given URL belongs to the expected base URL.
  const isValidUrl = url => {
    try {
      const validBaseUrl = "https://api.open-meteo.com/v1";
      const parsedUrl = new URL(url);
      return parsedUrl.href.startsWith(validBaseUrl);
    } catch (e) {
      return false;
    }
  };

  // Throws an error if the city URL is invalid or not provided.
  if (!cityUrl || !isValidUrl(cityUrl)) {
    throw new Error(`Invalid URL: ${cityUrl}`);
  }
  ;

  // Calculates the current timestamp and retrieves the stored timestamp from localStorage.
  const now = new Date();
  const currentTimestamp = Math.floor(now.getTime() / 1000);
  const storedTimestamp = localStorage.getItem(cacheTimestampKey);
  const storedUrl = localStorage.getItem(cacheUrlKey);
  const timePassed = currentTimestamp - storedTimestamp;

  // Returns cached data if it's still valid and the URL matches the requested city URL.
  if (localStorage.getItem(cacheKey) && timePassed < cacheDuration && storedUrl === cityUrl) {
    return JSON.parse(localStorage.getItem(cacheKey));
  } else {
    // Resets API error state before attempting to fetch new data.
    isApiError.isError = false;
    isApiError.statusCode = null;
    try {
      // Performs the fetch operation.
      const response = await fetch(cityUrl);
      if (!response.ok) {
        isApiError.isError = true;
        isApiError.statusCode = response.status;
        throw new Error(`API response error with status: ${response.status}`);
      }

      // Stores fetched data in localStorage and updates the cache.
      const data = await response.json();
      localStorage.setItem(cacheKey, JSON.stringify(data));
      localStorage.setItem(cacheTimestampKey, currentTimestamp.toString());
      localStorage.setItem(cacheUrlKey, cityUrl);
      return data;
    } catch (error) {
      // Logs and rethrows the error in case of fetch failure.
      console.error('Fetch error:', error);
      throw error;
    }
  }
}
;


/***/ }),

/***/ "./src/weatherDate/getSpotWeather.js":
/*!*******************************************!*\
  !*** ./src/weatherDate/getSpotWeather.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cities: function() { return /* binding */ cities; }
/* harmony export */ });
// Base URL for the Open-Meteo API to fetch weather forecasts.
const apiBaseUrl = 'https://api.open-meteo.com/v1/forecast';

/**
 * Constructs a URL for fetching weather data from the Open-Meteo API for a specific latitude and longitude.
 * It specifies parameters for the API call to include temperature, precipitation probability, and weather code
 * information on an hourly and daily basis, along with the timezone setting for Asia/Tokyo.
 * 
 * @param {number} latitude - The latitude of the city.
 * @param {number} longitude - The longitude of the city.
 * @returns {string} - A complete URL string for the API call.
 */
const createCityWeatherUrl = (latitude, longitude) => {
  return `${apiBaseUrl}?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation_probability,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo&past_days=1&forecast_days=14`;
};

/**
 * A collection of cities with their names and corresponding URLs for fetching weather data.
 * Each city object contains the city name and a URL generated with the `createCityWeatherUrl`
 * function, using the city's latitude and longitude.
 */
const cities = {
  札幌: {
    name: '札幌',
    url: createCityWeatherUrl(43.0667, 141.35)
  },
  秋田: {
    name: '秋田',
    url: createCityWeatherUrl(39.7167, 140.1167)
  },
  金沢: {
    name: '金沢',
    url: createCityWeatherUrl(36.6, 136.6167)
  },
  東京: {
    name: '東京',
    url: createCityWeatherUrl(35.6895, 139.6917)
  },
  大宮: {
    name: '大宮',
    url: createCityWeatherUrl(35.9635, 139.8305)
  },
  名古屋: {
    name: '名古屋',
    url: createCityWeatherUrl(35.1815, 136.9064)
  },
  南堀江: {
    name: '南堀江',
    url: createCityWeatherUrl(34.6711, 135.4942)
  },
  八尾: {
    name: '八尾',
    url: createCityWeatherUrl(34.6167, 135.6)
  },
  奈良: {
    name: '奈良',
    url: createCityWeatherUrl(34.685, 135.8049)
  },
  朝来: {
    name: '朝来',
    url: createCityWeatherUrl(35.2591, 134.8139)
  },
  福岡: {
    name: '福岡',
    url: createCityWeatherUrl(33.6, 130.4167)
  },
  佐世保: {
    name: '佐世保',
    url: createCityWeatherUrl(33.1683, 129.725)
  },
  諸塚: {
    name: '諸塚',
    url: createCityWeatherUrl(32.5601, 131.3198)
  },
  パリ: {
    name: 'パリ',
    url: createCityWeatherUrl(48.8534, 2.3488)
  }
};

/***/ }),

/***/ "./src/weatherDate/processWeatherData.js":
/*!***********************************************!*\
  !*** ./src/weatherDate/processWeatherData.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _hooks_getWeatherInfo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../hooks/getWeatherInfo */ "./src/hooks/getWeatherInfo.js");
/* harmony import */ var _dayWithHoloday__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dayWithHoloday */ "./src/weatherDate/dayWithHoloday.js");



/**
 * Processes raw weather data fetched from an API to enhance it with additional details,
 * including holiday information, validated temperatures, and computed temperature differences.
 * 
 * @param {Object} data - The raw weather data fetched from the API.
 * @param {boolean} addBreak - Optional parameter to indicate whether to add a break during processing.
 * @returns {Object} An object containing processed daily weather data.
 */
async function processWeatherData(data, addBreak = false) {
  // Sanitizes a URL to ensure it's valid. Returns an empty string if invalid.
  const sanitizeImageUrl = url => {
    try {
      return new URL(url).toString();
    } catch (e) {
      return '';
    }
  };

  // Validates a temperature value to ensure it's numeric.
  const validateTemperature = temperature => {
    return !isNaN(temperature) && isFinite(temperature);
  };

  // Throws an error if the data is in an unexpected format.
  if (!data || !data.daily) {
    throw new Error("Unexpected data format received from the weather API.");
  }

  // Fetches and processes holiday data to be combined with weather data.
  const datesForWeek = await (0,_dayWithHoloday__WEBPACK_IMPORTED_MODULE_1__["default"])(addBreak);
  if (!datesForWeek || datesForWeek.length !== 7) {
    throw new Error("Unexpected date array length from dayWithHoliday.");
  }
  ;

  // Maps weather codes to human-readable labels and sanitized image URLs.
  const weatherCodesForWeek = data.daily.weathercode;
  const weatherNamesForWeek = weatherCodesForWeek.map(code => (0,_hooks_getWeatherInfo__WEBPACK_IMPORTED_MODULE_0__["default"])(code).label);
  const weatherImageForWeek = weatherCodesForWeek.map(code => sanitizeImageUrl((0,_hooks_getWeatherInfo__WEBPACK_IMPORTED_MODULE_0__["default"])(code).icon));

  // Validates and stores temperature data.
  const highestTemperatureForWeek = data.daily.temperature_2m_max.map(temp => validateTemperature(temp) ? temp : null);
  const lowestTemperatureForWeek = data.daily.temperature_2m_min.map(temp => validateTemperature(temp) ? temp : null);

  // Calculates daily temperature differences for highs.
  const highestTemperatureDifferencesForWeek = [];
  for (let i = -1; i < highestTemperatureForWeek.length; i++) {
    const todayMaxTemperature = highestTemperatureForWeek[i + 1];
    const yesterdayMaxTemperature = highestTemperatureForWeek[i];
    const temperatureDifference = Math.ceil((todayMaxTemperature - yesterdayMaxTemperature) * 10) / 10;
    const formattedDifference = temperatureDifference >= 0 ? `(+${temperatureDifference})` : `(-${Math.abs(temperatureDifference)})`;
    highestTemperatureDifferencesForWeek.push(formattedDifference);
  }

  // Similar computation for lows.
  const lowestTemperatureDifferencesForWeek = [];
  for (let i = -1; i < lowestTemperatureForWeek.length; i++) {
    const todayMinTemperature = lowestTemperatureForWeek[i + 1];
    const yesterdayMinTemperature = lowestTemperatureForWeek[i];
    const temperatureDifference = Math.ceil((todayMinTemperature - yesterdayMinTemperature) * 10) / 10;
    const formattedDifference = temperatureDifference >= 0 ? `(+${temperatureDifference})` : `(-${Math.abs(temperatureDifference)})`;
    lowestTemperatureDifferencesForWeek.push(formattedDifference);
  }

  // Organizes hourly precipitation probability data.
  const rainProbability1 = {};
  for (let i = 1; i <= 7; i++) {
    let baseTime = i === 0 ? 0 : 24 * i;
    rainProbability1[i] = [];
    for (let j = 0; j < 4; j++) {
      rainProbability1[i].push({
        time: data.hourly.time[baseTime + j * 6],
        precipitation_probability: data.hourly.precipitation_probability[baseTime + j * 6]
      });
    }
  }

  // Combines all processed data into a structured format for each day of the week.
  const dailyData = datesForWeek.map((day, index) => {
    return {
      day: datesForWeek[index],
      name: weatherNamesForWeek[index + 1],
      image: weatherImageForWeek[index + 1],
      highestTemperature: highestTemperatureForWeek[index + 1],
      lowestTemperature: lowestTemperatureForWeek[index + 1],
      maximumTemperatureComparison: highestTemperatureDifferencesForWeek[index + 1],
      lowestTemperatureComparison: lowestTemperatureDifferencesForWeek[index + 1],
      rainProbability: rainProbability1[index + 1]
    };
  }).filter((_, index) => index < datesForWeek.length);

  // Returns the structured daily weather data which now includes additional details
  // such as holiday information, validated temperatures, computed temperature differences,
  // and organized precipitation probability data.
  return {
    dailyData
  };
}
;
/* harmony default export */ __webpack_exports__["default"] = (processWeatherData);

/***/ }),

/***/ "./src/editor.scss":
/*!*************************!*\
  !*** ./src/editor.scss ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/object-assign/index.js":
/*!*********************************************!*\
  !*** ./node_modules/object-assign/index.js ***!
  \*********************************************/
/***/ (function(module) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ "./node_modules/prop-types/checkPropTypes.js":
/*!***************************************************!*\
  !*** ./node_modules/prop-types/checkPropTypes.js ***!
  \***************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var printWarning = function() {};

if (true) {
  var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
  var loggedTypeFailures = {};
  var has = __webpack_require__(/*! ./lib/has */ "./node_modules/prop-types/lib/has.js");

  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) { /**/ }
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (true) {
    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' +
              'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          );
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

/**
 * Resets warning cache when testing.
 *
 * @private
 */
checkPropTypes.resetWarningCache = function() {
  if (true) {
    loggedTypeFailures = {};
  }
}

module.exports = checkPropTypes;


/***/ }),

/***/ "./node_modules/prop-types/factoryWithTypeCheckers.js":
/*!************************************************************!*\
  !*** ./node_modules/prop-types/factoryWithTypeCheckers.js ***!
  \************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/prop-types/node_modules/react-is/index.js");
var assign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");

var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
var has = __webpack_require__(/*! ./lib/has */ "./node_modules/prop-types/lib/has.js");
var checkPropTypes = __webpack_require__(/*! ./checkPropTypes */ "./node_modules/prop-types/checkPropTypes.js");

var printWarning = function() {};

if (true) {
  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bigint: createPrimitiveTypeChecker('bigint'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message, data) {
    this.message = message;
    this.data = data && typeof data === 'object' ? data: {};
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (true) {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
          err.name = 'Invariant Violation';
          throw err;
        } else if ( true && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            printWarning(
              'You are manually calling a React.PropTypes validation ' +
              'function for the `' + propFullName + '` prop on `' + componentName + '`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError(
          'Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'),
          {expectedType: expectedType}
        );
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!ReactIs.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      if (true) {
        if (arguments.length > 1) {
          printWarning(
            'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
            'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
          );
        } else {
          printWarning('Invalid argument supplied to oneOf, expected an array.');
        }
      }
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);
        if (type === 'symbol') {
          return String(value);
        }
        return value;
      });
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (has(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
       true ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : 0;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning(
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
        );
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      var expectedTypes = [];
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        var checkerResult = checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret);
        if (checkerResult == null) {
          return null;
        }
        if (checkerResult.data && has(checkerResult.data, 'expectedType')) {
          expectedTypes.push(checkerResult.data.expectedType);
        }
      }
      var expectedTypesMessage = (expectedTypes.length > 0) ? ', expected one of type [' + expectedTypes.join(', ') + ']': '';
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`' + expectedTypesMessage + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function invalidValidatorError(componentName, location, propFullName, key, type) {
    return new PropTypeError(
      (componentName || 'React class') + ': ' + location + ' type `' + propFullName + '.' + key + '` is invalid; ' +
      'it must be a function, usually from the `prop-types` package, but received `' + type + '`.'
    );
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (typeof checker !== 'function') {
          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (has(shapeTypes, key) && typeof checker !== 'function') {
          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
        }
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // falsy value can't be a Symbol
    if (!propValue) {
      return false;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),

/***/ "./node_modules/prop-types/index.js":
/*!******************************************!*\
  !*** ./node_modules/prop-types/index.js ***!
  \******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (true) {
  var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/prop-types/node_modules/react-is/index.js");

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(/*! ./factoryWithTypeCheckers */ "./node_modules/prop-types/factoryWithTypeCheckers.js")(ReactIs.isElement, throwOnDirectAccess);
} else {}


/***/ }),

/***/ "./node_modules/prop-types/lib/ReactPropTypesSecret.js":
/*!*************************************************************!*\
  !*** ./node_modules/prop-types/lib/ReactPropTypesSecret.js ***!
  \*************************************************************/
/***/ (function(module) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),

/***/ "./node_modules/prop-types/lib/has.js":
/*!********************************************!*\
  !*** ./node_modules/prop-types/lib/has.js ***!
  \********************************************/
/***/ (function(module) {

module.exports = Function.call.bind(Object.prototype.hasOwnProperty);


/***/ }),

/***/ "./node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js ***!
  \***********************************************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (true) {
  (function() {
'use strict';

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
// (unstable) APIs that have been removed. Can we remove the symbols?

var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
}

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;

    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_CONCURRENT_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
            return type;

          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;

              default:
                return $$typeof;
            }

        }

      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
} // AsyncMode is deprecated along with isAsyncMode

var AsyncMode = REACT_ASYNC_MODE_TYPE;
var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;
var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
    }
  }

  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
}
function isConcurrentMode(object) {
  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}

exports.AsyncMode = AsyncMode;
exports.ConcurrentMode = ConcurrentMode;
exports.ContextConsumer = ContextConsumer;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Lazy = Lazy;
exports.Memo = Memo;
exports.Portal = Portal;
exports.Profiler = Profiler;
exports.StrictMode = StrictMode;
exports.Suspense = Suspense;
exports.isAsyncMode = isAsyncMode;
exports.isConcurrentMode = isConcurrentMode;
exports.isContextConsumer = isContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isElement = isElement;
exports.isForwardRef = isForwardRef;
exports.isFragment = isFragment;
exports.isLazy = isLazy;
exports.isMemo = isMemo;
exports.isPortal = isPortal;
exports.isProfiler = isProfiler;
exports.isStrictMode = isStrictMode;
exports.isSuspense = isSuspense;
exports.isValidElementType = isValidElementType;
exports.typeOf = typeOf;
  })();
}


/***/ }),

/***/ "./node_modules/prop-types/node_modules/react-is/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/prop-types/node_modules/react-is/index.js ***!
  \****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react-is.development.js */ "./node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js");
}


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ (function(module) {

"use strict";
module.exports = window["React"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "./src/block.json":
/*!************************!*\
  !*** ./src/block.json ***!
  \************************/
/***/ (function(module) {

"use strict";
module.exports = JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"create-block/j-weather-customizer","version":"1.2","title":"JWeatherCustomizer","category":"text","icon":"flag","description":"A plugin that allows you to display a weather forecast of your choice on your website.","attributes":{"uniqueID":{"type":"string","default":""},"selectedCity":{"type":"object","default":{"name":"東京","url":"https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&hourly=precipitation_probability,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo&past_days=1&forecast_days=14"}},"showTomorrowWeather":{"type":"boolean","default":true},"showWeeklyWeather":{"type":"boolean","default":true},"showTodayWeather":{"type":"boolean","default":true},"showHoliday":{"type":"boolean","default":true},"showPrecipitation":{"type":"boolean","default":true},"todayWeather":{"type":"object","default":{}},"tomorrowWeather":{"type":"object","default":{}},"weeklyWeather":{"type":"array","default":[]},"borderRadiusValue":{"type":"string","default":"0px"},"borderMode":{"type":"string","default":"flat"},"borders":{"type":"object","default":{"top":{"color":"#72aee6","style":"dashed","width":"1px"},"right":{"color":"#72aee6","style":"dashed","width":"1px"},"bottom":{"color":"#72aee6","style":"dashed","width":"1px"},"left":{"color":"#72aee6","style":"dashed","width":"1px"}}},"fontFamily":{"type":"string","default":"Noto Sans JP, sans-serif"},"textColor":{"type":"string","default":"black"},"backgroundStyleType":{"type":"string","default":"color"},"backgroundImage":{"type":"string","default":"http://hoge.local/wp-content/uploads/2023/10/IMG_5308-scaled.jpeg"},"backgroundGradient":{"type":"string","default":"linear-gradient(135deg,#1E9600 0%, #FFF200 0%, #FF0000 100%)"},"backgroundColor":{"type":"string","default":"#fff"},"balanceOption":{"type":"string","default":"EmphasizeTheWeather"}},"supports":{"html":false},"textdomain":"j-weather-customizer","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0,
/******/ 			"./style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkj_weather_customizer"] = self["webpackChunkj_weather_customizer"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-index"], function() { return __webpack_require__("./src/index.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map
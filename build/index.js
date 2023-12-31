/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/BackgroundSelector.js":
/*!**********************************************!*\
  !*** ./src/components/BackgroundSelector.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);



const BackgroundSelector = ({
  attributes,
  setAttributes
}) => {
  const {
    backgroundStyleType
  } = attributes;
  const handleMediaSelect = media => {
    if (!media) {
      setAttributes({
        backgroundImage: null,
        selectedMedia: null
      });
      return;
    }
    const selectedMediaUrl = media.url;
    setAttributes({
      backgroundImage: selectedMediaUrl,
      selectedMedia: selectedMediaUrl
    });
  };
  const handleColorChange = color => {
    // setBackgroundColor(color);
    setAttributes({
      backgroundColor: color
    });
  };
  const handleGradientChange = newGradient => {
    setAttributes({
      backgroundGradient: newGradient
    });
  };
  const handleBackgroundStyleChange = newStyleType => {
    setAttributes({
      ...attributes,
      backgroundStyleType: newStyleType
    });
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
    label: "\u80CC\u666F\u30B9\u30BF\u30A4\u30EB",
    value: attributes.backgroundStyleType // 現在の値をattributesから取得
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
    onChange: handleBackgroundStyleChange // ここで新しい関数を使用します
  }), backgroundStyleType === 'image' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaUploadCheck, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaUpload, {
    onSelect: handleMediaSelect,
    allowedTypes: ['image'],
    value: attributes.backgroundImage,
    render: ({
      open
    }) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
      onClick: open
    }, "Open Media Library")
  })), backgroundStyleType === 'color' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ColorPalette, {
    onChange: handleColorChange,
    value: attributes.backgroundColor
  }), backgroundStyleType === 'gradient' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.GradientPicker, {
    value: attributes.backgroundGradient,
    onChange: handleGradientChange,
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
  }));
};
/* harmony default export */ __webpack_exports__["default"] = (BackgroundSelector);

/***/ }),

/***/ "./src/components/BorderControlGroup.js":
/*!**********************************************!*\
  !*** ./src/components/BorderControlGroup.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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
/* harmony import */ var _functions_useBorderControl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../functions/useBorderControl */ "./src/functions/useBorderControl.js");

// BorderControlGroup.js




function BorderControlGroup({
  attributes,
  setAttributes
}) {
  const {
    borders,
    onChangeBorder,
    handleRangeChange,
    handleUnitChange,
    borderColors,
    // ここを変更しました
    units
  } = (0,_functions_useBorderControl__WEBPACK_IMPORTED_MODULE_3__.useBorderControl)(attributes, setAttributes);
  const borderMainStyle = {
    width: '83.5%',
    alignSelf: 'end',
    paddingTop: '15px'
  };
  const radiusStyle = {
    paddingTop: '15px',
    display: 'flex',
    gap: '10px',
    alignItems: 'end',
    alignSelf: 'end',
    width: '83.5%'
  };
  const valueStyle = {
    width: '90%'
  };
  const unitStyle = {
    width: '10%'
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "jwc-border-main",
    style: borderMainStyle
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalBorderBoxControl, {
    colors: borderColors // ここを変更しました
    ,
    label: '枠線の色と形',
    onChange: onChangeBorder,
    value: borders
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "jwc-border-radius",
    style: radiusStyle
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: valueStyle
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
    label: "\u4E38\u307F",
    value: parseInt(attributes.borderRadiusValue, 10),
    onChange: handleRangeChange,
    min: 0,
    max: attributes.borderRadiusValue && attributes.borderRadiusValue.includes('px') ? 100 : 100
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: unitStyle
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
    value: attributes.borderRadiusValue && attributes.borderRadiusValue.replace(/[0-9]/g, ''),
    options: units,
    onChange: handleUnitChange
  }))));
}

/***/ }),

/***/ "./src/components/CurrentWeather.js":
/*!******************************************!*\
  !*** ./src/components/CurrentWeather.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CurrentWeather: function() { return /* binding */ CurrentWeather; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Temp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Temp */ "./src/components/Temp.js");
/* harmony import */ var _TimeZone__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TimeZone */ "./src/components/TimeZone.js");
/* harmony import */ var _functions_useBorderStyles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../functions/useBorderStyles */ "./src/functions/useBorderStyles.js");
/* harmony import */ var _functions_useBackgroundStyles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../functions/useBackgroundStyles */ "./src/functions/useBackgroundStyles.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../style.scss */ "./src/style.scss");






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
  if (!weather || !weather.day) return null; // weather と weather.day の存在を確認

  const isHoliday = weather.day.isHoliday;
  let textColor;
  if (isHoliday || weather.day.isSunday) {
    textColor = "red";
  } else if (weather.day.isSaturday) {
    textColor = "blue";
  }
  const borderStyles = (0,_functions_useBorderStyles__WEBPACK_IMPORTED_MODULE_3__["default"])(borders);
  const backgroundStyles = (0,_functions_useBackgroundStyles__WEBPACK_IMPORTED_MODULE_4__["default"])(backgroundStyleType, selectedMedia, backgroundColor, backgroundGradient);
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

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);

// FontFamilyControl.js

function FontFamilyControl({
  fontFamily,
  setFontFamily
}) {
  const handleOnChange = newFontFamily => {
    setFontFamily(newFontFamily);
  };
  const labelStyle = {
    width: '50%'
  };
  const formStyle = {
    width: '100%',
    textAlign: 'left'
  };
  const changeFontLavel = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    style: {
      display: 'block',
      transform: 'translateX(33%)'
    }
  }, " \u30D5\u30A9\u30F3\u30C8\u3092\u9078\u629E");
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: formStyle,
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
  }));
}
/* harmony default export */ __webpack_exports__["default"] = (FontFamilyControl);

/***/ }),

/***/ "./src/components/ManegedError.js":
/*!****************************************!*\
  !*** ./src/components/ManegedError.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _objects_errorMessages__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../objects/errorMessages */ "./src/objects/errorMessages.js");
/* harmony import */ var _objects_weatherObject__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../objects/weatherObject */ "./src/objects/weatherObject.js");



const ManagedError = () => {
  let errorTitle;
  let errorMessage;
  if (_objects_weatherObject__WEBPACK_IMPORTED_MODULE_2__.isApiError.isError) {
    errorTitle = "APIの取得に失敗しました。";
  }
  if (_objects_weatherObject__WEBPACK_IMPORTED_MODULE_2__.isApiError.statusCode === null || _objects_weatherObject__WEBPACK_IMPORTED_MODULE_2__.isApiError.statusCode === undefined) {
    _objects_weatherObject__WEBPACK_IMPORTED_MODULE_2__.isApiError.statusCode = "不明なエラー";
  } else {
    errorMessage = _objects_errorMessages__WEBPACK_IMPORTED_MODULE_1__.responseErrorMessage[_objects_weatherObject__WEBPACK_IMPORTED_MODULE_2__.isApiError.statusCode] || "不明なエラーが発生しました。";
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, errorTitle), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "error-message"
  }, errorMessage), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "\u30B9\u30C6\u30FC\u30BF\u30B9\u30B3\u30FC\u30C9: ", _objects_weatherObject__WEBPACK_IMPORTED_MODULE_2__.isApiError.statusCode), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "\u30D6\u30E9\u30A6\u30B6\u306E\u958B\u767A\u8005\u30C4\u30FC\u30EB\u3092\u958B\u304D\u3001"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "\u30A8\u30E9\u30FC\u5185\u5BB9\u3092\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\u3002")));
};
/* harmony default export */ __webpack_exports__["default"] = (ManagedError);

/***/ }),

/***/ "./src/components/Preview.js":
/*!***********************************!*\
  !*** ./src/components/Preview.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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
/* harmony import */ var _objects_weatherObject__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../objects/weatherObject */ "./src/objects/weatherObject.js");
/* harmony import */ var _ManegedError__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ManegedError */ "./src/components/ManegedError.js");






function Preview({
  attributes,
  commonProps
}) {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, _objects_weatherObject__WEBPACK_IMPORTED_MODULE_4__.isApiError.isError ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ManegedError__WEBPACK_IMPORTED_MODULE_5__["default"], {
    isApiError: _objects_weatherObject__WEBPACK_IMPORTED_MODULE_4__.isApiError.statusCode
  }) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "layout"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "today-and-tomorrow weather-layout"
  }, attributes.showTodayWeather && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_CurrentWeather__WEBPACK_IMPORTED_MODULE_2__.CurrentWeather, {
    weather: attributes.todayWeather,
    title: "\u4ECA\u65E5\u306E\u5929\u6C17",
    showHoliday: attributes.showHoliday,
    showPrecipitation: attributes.showPrecipitation,
    ...commonProps
  }), attributes.showTomorrowWeather && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_CurrentWeather__WEBPACK_IMPORTED_MODULE_2__.CurrentWeather, {
    weather: attributes.tomorrowWeather,
    title: "\u660E\u65E5\u306E\u5929\u6C17",
    showHoliday: attributes.showHoliday,
    showPrecipitation: attributes.showPrecipitation,
    ...commonProps
  })), attributes.showWeeklyWeather && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_WeekWeather__WEBPACK_IMPORTED_MODULE_3__["default"], {
    weather: attributes.weeklyWeather,
    ...commonProps
  })));
}

/***/ }),

/***/ "./src/components/SelectCity.js":
/*!**************************************!*\
  !*** ./src/components/SelectCity.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);


const SelectCity = ({
  selectedCity,
  cityOptions,
  handleCityChange
}) => {
  const labelStyle = {
    width: '50%'
  };
  const formStyle = {
    width: '100%',
    textAlign: 'center',
    textAlign: 'left'
  };
  const selectedCityLabel = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    style: {
      display: 'block',
      transform: 'translateX(33%)'
    }
  }, " \u90FD\u5E02\u3092\u9078\u629E");
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: formStyle,
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
/* harmony default export */ __webpack_exports__["default"] = (SelectCity);

/***/ }),

/***/ "./src/components/SettingGroup.js":
/*!****************************************!*\
  !*** ./src/components/SettingGroup.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SelectCity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SelectCity */ "./src/components/SelectCity.js");
/* harmony import */ var _VisibilityControl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./VisibilityControl */ "./src/components/VisibilityControl.js");
/* harmony import */ var _UICintrolGroup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./UICintrolGroup */ "./src/components/UICintrolGroup.js");




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
  const headingTitle = {
    textAlign: 'center'
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: wrapperStyle
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    style: headingTitle
  }, "\u8A2D\u5B9A"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_SelectCity__WEBPACK_IMPORTED_MODULE_1__["default"], {
    selectedCity: selectedCity,
    cityOptions: cityOptions,
    handleCityChange: handleCityChange
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_VisibilityControl__WEBPACK_IMPORTED_MODULE_2__["default"], {
    settings: visibilitySettings
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_UICintrolGroup__WEBPACK_IMPORTED_MODULE_3__["default"], {
    fontFamily: fontFamily,
    onChangeFontFamily: onChangeFontFamily,
    textColor: textColor,
    setTextColor: setTextColor,
    selectedOption: selectedOption,
    setSelectedOption: setSelectedOption,
    fontBalanceOptions: fontBalanceOptions,
    attributes: attributes,
    setAttributes: setAttributes
  }));
};
/* harmony default export */ __webpack_exports__["default"] = (SettingGroup);

/***/ }),

/***/ "./src/components/Temp.js":
/*!********************************!*\
  !*** ./src/components/Temp.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

const Temp = ({
  weather
}) => {
  if (!weather) return null;
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

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);

// TextColorControl.js

function TextColorControl({
  textColor,
  setTextColor,
  setAttributes
}) {
  const handleOnChange = newTextColor => {
    setTextColor(newTextColor);
    setAttributes({
      textColor: newTextColor
    });
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: "\u30C6\u30AD\u30B9\u30C8\u306E\u8272\u3092\u9078\u629E",
    value: textColor,
    options: [{
      label: '黒',
      value: 'black'
    }, {
      label: '白',
      value: 'white'
    }],
    onChange: handleOnChange
  });
}
/* harmony default export */ __webpack_exports__["default"] = (TextColorControl);

/***/ }),

/***/ "./src/components/TimeZone.js":
/*!************************************!*\
  !*** ./src/components/TimeZone.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

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

/***/ "./src/components/UICintrolGroup.js":
/*!******************************************!*\
  !*** ./src/components/UICintrolGroup.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _FontFamilyControl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FontFamilyControl */ "./src/components/FontFamilyControl.js");
/* harmony import */ var _TextColorControl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TextColorControl */ "./src/components/TextColorControl.js");
/* harmony import */ var _BackgroundSelector__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./BackgroundSelector */ "./src/components/BackgroundSelector.js");
/* harmony import */ var _BorderControlGroup__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./BorderControlGroup */ "./src/components/BorderControlGroup.js");






const UIControlGroup = ({
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
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_BorderControlGroup__WEBPACK_IMPORTED_MODULE_5__["default"], {
    attributes: attributes,
    setAttributes: setAttributes
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_FontFamilyControl__WEBPACK_IMPORTED_MODULE_2__["default"], {
    fontFamily: fontFamily || attributes.fontFamily,
    setFontFamily: onChangeFontFamily
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_TextColorControl__WEBPACK_IMPORTED_MODULE_3__["default"], {
    textColor: textColor,
    setTextColor: value => {
      setTextColor(value);
      setAttributes({
        textColor: value
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: "Font Balance",
    value: selectedOption.label,
    options: fontBalanceOptions.map(opt => ({
      label: opt.label,
      value: opt.label
    })),
    onChange: label => {
      const option = fontBalanceOptions.find(opt => opt.label === label);
      setSelectedOption(option);
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_BackgroundSelector__WEBPACK_IMPORTED_MODULE_4__["default"], {
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

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);


const VisibilityControl = ({
  settings
}) => {
  const group1 = settings.slice(0, 4); // 最初の3つ
  const group2 = settings.slice(4); // 残りの2つ

  const handleVisibilityChange = (index, isChecked) => {
    const updatedSettings = [...settings];
    updatedSettings[index].checked = isChecked;
    updatedSettings[index].onChange(isChecked);
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
  }, group1.map((setting, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.CheckboxControl, {
    key: index,
    label: setting.label,
    checked: setting.checked,
    onChange: isChecked => handleVisibilityChange(index, isChecked)
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "visibility-group",
    id: "group2"
  }, group2.map((setting, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.CheckboxControl, {
    key: index + group1.length // インデックスを調整
    ,
    label: setting.label,
    checked: setting.checked,
    onChange: isChecked => handleVisibilityChange(index + group1.length, isChecked)
  })))));
};
/* harmony default export */ __webpack_exports__["default"] = (VisibilityControl);

/***/ }),

/***/ "./src/components/WeekWeather.js":
/*!***************************************!*\
  !*** ./src/components/WeekWeather.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Temp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Temp */ "./src/components/Temp.js");
/* harmony import */ var _functions_useBorderStyles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../functions/useBorderStyles */ "./src/functions/useBorderStyles.js");
/* harmony import */ var _functions_useBackgroundStyles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../functions/useBackgroundStyles */ "./src/functions/useBackgroundStyles.js");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../editor.scss */ "./src/editor.scss");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../style.scss */ "./src/style.scss");






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
  backgroundColor
}) => {
  if (!weather) return null;
  const borderStyles = (0,_functions_useBorderStyles__WEBPACK_IMPORTED_MODULE_2__["default"])(borders);
  const backgroundStyles = (0,_functions_useBackgroundStyles__WEBPACK_IMPORTED_MODULE_3__["default"])(backgroundStyleType, selectedMedia, backgroundColor, backgroundGradient);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
    className: `block--weekly weather-layout ${styleVariant}`,
    style: {
      ...borderStyles,
      borderRadius: borderRadius,
      fontFamily: fontFamily,
      ...backgroundStyles,
      color
    }
  }, weather.slice(0, 6).map(dayWeather => {
    if (!dayWeather || !dayWeather.day) return null;
    let textColor;
    if (dayWeather.day.isHoliday || dayWeather.day.isSunday) {
      textColor = "red";
    } else if (dayWeather.day.isSaturday) {
      textColor = "blue";
    }
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
      className: "block--day",
      key: dayWeather.day.date
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
      className: "c-title__weather",
      style: {
        color: textColor
      }
    }, dayWeather.day.date.month, dayWeather.day.date.day, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), dayWeather.day.date.dayOfWeek), dayWeather.day.isHoliday && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, displayDate), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      className: "weather__name"
    }, dayWeather.name), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "weather__img"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: dayWeather.image,
      alt: "Weather Icon"
    })), dayWeather.highestTemperature && dayWeather.lowestTemperature && dayWeather.maximumTemperatureComparison && dayWeather.lowestTemperatureComparison && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Temp__WEBPACK_IMPORTED_MODULE_1__["default"], {
      weather: dayWeather
    }));
  }));
};
/* harmony default export */ __webpack_exports__["default"] = (WeekWeather);

/***/ }),

/***/ "./src/data/getWeatherInfo.js":
/*!************************************!*\
  !*** ./src/data/getWeatherInfo.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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
  const pluginImagePaths = myPluginData.pluginImagePath;

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

/***/ "./src/edit.js":
/*!*********************!*\
  !*** ./src/edit.js ***!
  \*********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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
/* harmony import */ var _functions_useChangeCity__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./functions/useChangeCity */ "./src/functions/useChangeCity.js");
/* harmony import */ var _functions_useOutsideClick__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./functions/useOutsideClick */ "./src/functions/useOutsideClick.js");
/* harmony import */ var _objects_visibilitySettings__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./objects/visibilitySettings */ "./src/objects/visibilitySettings.js");
/* harmony import */ var _objects_getSpotWeather__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./objects/getSpotWeather */ "./src/objects/getSpotWeather.js");
/* harmony import */ var _functions_useFontFamilyControl__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./functions/useFontFamilyControl */ "./src/functions/useFontFamilyControl.js");
/* harmony import */ var _functions_useChangeBalance__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./functions/useChangeBalance */ "./src/functions/useChangeBalance.js");
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



// import { SelectControl } from '@wordpress/components';




// import UIControlGroup from './components/UICintrolGroup';


// import VisibilityControl from './components/VisibilityControl';




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
  } = (0,_functions_useFontFamilyControl__WEBPACK_IMPORTED_MODULE_10__.useFontFamilyControl)(attributes, setAttributes);
  const [textColor, setTextColor] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(attributes.textColor);
  const weatherData = (0,_functions_useChangeCity__WEBPACK_IMPORTED_MODULE_6__.useChangeCity)(selectedCity);
  const visibilitySettings = (0,_objects_visibilitySettings__WEBPACK_IMPORTED_MODULE_8__.createVisibilitySettings)({
    attributes,
    setAttributes
  });
  const [selectedMedia, setSelectedMedia] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(attributes.selectedMedia);
  const {
    showSelection,
    handleLayoutClick
  } = (0,_functions_useOutsideClick__WEBPACK_IMPORTED_MODULE_7__["default"])();
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
    className: 'my-first-plugin'
  });
  const cityOptions = Object.entries(_objects_getSpotWeather__WEBPACK_IMPORTED_MODULE_9__.cities).map(([key, city]) => ({
    label: city.name,
    // 'name'属性を表示テキストとして使用
    value: key // キー（都市名）を内部値として使用
  }));

  const handleCityChange = selectedCityKey => {
    const newSelectedCity = _objects_getSpotWeather__WEBPACK_IMPORTED_MODULE_9__.cities[selectedCityKey];
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
  } = (0,_functions_useChangeBalance__WEBPACK_IMPORTED_MODULE_11__.useChangeBalance)(attributes.balanceOption, setAttributes);
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
    backgroundColor: attributes.backgroundColor
  };
  console.log(attributes);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ...blockProps
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

/***/ "./src/functions/useBackgroundStyles.js":
/*!**********************************************!*\
  !*** ./src/functions/useBackgroundStyles.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
// useBackgroundStyles.js

function useBackgroundStyles(backgroundStyleType, selectedMedia, backgroundColor, backgroundGradient) {
  const [backgroundStyles, setBackgroundStyles] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({});
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    switch (backgroundStyleType) {
      case 'image':
        if (selectedMedia) {
          setBackgroundStyles({
            backgroundImage: `url('${selectedMedia}')`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
          });
        }
        break;
      case 'color':
        if (backgroundColor) {
          setBackgroundStyles({
            background: backgroundColor
          });
        }
        break;
      case 'gradient':
        if (backgroundGradient) {
          setBackgroundStyles({
            background: backgroundGradient
          });
        }
        break;
      default:
        // 他のスタイルタイプやデフォルトの処理をここに追加できます。
        break;
    }
  }, [backgroundStyleType, selectedMedia, backgroundColor, backgroundGradient]);
  return backgroundStyles;
}
/* harmony default export */ __webpack_exports__["default"] = (useBackgroundStyles);

/***/ }),

/***/ "./src/functions/useBorderControl.js":
/*!*******************************************!*\
  !*** ./src/functions/useBorderControl.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useBorderControl: function() { return /* binding */ useBorderControl; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

function useBorderControl(attributes, setAttributes) {
  const borderColors = [{
    name: 'Blue 20',
    color: '#72aee6'
  }];
  const defaultBorder = {
    color: '#72aee6',
    style: 'dashed',
    width: '1px'
  };
  const [borders, setBorders] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(attributes.borders || {
    top: defaultBorder,
    right: defaultBorder,
    bottom: defaultBorder,
    left: defaultBorder
  });
  const units = [{
    label: 'px',
    value: 'px'
  }, {
    label: '%',
    value: '%'
  }];
  const onChangeBorder = newBorders => {
    const updatedBorders = {
      top: {
        ...borders.top,
        ...newBorders,
        width: newBorders.width || '0px',
        color: newBorders.color || '#72AEE6',
        style: newBorders.style || 'dashed'
      },
      right: {
        ...borders.right,
        ...newBorders,
        width: newBorders.width || '0px',
        color: newBorders.color || '#72AEE6',
        style: newBorders.style || 'dashed'
      },
      bottom: {
        ...borders.bottom,
        ...newBorders,
        width: newBorders.width || '0px',
        color: newBorders.color || '#72AEE6',
        style: newBorders.style || 'dashed'
      },
      left: {
        ...borders.left,
        ...newBorders,
        width: newBorders.width || '0px',
        color: newBorders.color || '#72AEE6',
        style: newBorders.style || 'dashed'
      }
    };
    setAttributes({
      ...attributes,
      borders: updatedBorders
    });
    setBorders(updatedBorders);
  };
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (attributes.borders) {
      setBorders(attributes.borders);
    }
  }, [attributes.borders]);
  const handleRangeChange = newValue => {
    const currentUnit = attributes.borderRadiusValue?.replace(/[0-9]/g, '') || 'px';
    if (!isNaN(newValue)) {
      setAttributes({
        ...attributes,
        borderRadiusValue: `${newValue}${currentUnit}`
      });
    }
  };
  const handleUnitChange = newUnit => {
    const currentValue = parseInt(attributes.borderRadiusValue || '0', 10);
    setAttributes({
      ...attributes,
      borderRadiusValue: `${currentValue}${newUnit}`
    });
  };
  return {
    borders,
    onChangeBorder,
    handleRangeChange,
    handleUnitChange,
    borderColors,
    units
  };
}

/***/ }),

/***/ "./src/functions/useBorderStyles.js":
/*!******************************************!*\
  !*** ./src/functions/useBorderStyles.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function useBorderStyles(borders) {
  const [borderStyles, setBorderStyles] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({});
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (borders) {
      setBorderStyles({
        borderTop: `${borders.top.width} ${borders.top.style} ${borders.top.color}`,
        borderRight: `${borders.right.width} ${borders.right.style} ${borders.right.color}`,
        borderBottom: `${borders.bottom.width} ${borders.bottom.style} ${borders.bottom.color}`,
        borderLeft: `${borders.left.width} ${borders.left.style} ${borders.left.color}`
      });
    }
  }, [borders]);
  return borderStyles;
}
/* harmony default export */ __webpack_exports__["default"] = (useBorderStyles);

/***/ }),

/***/ "./src/functions/useChangeBalance.js":
/*!*******************************************!*\
  !*** ./src/functions/useChangeBalance.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useChangeBalance: function() { return /* binding */ useChangeBalance; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

function useChangeBalance(initialOption, setAttributes) {
  const defaultOption = {
    label: 'EmphasizeTheWeather',
    value: "EmphasizeTheWeather"
  };
  const [selectedOption, setSelectedOption] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(initialOption || defaultOption);
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
  const applyFontBalance = option => {
    fontBalanceOptions.forEach(opt => {
      document.querySelectorAll('.block--current').forEach(article => article.classList.remove(opt.value));
      document.querySelectorAll('.block--weekly').forEach(ul => ul.classList.remove(opt.value));
    });
    if (option.value !== "default") {
      document.querySelectorAll('.block--current').forEach(article => article.classList.add(option.value));
      document.querySelectorAll('.block--weekly').forEach(ul => ul.classList.add(option.value));
    }
  };
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    applyFontBalance(selectedOption);
    setAttributes({
      balanceOption: selectedOption.value
    }); // ここで属性を更新
  }, [selectedOption]);
  return {
    selectedOption,
    setSelectedOption,
    fontBalanceOptions,
    applyFontBalance
  };
}

/***/ }),

/***/ "./src/functions/useChangeCity.js":
/*!****************************************!*\
  !*** ./src/functions/useChangeCity.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useChangeCity: function() { return /* binding */ useChangeCity; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _objects_weatherObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../objects/weatherObject */ "./src/objects/weatherObject.js");


function useChangeCity(selectedCity) {
  // 天気データを状態として保存します。
  const [weatherData, setWeatherData] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)({
    today: null,
    tomorrow: null,
    weekly: null
  });
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    async function fetchData() {
      if (!selectedCity || !selectedCity.url) {
        console.error(`No URL found for city: ${selectedCity ? selectedCity.name : "Unknown city"}`);
        return; // selectedCityオブジェクトがない、またはURLがない場合、ここで処理を終了します。
      }

      // 'selectedCity'が存在し、URLが含まれている場合、以下の処理を行います。
      const cityUrl = selectedCity.url;
      await (0,_objects_weatherObject__WEBPACK_IMPORTED_MODULE_1__.weatherObject)(cityUrl, todayWeather => {
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
    fetchData();
  }, [selectedCity]);
  return weatherData;
}

/***/ }),

/***/ "./src/functions/useFontFamilyControl.js":
/*!***********************************************!*\
  !*** ./src/functions/useFontFamilyControl.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useFontFamilyControl: function() { return /* binding */ useFontFamilyControl; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

function useFontFamilyControl(attributes, setAttributes) {
  const [fontFamily, setFontFamily] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(attributes.fontFamily);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setFontFamily(attributes.fontFamily);
  }, [attributes.fontFamily]);
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

/***/ }),

/***/ "./src/functions/useOutsideClick.js":
/*!******************************************!*\
  !*** ./src/functions/useOutsideClick.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);


function useBlockSelection() {
  const [showSelection, setShowSelection] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  let previouslySelectedBlockId = null;
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const unsubscribe = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.subscribe)(() => {
      const selectedBlockId = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.select)('core/block-editor').getSelectedBlockClientId();

      // 新しくブロックが選択された場合
      if (selectedBlockId && previouslySelectedBlockId !== selectedBlockId) {
        setShowSelection(true);
      }

      // ブロックの選択が解除された場合
      if (!selectedBlockId && previouslySelectedBlockId) {
        setShowSelection(false);
      }
      previouslySelectedBlockId = selectedBlockId;
    });

    // コンポーネントのクリーンアップ時に購読を解除する
    return () => unsubscribe();
  }, []);
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
/* harmony default export */ __webpack_exports__["default"] = (useBlockSelection);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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

/***/ "./src/objects/dayWithHoloday.js":
/*!***************************************!*\
  !*** ./src/objects/dayWithHoloday.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const dayWithHoliday = async (addBreak = false) => {
  async function getHolidays() {
    const response = await fetch('https://holidays-jp.github.io/api/v1/date.json');
    const holidays = await response.json();
    return holidays;
  }
  function getDateRangeArray(startDate, endDate) {
    const dateArray = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      dateArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray;
  }
  async function getOneWeekDatesWithHolidays(addBreak = false) {
    const today = new Date();
    const sixDaysLater = new Date(today);
    sixDaysLater.setDate(today.getDate() + 6);
    const oneWeekDates = getDateRangeArray(today, sixDaysLater);

    // Get the holidays
    const holidays = await getHolidays();

    // Create an array of dates with holidays data included
    const oneWeekDatesWithHolidays = oneWeekDates.map(date => {
      const weekDays = ["日", "月", "火", "水", "木", "金", "土"];
      const dayOfWeek = weekDays[date.getDay()];
      const formattedDate = `${String(date.getMonth() + 1)}月${String(date.getDate())}日(${dayOfWeek})`;
      return {
        date: {
          month: `${String(date.getMonth() + 1)}月`,
          day: `${String(date.getDate())}日`,
          dayOfWeek: `(${dayOfWeek})`,
          fullDate: `${String(date.getMonth() + 1)}月${String(date.getDate())}日(${dayOfWeek})`
        },
        isHoliday: !!holidays[formattedDate],
        // this will be true if the date is a holiday, otherwise false
        holidayName: holidays[formattedDate] || null,
        // this will have the holiday name if the date is a holiday, otherwise null
        isSaturday: date.getDay() === 6,
        isSunday: date.getDay() === 0
      };
    });
    return oneWeekDatesWithHolidays;
  }
  return await getOneWeekDatesWithHolidays(addBreak);
};
/* harmony default export */ __webpack_exports__["default"] = (dayWithHoliday);

/***/ }),

/***/ "./src/objects/errorMessages.js":
/*!**************************************!*\
  !*** ./src/objects/errorMessages.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   responseErrorMessage: function() { return /* binding */ responseErrorMessage; }
/* harmony export */ });
// errorMessages.js

const responseErrorMessage = {
  400: "リクエストが不正です。入力を確認してください。",
  401: "認証に失敗しました。APIキーを確認してください。",
  403: "アクセスが拒否されました。権限を確認してください。",
  404: "リクエストしたリソースが見つかりませんでした。",
  500: "サーバー側で問題が発生しました。後ほど再試行してください。",
  503: "サービスが利用不可です。後ほど再試行してください。"
};

/***/ }),

/***/ "./src/objects/getSpotWeather.js":
/*!***************************************!*\
  !*** ./src/objects/getSpotWeather.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cities: function() { return /* binding */ cities; }
/* harmony export */ });
const cities = {
  // https://open-meteo.com/en/docs
  // Daily Weather Variables Weathercode / Maximum Temperature (2 m) / Minimum Temperature (2 m) / Past days 1

  札幌: {
    name: '札幌',
    url: 'https://api.open-meteo.com/v1/forecast?latitude=43.0667&longitude=141.35&hourly=temperature_2m,precipitation_probability,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo&past_days=1&forecast_days=14'
  },
  秋田: {
    name: '秋田',
    url: 'https://api.open-meteo.com/v1/forecast?latitude=39.7167&longitude=140.1167&hourly=temperature_2m,precipitation_probability,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo&past_days=1&forecast_days=14'
  },
  金沢: {
    name: '金沢',
    url: 'https://api.open-meteo.com/v1/forecast?latitude=36.6&longitude=136.6167&hourly=temperature_2m,precipitation_probability,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo&past_days=1&forecast_days=14'
  },
  東京: {
    name: '東京',
    url: 'https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&hourly=precipitation_probability,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo&past_days=1&forecast_days=14'
  },
  大宮: {
    name: '大宮',
    url: 'https://api.open-meteo.com/v1/forecast?latitude=35.9635&longitude=139.8305&hourly=temperature_2m,precipitation_probability,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo&past_days=1&forecast_days=14'
  },
  名古屋: {
    name: '名古屋',
    url: 'https://api.open-meteo.com/v1/forecast?latitude=35.1815&longitude=136.9064&hourly=temperature_2m,precipitation_probability,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo&past_days=1&forecast_days=14'
  },
  南堀江: {
    name: '南堀江',
    url: 'https://api.open-meteo.com/v1/forecast?latitude=34.6711&longitude=135.4942&hourly=temperature_2m,precipitation_probability,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo&past_days=1&forecast_days=14'
  },
  八尾: {
    name: '八尾',
    url: 'https://api.open-meteo.com/v1/forecast?latitude=34.6167&longitude=135.6&hourly=temperature_2m,precipitation_probability,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo&past_days=1&forecast_days=14'
  },
  奈良: {
    name: '奈良',
    url: 'https://api.open-meteo.com/v1/forecast?latitude=34.685&longitude=135.8049&hourly=temperature_2m,precipitation_probability,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo&past_days=1&forecast_days=14'
  },
  朝来: {
    name: '朝来',
    url: 'https://api.open-meteo.com/v1/forecast?latitude=35.2591&longitude=134.8139&hourly=temperature_2m,precipitation_probability,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo&past_days=1&forecast_days=14'
  },
  福岡: {
    name: '福岡',
    url: 'https://api.open-meteo.com/v1/forecast?latitude=33.6&longitude=130.4167&hourly=temperature_2m,precipitation_probability,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo&past_days=1&forecast_days=14'
  },
  佐世保: {
    name: '佐世保',
    url: 'https://api.open-meteo.com/v1/forecast?latitude=33.1683&longitude=129.725&hourly=temperature_2m,precipitation_probability,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo&past_days=1&forecast_days=14'
  },
  諸塚: {
    name: '諸塚',
    url: 'https://api.open-meteo.com/v1/forecast?latitude=32.5601&longitude=131.3198&hourly=temperature_2m,precipitation_probability,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo&past_days=1&forecast_days=14'
  },
  パリ: {
    name: 'パリ',
    url: 'https://api.open-meteo.com/v1/forecast?latitude=48.8534&longitude=2.3488&hourly=temperature_2m,precipitation_probability,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo&past_days=1&forecast_days=14'
  }
};

/***/ }),

/***/ "./src/objects/visibilitySettings.js":
/*!*******************************************!*\
  !*** ./src/objects/visibilitySettings.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createVisibilitySettings: function() { return /* binding */ createVisibilitySettings; }
/* harmony export */ });
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
  return [{
    label: "今日の天気を表示",
    checked: attributes.showTodayWeather,
    // 属性から現在の値を取得
    onChange: isChecked => {
      // 'showTodayWeather' 属性を更新
      setAttributes({
        showTodayWeather: isChecked
      });
    }
  },, {
    label: '明日の天気を表示',
    checked: attributes.showTomorrowWeather,
    onChange: isChecked => {
      // 'showTodayWeather' 属性を更新
      setAttributes({
        showTomorrowWeather: isChecked
      });
    }
  }, {
    label: '週間天気を表示',
    checked: attributes.showWeeklyWeather,
    onChange: isChecked => {
      // 'showTodayWeather' 属性を更新
      setAttributes({
        showWeeklyWeather: isChecked
      });
    }
  }, {
    label: '祝日を表示',
    checked: attributes.showHoliday,
    onChange: checked => {
      setAttributes({
        showHoliday: checked
      });
    }
  }, {
    label: '降水確率を表示',
    checked: attributes.showPrecipitation,
    onChange: checked => {
      setAttributes({
        showPrecipitation: checked
      });
    }
  }];
};

/***/ }),

/***/ "./src/objects/weatherObject.js":
/*!**************************************!*\
  !*** ./src/objects/weatherObject.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isApiError: function() { return /* binding */ isApiError; },
/* harmony export */   weatherObject: function() { return /* binding */ weatherObject; }
/* harmony export */ });
/* harmony import */ var _data_getWeatherInfo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data/getWeatherInfo */ "./src/data/getWeatherInfo.js");
/* harmony import */ var _dayWithHoloday__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dayWithHoloday */ "./src/objects/dayWithHoloday.js");



let isApiError = {
  isError: false,
  statusCode: null
};
let apiRequestCount = 0;
const weatherObject = async (cityurl, setTodayWeather, setTomorrowWeather, setWeeklyWeather, addBreak = false) => {
  try {
    if (!cityurl) {
      throw new Error(`City "${cityurl}" does not exist in the city object.`);
    }
    const apiUrl = myPluginData.siteUrl + '/wp-json/j-weather-customizer/save-data/';

    // console.log('Making request to weather API for city:', cityurl); // API呼び出し前のログ

    apiRequestCount++;
    console.log(`リクエスト回数: ${apiRequestCount}`);
    const response = await fetch(cityurl);
    if (!response.ok) {
      // 429 エラーの場合、APIアクセスが制限されているとみなす
      isApiError = false;
      isApiError.statusCode = response.status;
      if (response.status === 429) {} else {
        throw new Error(`Failed to fetch data for city: ${cityurl}. Status: ${response.status}`);
      }
    } else {
      isApiError.isError = false;
      isApiError.statusCode = null;
    }
    const data2 = await response.json();
    if (!data2 || !data2.daily) {
      throw new Error("Unexpected data format received from the weather API.");
    }
    const datesForWeek = await (0,_dayWithHoloday__WEBPACK_IMPORTED_MODULE_1__["default"])(addBreak);
    if (!datesForWeek || datesForWeek.length !== 7) {
      throw new Error("Unexpected date array length from dayWithHoliday.");
    }
    const weatherCodesForWeek = data2.daily.weathercode; // 本日から6日後までの天気コード

    // 天気コードを天気名に変換
    const weatherNamesForWeek = weatherCodesForWeek.map(code => (0,_data_getWeatherInfo__WEBPACK_IMPORTED_MODULE_0__["default"])(code).label);
    const weatherImageForWeek = weatherCodesForWeek.map(code => (0,_data_getWeatherInfo__WEBPACK_IMPORTED_MODULE_0__["default"])(code).icon);
    const highestTemperatureForWeek = data2.daily.temperature_2m_max; // 昨日から6日後までの天気コード
    const lowestTemperatureForWeek = data2.daily.temperature_2m_min; // 昨日から6日後までの天気コード
    const highestTemperatureDifferencesForWeek = [];
    for (let i = -1; i < highestTemperatureForWeek.length; i++) {
      const todayMaxTemperature = highestTemperatureForWeek[i + 1];
      const yesterdayMaxTemperature = highestTemperatureForWeek[i];
      const temperatureDifference = Math.ceil((todayMaxTemperature - yesterdayMaxTemperature) * 10) / 10;
      const formattedDifference = temperatureDifference >= 0 ? `(+${temperatureDifference})` : `(-${Math.abs(temperatureDifference)})`;
      highestTemperatureDifferencesForWeek.push(formattedDifference);
    }
    const lowestTemperatureDifferencesForWeek = [];
    for (let i = -1; i < lowestTemperatureForWeek.length; i++) {
      const todayMinTemperature = lowestTemperatureForWeek[i + 1];
      const yesterdayMinTemperature = lowestTemperatureForWeek[i];
      const temperatureDifference = Math.ceil((todayMinTemperature - yesterdayMinTemperature) * 10) / 10;
      const formattedDifference = temperatureDifference >= 0 ? `(+${temperatureDifference})` : `(-${Math.abs(temperatureDifference)})`;
      lowestTemperatureDifferencesForWeek.push(formattedDifference);
    }
    const rainProbability1 = {};
    for (let i = 1; i <= 7; i++) {
      let baseTime = i === 0 ? 0 : 24 * i;
      rainProbability1[i] = [];
      for (let j = 0; j < 4; j++) {
        rainProbability1[i].push({
          time: data2.hourly.time[baseTime + j * 6],
          precipitation_probability: data2.hourly.precipitation_probability[baseTime + j * 6]
        });
      }
    }
    const dailyData = weatherNamesForWeek.map((name, index) => ({
      day: datesForWeek[index],
      name,
      image: weatherImageForWeek[index + 1],
      highestTemperature: highestTemperatureForWeek[index + 1],
      lowestTemperature: lowestTemperatureForWeek[index + 1],
      maximumTemperatureComparison: highestTemperatureDifferencesForWeek[index + 1],
      lowestTemperatureComparison: lowestTemperatureDifferencesForWeek[index + 1],
      rainProbability: rainProbability1[index + 1]
    }));
    const postResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': myPluginData.nonce // nonceをヘッダーに追加
      },

      body: JSON.stringify({
        dailyData: dailyData
      })
    });
    if (!postResponse.ok) {
      throw new Error(`Failed to post data to ${apiUrl}. Status: ${postResponse.status}`);
    }
    if (typeof setTodayWeather !== 'function') {
      throw new Error('setTodayWeather is not a function.');
    }
    if (typeof setTomorrowWeather !== 'function') {
      throw new Error('setTomorrowWeather is not a function.');
    }
    if (typeof setWeeklyWeather !== 'function') {
      throw new Error('setWeeklyWeather is not a function.');
    }

    // 属性の設定
    if (typeof setTodayWeather === 'function') {
      setTodayWeather(dailyData[0]);
    }
    if (typeof setTomorrowWeather === 'function') {
      setTomorrowWeather(dailyData[1]);
    }
    if (typeof setWeeklyWeather === 'function') {
      setWeeklyWeather(dailyData.slice(2, 7));
    }

    // オプション値の存在を確認
  } catch (error) {
    console.error('APIの呼び出しに失敗:', error);

    // エラーが発生した場合、isApiError を更新
    isApiError.isError = true;
    isApiError.statusCode = null; // ここでエラーのステータスコードをクリアするか、必要に応じて設定
  }
};



/***/ }),

/***/ "./src/editor.scss":
/*!*************************!*\
  !*** ./src/editor.scss ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ (function(module) {

module.exports = window["React"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ (function(module) {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ (function(module) {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ (function(module) {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ (function(module) {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ (function(module) {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "./src/block.json":
/*!************************!*\
  !*** ./src/block.json ***!
  \************************/
/***/ (function(module) {

module.exports = JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"create-block/j-weather-customizer","version":"1.0","title":"JWeatherCustomizer","category":"text","icon":"flag","description":"A plugin that allows you to display a weather forecast of your choice on your website.","attributes":{"selectedCity":{"type":"object","default":{"name":"東京","url":"https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&hourly=precipitation_probability,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo&past_days=1&forecast_days=14"}},"showTomorrowWeather":{"type":"boolean","default":true},"showWeeklyWeather":{"type":"boolean","default":true},"showTodayWeather":{"type":"boolean","default":true},"showHoliday":{"type":"boolean","default":true},"showPrecipitation":{"type":"boolean","default":true},"tomorrowWeather":{"type":"object","default":{}},"weeklyWeather":{"type":"array","default":[]},"todayWeather":{"type":"object","default":{}},"borderRadiusValue":{"type":"string","default":"0px"},"borders":{"type":"object","default":{"top":{"color":"#72aee6","style":"dashed","width":"1px"},"right":{"color":"#72aee6","style":"dashed","width":"1px"},"bottom":{"color":"#72aee6","style":"dashed","width":"1px"},"left":{"color":"#72aee6","style":"dashed","width":"1px"}}},"fontFamily":{"type":"string","default":"Noto Sans JP, sans-serif"},"textColor":{"type":"string","default":"black"},"backgroundStyleType":{"type":"string","default":"color"},"backgroundImage":{"type":"string","default":"http://hoge.local/wp-content/uploads/2023/10/IMG_5308-scaled.jpeg"},"backgroundGradient":{"type":"string","default":"linear-gradient(135deg,#1E9600 0%, #FFF200 0%, #FF0000 100%)"},"backgroundColor":{"type":"string","default":"#fff"},"balanceOption":{"type":"string","default":"EmphasizeTheWeather"}},"supports":{"html":false},"textdomain":"j-weather-customizer","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css"}');

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
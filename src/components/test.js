// import {
// useBorderControl
// } from '../functions/useBorderControl'; // バリデーション関数が定義されているファイルへのパスを正しく指定してください

// const testBorderValues = {
//   color: '#invalidColor',
//   style: 'invalidStyle',
//   width: 'invalidWidth',
// };

// const testRangeValue = -1;
// const testUnitValue = 'invalidUnit';

// function test() {
//   const attributes = {
//     borders: testBorderValues,
//     borderRadiusValue: '50px', // 有効な初期値を設定
//   };

//   const setAttributes = (newAttributes) => {
//     // エラーメッセージの確認
//     console.log('New Border Set Error:', newAttributes.newBorderSetErrorMessage);
//     console.log('Handle Range Change Error:', newAttributes.handleRangeChangeErrorMessage);
//     console.log('Handle Unit Change Error:', newAttributes.handleUnitChangeErrorMessage);
//   };

//   const {
//     onChangeBorder,
//     handleRangeChange,
//     handleUnitChange,
//   } = useBorderControl(attributes, setAttributes);

//   // 無効なボーダーセットを設定してエラーメッセージをテスト
//   onChangeBorder(testBorderValues);

//   // 有効な範囲外の値を設定してエラーメッセージをテスト
//   handleRangeChange(testRangeValue);

//   // 無効な単位を設定してエラーメッセージをテスト
//   handleUnitChange(testUnitValue);
// }

// // テストの実行
// test();

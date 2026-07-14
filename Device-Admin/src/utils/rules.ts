/**
 * 验证身份证号码
 * @param {string} val 当前值字符串
 * @returns {boolean} 符合返回true，否则false
 */
export const identityCardRule = (val: string) => {
  return (
    val &&
    (/^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/.test(val) ||
      /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(
        val
      ))
  );
};

// /**
//  * 验证车牌号码
//  * @param {string} val 当前值字符串
//  * @returns {boolean} 符合返回true，否则false
//  */
// export function numberplateRule(val: string) {
//   return (
//     val &&
//     /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/.test(
//       val
//     )
//   );
// }

/**
 * 验证车牌号码（兼容燃油车、新能源车）
 * @param {string} val 车牌号
 * @returns {boolean} 符合返回 true，否则 false
 */
export function numberplateRule(val: string) {
  if (!val) return false;
  // 普通车牌（燃油车）：第1位省份 + 第2位A-Z + 后5位字母/数字（最后一位可挂学警港澳等）
  const standardPlate =
    /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4,5}[A-HJ-NP-Z0-9挂学警港澳使领]?$/;
  // 新能源车牌（纯电动D/插电混动F）：6位，第6位是D/F
  const newEnergyPlate =
    /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z]([0-9]{5}[DF]|[DF][A-HJ-NP-Z0-9][0-9]{4})$/;
  return standardPlate.test(val) || newEnergyPlate.test(val);
}

/**
 * 验证手机号
 * @param {string} val 当前值字符串
 * @returns {boolean} 符合返回true，否则false
 */
export function phoneRule(val: string) {
  return val && /^1[3-9]\d{9}$/.test(val);
}

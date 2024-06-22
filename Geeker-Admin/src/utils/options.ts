// 全部数据筛选
export const ALL_OPTIONS = [
  {
    label: "全部",
    value: ""
  }
];
// 默认导出，找到匹配的元素
export default (options: Array<any>, value: string) => {
  return options.find(item => item.value === value);
};

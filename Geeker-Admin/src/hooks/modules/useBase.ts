import type { Ref, UnwrapRef } from "vue";

export const useBasicsState = <T>(
  value: T, // 默认值
  callback?: Dispatch<T> // 回调
): [Ref<UnwrapRef<T>>, Dispatch<T>] => {
  // 默认值
  const basicsState = ref<T>(value);
  // 修改默认值
  const setBasicsState = (newValue: T) => {
    // 判断修改结果不等于上一次
    if (basicsState.value !== newValue) {
      // 修改值
      basicsState.value = newValue as UnwrapRef<T>;
      // 存在后调事件调用
      if (callback) callback(newValue);
    }
  };
  // 暴露API
  return [basicsState, setBasicsState];
};

export const useBasicsSet = (defaultValue: Array<string> = []) => {
  const basicsSet = ref<Set<string>>(new Set(defaultValue));
  // 检查是否存在某个值
  const hasValue = (key: string) => {
    return basicsSet.value.has(key);
  };
  // 添加某个值
  const addValue = (key: string) => {
    if (!hasValue(key)) basicsSet.value.add(key);
  };
  // 删除某个值
  const deleteValue = (key: string) => {
    if (hasValue(key)) basicsSet.value.delete(key);
  };
  // 清空
  const clearValue = () => {
    basicsSet.value.clear();
  };
  // 暴露API
  return { basicsSet, hasValue, addValue, deleteValue, clearValue };
};

export const useBasicsMap = <T = AnyObject>(defaultValue = []) => {
  const basicsMap = ref<Map<string, T>>(new Map(defaultValue));
  // 检查是否存在某个值
  const hasValue = (key: string) => {
    return basicsMap.value.has(key);
  };
  // 查询某个值
  const getValue = (key: string) => {
    return basicsMap.value.get(key);
  };
  // 添加某个值
  const addValue = (key: string, value: any) => {
    basicsMap.value.set(key, value);
  };
  // 添加删除某个值
  const setValue = (key: string, value: any) => {
    if (hasValue(key)) {
      basicsMap.value.delete(key);
    } else {
      basicsMap.value.set(key, value);
    }
  };
  // 删除某个值
  const deleteValue = (key: string) => {
    basicsMap.value.delete(key);
  };
  // 清空
  const clearValue = () => {
    basicsMap.value.clear();
  };
  // 暴露API
  return { basicsMap, getValue, hasValue, setValue, addValue, deleteValue, clearValue };
};

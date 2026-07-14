// utils/download.ts

/**
 * Base64 转 Blob（支持大文件）
 */
export const base64ToBlob = (base64: string, contentType: string): Blob => {
  try {
    const byteCharacters = atob(base64);
    const byteArray = new Uint8Array(
      Array.from(byteCharacters, (char) => char.charCodeAt(0)),
    );
    return new Blob([byteArray], { type: contentType });
  } catch (error) {
    console.error("Base64 解码失败:", error);
    throw new Error("文件数据解析失败");
  }
};

/**
 * 下载文件（带错误处理）
 */
export const downloadBase64File = (
  base64: string,
  fileName: string,
  contentType: string = "application/octet-stream",
): boolean => {
  try {
    if (!base64) {
      throw new Error("文件内容为空");
    }

    const blob = base64ToBlob(base64, contentType);

    // 检查 Blob 大小
    if (blob.size === 0) {
      throw new Error("文件内容为空");
    }

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    return true;
  } catch (error) {
    console.error("下载失败:", error);
    throw error;
  }
};

/**
 * 从响应中下载（带完整错误处理）
 */
export const downloadFromResponse = (
  response: any,
  defaultFileName: string = "download.xlsx",
): { success: boolean; message: string } => {
  try {
    const data = response.res?.data;

    if (!data) {
      return { success: false, message: "响应数据为空" };
    }

    if (!data.fileContents) {
      return { success: false, message: "文件内容为空" };
    }

    const fileName = data.fileDownloadName || defaultFileName;
    const contentType = data.contentType || "application/octet-stream";

    downloadBase64File(data.fileContents, fileName, contentType);

    return { success: true, message: "下载成功" };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "下载失败",
    };
  }
};

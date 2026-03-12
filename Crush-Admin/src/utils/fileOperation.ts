import { openWindow } from './window';

interface DownloadOptions<T = string> {
	fileName?: string;
	source: T;
	target?: string;
}

const DEFAULT_FILENAME = 'downloaded_file';

/**
 * @name 文件相关
 */

export interface ImgInfo {
	name: string;
	fileType: string;
	size: number;
	imgUrl: string;
	width: number;
	height: number;
	imageData: ImageData;
	blob: Blob;
}
/**
 * 根据文件url获取文件名
 * @param {string} url 文件url
 * @returns {string} 文件名称 + 文件类型 （如：file.pdf）
 */
export function getFileName(url: string) {
	const num = url.lastIndexOf('/') + 1;
	let fileName = url.substring(num);
	// 把参数和文件名分割开
	fileName = decodeURI(fileName.split('?')[0]);
	return fileName;
}

/**
 * 通过 URL 下载文件，支持跨域
 * @throws {Error} - 当下载失败时抛出错误
 */
export async function downloadFileFromUrl({
	fileName,
	source,
	target = '_blank',
}: DownloadOptions): Promise<void> {
	if (!source || typeof source !== 'string') {
		throw new Error('Invalid URL.');
	}

	const isChrome = window.navigator.userAgent.toLowerCase().includes('chrome');
	const isSafari = window.navigator.userAgent.toLowerCase().includes('safari');

	if (/iP/.test(window.navigator.userAgent)) {
		console.error('Your browser does not support download!');
		return;
	}

	if (isChrome || isSafari) {
		triggerDownload(source, resolveFileName(source, fileName));
		return;
	}
	if (!source.includes('?')) {
		source += '?download';
	}

	openWindow(source, { target });
}

/**
 * 文件大小格式化
 * @param {number} size 文件大小
 * @returns {string} 处理后的文件大小
 */
export const formatFileSize = (size: number) => {
	const units = ['B', 'KB', 'MB', 'GB'];
	let index = 0;
	while (size > 1024 && index < units.length) {
		size /= 1024;
		index++;
	}
	return Math.round(size * 100) / 100 + units[index];
};

/**
 * 将文件字节大小转成带单位的文件大小（更灵活）
 * @param {number} size 文件大小
 * @param {number} decimals 保留几位小数（默认2位）
 * @returns {string} 处理后的文件大小
 */
export const sizeToStr = (size: number, decimals = 2) => {
	if (size === 0) return '0 Bytes';
	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	const i = Math.floor(Math.log(size) / Math.log(k));
	return parseFloat((size / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

/**
 * 根据文件地址下载文件
 * @param {string} url 文件路径
 * @param {'_self' | '_blank'} target 打开方式
 * @param {string} fileName 文件名称
 * @returns {Promise}
 */
export function downloadByUrl({
	url,
	target = '_blank',
	fileName,
}: {
	url: string;
	target?: '_self' | '_blank';
	fileName?: string;
}): Promise<boolean> {
	// 是否同源
	const isSameHost = new URL(url).host == location.host;
	return new Promise<boolean>((resolve, reject) => {
		if (isSameHost) {
			const link = document.createElement('a');
			link.href = url;
			link.target = target;

			if (link.download !== undefined) {
				link.download = fileName || getFileName(url);
			}

			if (document.createEvent) {
				const e = document.createEvent('MouseEvents');
				e.initEvent('click', true, true);
				link.dispatchEvent(e);
				return resolve(true);
			}

			if (url.indexOf('?') === -1) {
				url += '?download';
			}

			window.open(url, target);
			return resolve(true);
		} else {
			const canvas = document.createElement('canvas');
			const img = document.createElement('img');
			img.setAttribute('crossOrigin', 'Anonymous');
			img.src = url;
			img.onload = () => {
				canvas.width = img.width;
				canvas.height = img.height;
				const context = canvas.getContext('2d')!;
				context.drawImage(img, 0, 0, img.width, img.height);
				// window.navigator.msSaveBlob(canvas.msToBlob(),'image.jpg');
				// saveAs(imageDataUrl, '附件');
				canvas.toBlob((blob) => {
					const link = document.createElement('a');
					if (!blob) return;
					link.href = window.URL.createObjectURL(blob);
					link.download = getFileName(url);
					link.click();
					URL.revokeObjectURL(link.href);
					resolve(true);
				}, 'image/jpeg');
			};
			img.onerror = (e) => reject(e);
		}
	});
}

/**
 * 通过 Base64 下载文件
 */
export function downloadFileFromBase64({ fileName, source }: DownloadOptions) {
	if (!source || typeof source !== 'string') {
		throw new Error('Invalid Base64 data.');
	}

	const resolvedFileName = fileName || DEFAULT_FILENAME;
	triggerDownload(source, resolvedFileName);
}

/**
 * 通过图片 URL 下载图片文件
 */
export async function downloadFileFromImageUrl({ fileName, source }: DownloadOptions) {
	const base64 = await urlToBase64(source);
	downloadFileFromBase64({ fileName, source: base64 });
}

/**
 * 下载文件，支持 Blob、字符串和其他 BlobPart 类型
 */
export function downloadFileFromBlobPart({
	fileName = DEFAULT_FILENAME,
	source,
}: DownloadOptions<BlobPart>): void {
	// 如果 data 不是 Blob，则转换为 Blob
	const blob =
		source instanceof Blob ? source : new Blob([source], { type: 'application/octet-stream' });

	// 创建对象 URL 并触发下载
	const url = URL.createObjectURL(blob);
	triggerDownload(url, fileName);
}

/**
 * img url to base64
 * @param url
 */
export function urlToBase64(url: string, mineType?: string): Promise<string> {
	return new Promise((resolve, reject) => {
		let canvas = document.createElement('CANVAS') as HTMLCanvasElement | null;
		const ctx = canvas?.getContext('2d');
		const img = new Image();
		img.crossOrigin = '';
		img.addEventListener('load', () => {
			if (!canvas || !ctx) {
				return reject(new Error('Failed to create canvas.'));
			}
			canvas.height = img.height;
			canvas.width = img.width;
			ctx.drawImage(img, 0, 0);
			const dataURL = canvas.toDataURL(mineType || 'image/png');
			canvas = null;
			resolve(dataURL);
		});
		img.src = url;
	});
}

/**
 * 通用下载触发函数
 * @param href - 文件下载的 URL
 * @param fileName - 下载文件的名称，如果未提供则自动识别
 * @param revokeDelay - 清理 URL 的延迟时间 (毫秒)
 */
export function triggerDownload(
	href: string,
	fileName: string | undefined,
	revokeDelay: number = 100,
): void {
	const defaultFileName = 'downloaded_file';
	const finalFileName = fileName || defaultFileName;

	const link = document.createElement('a');
	link.href = href;
	link.download = finalFileName;
	link.style.display = 'none';

	if (link.download === undefined) {
		link.setAttribute('target', '_blank');
	}

	document.body.append(link);
	link.click();
	link.remove();

	// 清理临时 URL 以释放内存
	setTimeout(() => URL.revokeObjectURL(href), revokeDelay);
}

function resolveFileName(url: string, fileName?: string): string {
	return fileName || url.slice(url.lastIndexOf('/') + 1) || DEFAULT_FILENAME;
}

/**
 * download二进制文件
 * @param {*} res 请求返回结果（文件流）
 * @param {string} name 文件名称
 */
export const downloadBlob = (res: any, name?: string) => {
	const blob = new Blob([res], {
		type: 'text/plain;charset=utf-8;application/pdf',
	});
	const downloadElement = document.createElement('a'); //创建一个a 虚拟标签
	const href = window.URL.createObjectURL(blob); // 创建下载的链接
	downloadElement.href = href;
	downloadElement.download = decodeURI(name ?? ''); // 下载后文件名
	document.body.appendChild(downloadElement);
	downloadElement.click(); // 点击下载
	document.body.removeChild(downloadElement); // 下载完成移除元素
	window.URL.revokeObjectURL(href);
};

/**
 * 从 Blob 或二进制数据下载文件
 * @param {Blob | ArrayBuffer} data - 文件数据（Blob 或二进制流）
 * @param {string} [filename] - 可选，自定义文件名
 */
export const downloadFileFromBlob = (data: Blob | ArrayBuffer, filename?: string) => {
	const blob = data instanceof Blob ? data : new Blob([data]);
	const url = URL.createObjectURL(blob);
	const link = document.createElement('a');
	link.href = url;
	link.download = filename || 'download'; // 默认文件名
	document.body.appendChild(link);
	link.click();
	URL.revokeObjectURL(url);
	document.body.removeChild(link);
};

/**
 * 通过 Blob 下载文件
 */
export function downloadFileFromBlobs({
	fileName = DEFAULT_FILENAME,
	source,
}: DownloadOptions<Blob>): void {
	if (!(source instanceof Blob)) {
		throw new TypeError('Invalid Blob data.');
	}

	const url = URL.createObjectURL(source);
	triggerDownload(url, fileName);
}

/**
 * 下载base64图片
 * @param {string} base64string base64文件地址
 * @param {String} name 文件名称
 */
export const downloadBase64Image = (base64String: string, name: string) => {
	const link = document.createElement('a');
	link.href = base64String;
	link.download = name;
	document.body.appendChild(link);
	link.click();
	// 清理/移除创建的链接
	document.body.removeChild(link);
};

/**
 * 获取图片的原始宽高尺寸
 * @param {string} url 图片路径
 * @returns {Promise<{ width: number, height: number }>} 返回一个Promise，解析为包含图片宽度和高度的Object
 */
export const getImageWidthHeight: GetImageWidthHeightFn = (url: string) => {
	return new Promise(function (resolve, reject) {
		const image = new Image();
		image.onload = function () {
			resolve({ width: image.width, height: image.height });
		};
		image.onerror = function () {
			reject(new Error('load image error'));
		};
		image.src = url;
	});
};

/**
 * 截取文件后缀
 * @param {string} url 图片路径
 * @param {boolean} isSpot 是否要'.'
 * @returns {string} 文件后缀
 */
export const fileSuffix = (url: string, isSpot: boolean = true) => {
	return (isSpot ? '.' : '') + url.split('.').at(-1);
};

 

/**
 * 下载图片
 * @param {string} imageSrc 图片路径
 * @param {string} name 名称
 * @returns
 */
export function downImage(imageSrc, name) {
	let image = new Image();
	// 处理canvas 跨域问题
	image.setAttribute('crossOrigin', 'anonymous');
	image.onload = function () {
		let canvas = document.createElement('canvas') as any;
		let context = canvas.getContext('2d') as any;
		canvas.width = image.width;
		canvas.height = image.height;
		context.drawImage(image, 0, 0, image.width, image.height);
		let url = canvas.toDataURL('image/png'); // 图片编码数据
		let a = document.createElement('a') as any;
		let event = new MouseEvent('click'); // 创建一个单击事件
		a.download = name || 'image'; // 设置图片名称
		a.href = url; // 将生成的URL设置为a.href属性
		a.dispatchEvent(event); // 触发a的单击事件
		((a = null), (canvas = null));
	};
	image.src = imageSrc;
}

/**
 * 获取解析图片数据
 * @param {Array} files 文件数组
 * @param {Function} callback 回调
 */
export const getImgInfo = (files: FileList, callback: (imgInfo: ImgInfo | null) => void) => {
	if (!files) {
		callback(null);
	}
	for (let i = 0, l = files.length; i < l; i++) {
		const file = files[i];
		const { type } = file;
		const typeArr = type.split('/');
		if (typeArr[0] !== 'image') return;
		let fileType = typeArr[1].toUpperCase();
		var reader = new FileReader();
		reader.onload = function (e: any) {
			const buffer = e.target.result;
			const imageType = getImageType(buffer);
			if (imageType) {
				fileType = imageType;
			}
			const blob = new Blob([buffer]);
			fileOrBlobToDataURL(blob, function (dataUrl: string | null) {
				if (dataUrl) {
					const image = new Image();
					image.onload = function () {
						const width = image.width;
						const height = image.height;
						const imageData = getCanvasImgData(dataUrl, width, height);
						if (imageData) {
							const imgInfo: ImgInfo = {
								name: file.name,
								fileType,
								size: file.size,
								width,
								height,
								imgUrl: dataUrl,
								imageData,
								blob,
							};
							callback(imgInfo);
						} else {
							callback(null);
						}
					};
					image.onerror = function () {
						callback(null);
					};
					image.src = dataUrl;
				} else {
					callback(null);
				}
			});
		};
		reader.readAsArrayBuffer(file);
	}
};

/**
 * 根据buffer中的文件头信息判断图片类型
 * @param {ArrayBuffer} buffer 文件
 * @returns {string} 文件类型
 */
export const getImageType = (buffer: any) => {
	let fileType = '';
	if (buffer) {
		const view = new DataView(buffer);
		const first4Byte = view.getUint32(0, false);
		const hexValue = Number(first4Byte).toString(16).toUpperCase();
		switch (hexValue) {
			case 'FFD8FFDB':
				fileType = 'JPG';
				break;
			case 'FFD8FFE0':
			case 'FFD8FFE1':
			case 'FFD8FFE2':
			case 'FFD8FFE3':
				fileType = 'JPEG';
				break;
			case '89504E47':
				fileType = 'PNG';
				break;
			case '47494638':
				fileType = 'GIF';
				break;
			case '52494646':
				fileType = 'WEBP';
				break;
			default:
				break;
		}
	}
	return fileType;
};

/**
 * 根据图片URL获取图片类型
 * @param {string} url 图片地址
 * @returns {Promise<string>} 文件类型
 */
export const getImageTypeFromUrl = async (url) => {
	try {
		// 1. 发起请求获取图片
		const response = await fetch(url);

		// 2. 检查请求是否成功
		if (!response.ok) {
			throw new Error('网络请求失败');
		}

		// 3. 将响应体转换为 ArrayBuffer
		const buffer = await response.arrayBuffer();

		// 4. 调用你原有的函数进行判断
		return getImageType(buffer);
	} catch (error) {
		console.error('获取图片类型失败:', error);
		return '';
	}
};

/**
 * File或Blob对象转DataURL
 * @param {Object} obj 文件
 * @param {Function} cb 回调
 */
export const fileOrBlobToDataURL = (obj: File | Blob, cb: (result: string | null) => void) => {
	if (!obj) {
		cb(null);
		return;
	}
	const reader = new FileReader();
	reader.readAsDataURL(obj);
	reader.onload = function (e) {
		if (e.target) {
			cb(e.target.result as string);
		} else {
			cb(null);
		}
	};
};

/**
 * 获取图片二进制数据
 * @param {string} imgUrl 图片路径
 * @param {number} width 图片宽
 * @param {number} height 图片高
 * @returns {ImageData} 图片路径
 */
export const getCanvasImgData = (imgUrl: string, width: number = 0, height: number = 0) => {
	if (imgUrl && width && height) {
		const img = new Image();
		img.src = imgUrl;
		const canvas = document.createElement('canvas') as HTMLCanvasElement;
		const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
		canvas.width = width;
		canvas.height = height;
		ctx.drawImage(img, 0, 0, width, height);
		const imageData = ctx.getImageData(0, 0, width, height) as ImageData;
		return imageData;
	}
	return null;
};

/**
 * 获取base64图片大小，返回kb数字
 * @param {string} base64url 图片路径
 * @returns {Number} 返回kb数字
 */
export const showSize = (base64url) => {
	//把头部去掉
	var str = base64url.replace('data:image/png;base64,', '');
	// 找到等号，把等号也去掉
	var equalIndex = str.indexOf('=');
	if (str.indexOf('=') > 0) {
		str = str.substring(0, equalIndex);
	}
	// 原来的字符流大小，单位为字节
	var strLength = str.length;
	// 计算后得到的文件流大小，单位为字节
	var fileLength = parseInt((strLength - (strLength / 8) * 2).toString());
	// 由字节转换为kb
	var size = '';
	size = (fileLength / 1024).toFixed(2);
	var sizeStr = size + ''; //转成字符串
	var index = sizeStr.indexOf('.'); //获取小数点处的索引
	var dou = sizeStr.substr(index + 1, 2); //获取小数点后两位的值
	if (dou === '00') {
		//判断后两位是否为00，如果是则删除00
		return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2);
	}
	return size;
};

/**
 * 左右翻转
 * @param {ImageData} imageData 图片路径
 * @returns {ImageData} 翻转后的图片路径
 */
export const flipSideToSide = (imageData: ImageData) => {
	if (imageData) {
		const { data, width, height } = imageData;
		const newImgData = new Uint8ClampedArray(data.length);
		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				const startIndex = (y * width + x) * 4;
				newImgData[startIndex] = data[(y * width + width - x - 1) * 4];
				newImgData[startIndex + 1] = data[(y * width + width - x - 1) * 4 + 1];
				newImgData[startIndex + 2] = data[(y * width + width - x - 1) * 4 + 2];
				newImgData[startIndex + 3] = data[(y * width + width - x - 1) * 4 + 3];
			}
		}
		const newImageData = new ImageData(newImgData, width, height);
		return newImageData;
	}
	return null;
};

/**
 * 上下翻转
 * @param {ImageData} imageData 图片路径
 * @returns {ImageData} 翻转后的图片路径
 */
export const flipUpsideDown = (imageData: ImageData) => {
	if (imageData) {
		const { data, width, height } = imageData;
		const newImgData = new Uint8ClampedArray(data.length);
		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				const startIndex = (y * width + x) * 4;
				newImgData[startIndex] = data[((height - y - 1) * width + x) * 4];
				newImgData[startIndex + 1] = data[((height - y - 1) * width + x) * 4 + 1];
				newImgData[startIndex + 2] = data[((height - y - 1) * width + x) * 4 + 2];
				newImgData[startIndex + 3] = data[((height - y - 1) * width + x) * 4 + 3];
			}
		}
		const newImageData = new ImageData(newImgData, width, height);
		return newImageData;
	}
	return null;
};

/**
 * 左旋转
 * @param {ImageData} imageData 图片路径
 * @returns {ImageData} 翻转后的图片路径
 */
export const leftRotate = (imageData: ImageData) => {
	if (imageData) {
		const { data, width, height } = imageData;
		const newImgData = new Uint8ClampedArray(data.length);
		for (let x = 0; x < width; x++) {
			for (let y = 0; y < height; y++) {
				const startIndex = (x * height + y) * 4;
				newImgData[startIndex] = data[(y * width + width - x - 1) * 4];
				newImgData[startIndex + 1] = data[(y * width + width - x - 1) * 4 + 1];
				newImgData[startIndex + 2] = data[(y * width + width - x - 1) * 4 + 2];
				newImgData[startIndex + 3] = data[(y * width + width - x - 1) * 4 + 3];
			}
		}
		const newImageData = new ImageData(newImgData, height, width);
		return newImageData;
	}
	return null;
};

/**
 * 右旋转
 * @param {ImageData} imageData 图片路径
 * @returns {ImageData} 翻转后的图片路径
 */
export const rightRotate = (imageData: ImageData) => {
	if (imageData) {
		const { data, width, height } = imageData;
		const newImgData = new Uint8ClampedArray(data.length);
		for (let x = 0; x < width; x++) {
			for (let y = 0; y < height; y++) {
				const startIndex = (x * height + y) * 4;
				newImgData[startIndex] = data[((height - y - 1) * width + x) * 4];
				newImgData[startIndex + 1] = data[((height - y - 1) * width + x) * 4 + 1];
				newImgData[startIndex + 2] = data[((height - y - 1) * width + x) * 4 + 2];
				newImgData[startIndex + 3] = data[((height - y - 1) * width + x) * 4 + 3];
			}
		}
		const newImageData = new ImageData(newImgData, height, width);
		return newImageData;
	}
	return null;
};

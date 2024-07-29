interface GetImageWidthHeightFn {
	(url: string): Promise<{ width: number; height: number }>;
}
/**
 * 根据文件url获取文件名
 * @param url 文件url
 */
export function getFileName(url: string) {
	const num = url.lastIndexOf('/') + 1;
	let fileName = url.substring(num);
	// 把参数和文件名分割开
	fileName = decodeURI(fileName.split('?')[0]);
	return fileName;
}

/** 文件大小格式化 */
export const formatFileSize = (size: number) => {
	const units = ['B', 'KB', 'MB', 'GB'];
	let index = 0;
	while (size > 1024 && index < units.length) {
		size /= 1024;
		index++;
	}
	return Math.round(size * 100) / 100 + units[index];
};

// 将文件字节大小转成带单位的文件大小
export const sizeTostr = (size: number, decimals = 2) => {
	if (size === 0) return '0 Bytes';
	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	const i = Math.floor(Math.log(size) / Math.log(k));
	return parseFloat((size / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};
/**
 * 根据文件地址下载文件
 * @param {*} sUrl
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

// download二进制文件
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

// 下载base64图片
export const downloadBase64Image = (base64String: string, name: string) => {
	const link = document.createElement('a');
	link.href = base64String;
	link.download = name;
	document.body.appendChild(link);
	link.click();
	// 清理/移除创建的链接
	document.body.removeChild(link);
};

// 获取图片的原始宽高尺寸
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
<template>
	<div class="layout-pd">
		<canvas ref="canvas" width="500" height="500"></canvas>
		<button @click="flipImage">Flip Image</button>
	</div>
</template>
<script setup lang="ts" name="systemUser">
	import { flipSideToSide, flipUpsideDown, leftRotate, rightRotate } from '/@/utils/fileOperation';
	const canvas = ref();
	const imageSrc = '/src/assets/allosaurus.png';
	onMounted(() => {
		const ctx = canvas.value.getContext('2d');
		const image = new Image();
		image.onload = () => {
			ctx.drawImage(image, 0, 0, canvas.value.width, canvas.value.height);
		};
		image.src = imageSrc;
	});
	const flipImage = () => {
		const ctx = canvas.value.getContext('2d');
		const imageData = ctx.getImageData(0, 0, canvas.value.width, canvas.value.height);
		const flippedImageData = flipSideToSide(imageData);
		if (flippedImageData) {
			ctx.putImageData(flippedImageData, 0, 0);
		}
	};
</script> 
 */
// 左右翻转
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
// 上下翻转
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
// 左旋转
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
// 右旋转
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

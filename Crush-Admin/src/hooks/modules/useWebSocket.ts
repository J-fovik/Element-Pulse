/**
 * @name WebSocket
 */

import { ref, onUnmounted } from 'vue';

type WebSocketMessage = string | ArrayBuffer | Blob;
type WebSocketCallbacks = {
	onMessage?: (data: WebSocketMessage) => void;
	onOpen?: () => void;
	onClose?: () => void;
	onError?: (error: Event) => void;
};

// WebSocket
export function useWebSocket(url: string, callbacks?: WebSocketCallbacks) {
	const socket = ref<WebSocket | null>(null);
	const isConnected = ref(false);
	const message = ref<WebSocketMessage | null>(null);
	const reconnectCount = ref(0);
	const MAX_RECONNECT = 5;

	// 初始化 WebSocket
	const initWebSocket = () => {
		socket.value = new WebSocket(url);

		socket.value.onopen = () => {
			isConnected.value = true;
			reconnectCount.value = 0;
			callbacks?.onOpen?.();
		};

		socket.value.onmessage = (event: MessageEvent) => {
			message.value = event.data;
			callbacks?.onMessage?.(event.data);
		};

		socket.value.onclose = () => {
			isConnected.value = false;
			callbacks?.onClose?.();
			tryReconnect();
		};

		socket.value.onerror = (error: Event) => {
			callbacks?.onError?.(error);
		};
	};

	// 重连机制
	const tryReconnect = () => {
		if (reconnectCount.value < MAX_RECONNECT) {
			reconnectCount.value++;
			setTimeout(() => {
				initWebSocket();
			}, 3000 * reconnectCount.value);
		}
	};

	// 发送消息
	const send = (data: unknown) => {
		if (socket.value?.readyState === WebSocket.OPEN) {
			socket.value.send(JSON.stringify(data));
		}
	};

	// 关闭连接
	const close = () => {
		socket.value?.close();
	};

	// 组件卸载时自动关闭
	onUnmounted(() => {
		close();
	});

	// 初始化
	initWebSocket();

	return {
		socket,
		isConnected,
		message,
		send,
		close,
	};
}
// // WebSocket 示例
// const { isConnected, message, send } = useWebSocket("ws://example.com", {
//   onMessage: (data) => {
//     console.log("收到消息:", data);
//   },
// });

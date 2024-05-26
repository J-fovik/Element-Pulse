<template>
	<div class="layout-padding">
		<div ref="container" style="width: 100%; height: 100%"></div>
	</div>
</template>

<script lang="ts" name="mapBaidu">
import { useScriptTag } from '@vueuse/core';

const SCRIPT_URL = 'http://api.map.baidu.com/getscript?v=3.0&ak=WxbQmaOc3bvSGSaKWcyeFSf8fnYCWpKd&services=&t=' + new Date().getTime();
export default defineComponent({
	setup() {
		const container = ref<HTMLDivElement | null>(null);
		onMounted(async () => {
			const { load } = useScriptTag(SCRIPT_URL, () => {}, {
				manual: true,
			});
			await load();
			const bMap = (window as any).BMap;
			const map = new bMap.Map(container.value);
			const point = new bMap.Point(116.404, 39.915);
			map.centerAndZoom(point, 7);
			map.enableScrollWheelZoom();
			map.setMapStyleV2({ styleId: 'ea4652613f3629247d47666706ce7e89' });
		});
		return { container };
	},
});
</script>

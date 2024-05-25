<template>
	<div class="layout-padding" style="background-color: #ffffff">
		<div ref="container" style="height: 100%; width: 100%"></div>
	</div>
</template>

<script lang="ts" name="mapGaode">
import { useCreateScript } from '/@/hooks';
const SCRIPT_URL = 'https://webapi.amap.com/maps?v=1.4.15&key=9f2d3fcc4b12a7c915fded4b55902e21';
export default defineComponent({
	setup() {
		const container = ref<HTMLDivElement | null>(null);
		const { createScriptPromise } = useCreateScript(SCRIPT_URL);
		const initMap = () => {
			createScriptPromise.then(() => {
				const aMap = (window as any).AMap;
				new aMap.Map(container.value, {
					zoom: 22,
					center: [116.397428, 39.90923],
					viewMode: '3D',
					pitch: 75,
				});
			});
		};
		onMounted(initMap);
		return { container };
	},
});
</script>

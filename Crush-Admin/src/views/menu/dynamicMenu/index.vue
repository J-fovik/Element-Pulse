<template>
	<Container :title="reportTitle"> </Container>
</template>

<script setup lang="ts" name="dynamicMenu">
const route = useRoute();
const reportTitle = ref(route.query.title) as unknown as string;
</script>
<style scoped lang="scss"></style>

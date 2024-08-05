<template>
	<div>
		<el-alert
			class="mb10"
			title="使用方式：v-waves=' |light|red|orange|purple|green|teal'"
			type="success"
			:closable="false"
		/>
		<el-row :gutter="20">
			<el-col :xs="24" :sm="24" :lg="12" :xl="12">
				<!-- 默认波浪 -->
				<el-divider content-position="center"> v-waves </el-divider>
				<div class="flx-center mb4">
					<el-button v-waves> Default </el-button>
					<el-button type="primary" v-waves> primary </el-button>
					<el-button type="success" v-waves>success </el-button>
					<el-button type="info" v-waves>info </el-button>
					<el-button type="warning" v-waves>warning</el-button>
					<el-button type="danger" v-waves> danger </el-button>
				</div>
			</el-col>
			<el-col :xs="24" :sm="24" :lg="12" :xl="12"
				><!-- light 波浪 -->
				<el-divider content-position="center"> v-waves="'light'" </el-divider>
				<div class="flx-center mb4">
					<el-button v-waves="'light'"> Default </el-button>
					<el-button type="primary" v-waves="'light'"> primary </el-button>
					<el-button type="success" v-waves="'light'">success </el-button>
					<el-button type="info" v-waves="'light'">info </el-button>
					<el-button type="warning" v-waves="'light'">warning</el-button>
					<el-button type="danger" v-waves="'light'"> danger </el-button>
				</div>
			</el-col>
			<el-col :xs="24" :sm="24" :lg="12" :xl="12">
				<!-- red 波浪 -->
				<el-divider content-position="center"> v-waves="'red'" </el-divider>
				<div class="flx-center mb4">
					<el-button v-waves="'red'"> Default </el-button>
					<el-button type="primary" v-waves="'red'"> primary </el-button>
					<el-button type="success" v-waves="'red'">success </el-button>
					<el-button type="info" v-waves="'red'">info </el-button>
					<el-button type="warning" v-waves="'red'">warning</el-button>
					<el-button type="danger" v-waves="'red'"> danger </el-button>
				</div>
			</el-col>
			<el-col :xs="24" :sm="24" :lg="12" :xl="12">
				<!-- orange 波浪 -->
				<el-divider content-position="center"> v-waves="'orange'" </el-divider>
				<div class="flx-center mb4">
					<el-button v-waves="'orange'"> Default </el-button>
					<el-button type="primary" v-waves="'orange'"> primary </el-button>
					<el-button type="success" v-waves="'orange'">success </el-button>
					<el-button type="info" v-waves="'orange'">info </el-button>
					<el-button type="warning" v-waves="'orange'">warning</el-button>
					<el-button type="danger" v-waves="'orange'"> danger </el-button>
				</div>
			</el-col>
			<el-col :xs="24" :sm="24" :lg="12" :xl="12">
				<!-- purple 波浪 -->
				<el-divider content-position="center"> v-waves="'purple'" </el-divider>
				<div class="flx-center mb4">
					<el-button v-waves="'purple'"> Default </el-button>
					<el-button type="primary" v-waves="'purple'"> primary </el-button>
					<el-button type="success" v-waves="'purple'">success </el-button>
					<el-button type="info" v-waves="'purple'">info </el-button>
					<el-button type="warning" v-waves="'purple'">warning</el-button>
					<el-button type="danger" v-waves="'purple'"> danger </el-button>
				</div>
			</el-col>
			<el-col :xs="24" :sm="24" :lg="12" :xl="12">
				<!-- green 波浪 -->
				<el-divider content-position="center"> v-waves="'green'" </el-divider>
				<div class="flx-center mb4">
					<el-button v-waves="'green'"> Default </el-button>
					<el-button type="primary" v-waves="'green'"> primary </el-button>
					<el-button type="success" v-waves="'green'">success </el-button>
					<el-button type="info" v-waves="'green'">info </el-button>
					<el-button type="warning" v-waves="'green'">warning</el-button>
					<el-button type="danger" v-waves="'green'"> danger </el-button>
				</div>
			</el-col>
			<el-col :xs="24" :sm="24" :lg="12" :xl="12">
				<!-- teal 波浪 -->
				<el-divider content-position="center"> v-waves="'teal'" </el-divider>
				<div class="flx-center mb4">
					<el-button v-waves="'teal'"> Default </el-button>
					<el-button type="primary" v-waves="'teal'"> primary </el-button>
					<el-button type="success" v-waves="'teal'">success </el-button>
					<el-button type="info" v-waves="'teal'">info </el-button>
					<el-button type="warning" v-waves="'teal'">warning</el-button>
					<el-button type="danger" v-waves="'teal'"> danger </el-button>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script setup lang="ts" name="Waves">
// 此处需有内容（注释也得），否则缓存将失败
</script>

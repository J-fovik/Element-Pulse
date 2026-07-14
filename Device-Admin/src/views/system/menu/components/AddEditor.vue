<template>
	<el-dialog
		:model-value="true"
		:title="form.dialogTitle"
		width="60vw"
		draggable
		:close-on-click-modal="true"
		@close="emits('close')"
	>
		<el-form ref="formRef" :model="form" label-align="left" :rules="rules" label-width="auto">
			<el-row :gutter="24">
				<el-col :span="24">
					<el-form-item label="上级菜单" prop="parentId">
						<el-tree-select
							v-model="form.parentId"
							placeholder="请选择上级菜单"
							:data="menuOptions"
							filterable
							check-strictly
							:render-after-expand="false"
						/>
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="菜单类型" prop="menuType">
						<el-radio-group v-model="form.menuType">
							<el-radio value="M">目录</el-radio>
							<el-radio value="C">菜单</el-radio>
							<el-radio value="F">按钮</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :span="24" v-if="form.menuType !== 'F'">
					<el-form-item label="菜单图标" prop="icon">
						<SelectIcon v-model="form.icon" />
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="菜单名称" prop="menuName">
						<el-input v-model="form.menuName" placeholder="请输入菜单名称" />
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="显示排序" prop="orderNum">
						<el-input-number
							v-model.trim="form.orderNum"
							:min="0"
							:step="1"
							class="flex-1"
							controls-position="right"
							placeholder="请输入显示排序"
						/>
					</el-form-item>
				</el-col>
				<el-col :span="12" v-if="form.menuType !== 'F'">
					<el-form-item>
						<template #label>
							<span>
								<el-tooltip
									content="选择是外链则路由地址需要以`http(s)://`开头"
									placement="top"
								>
									<el-icon><InfoFilled /></el-icon>
								</el-tooltip>
								是否外链
							</span>
						</template>
						<el-radio-group v-model="form.isFrame">
							<el-radio :label="0">是</el-radio>
							<el-radio :label="1">否</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :span="12" v-if="form.menuType !== 'F'" prop="path">
					<el-form-item>
						<template #label>
							<span>
								<el-tooltip
									content="访问的路由地址，如：`user`，页面name需与之对应"
									placement="top"
								>
									<el-icon><InfoFilled /></el-icon>
								</el-tooltip>
								路由地址
							</span>
						</template>
						<el-input v-model="form.path" placeholder="请输入路由地址" />
					</el-form-item>
				</el-col>
				<el-col :span="24" v-if="form.menuType === 'C'">
					<el-form-item prop="component">
						<template #label>
							<span>
								<el-tooltip
									content="访问的组件路径，如：`system/user/index`，默认在`views`目录下"
									placement="top"
								>
									<el-icon><InfoFilled /></el-icon>
								</el-tooltip>
								组件路径
							</span>
						</template>
						<el-input v-model="form.component" placeholder="请输入组件路径" />
					</el-form-item>
				</el-col>
				<el-col :span="12" v-if="form.menuType === 'C'">
					<el-form-item>
						<el-input
							v-model="form.query"
							placeholder="请输入路由参数"
							maxlength="2000"
						/>
						<template #label>
							<span>
								<el-tooltip
									content='访问路由的默认传递参数，如：`{"id": 1, "name": "ry"}`'
									placement="top"
								>
									<el-icon><InfoFilled /></el-icon>
								</el-tooltip>
								路由参数
							</span>
						</template>
					</el-form-item>
				</el-col>
				<el-col :span="12" v-if="form.menuType !== 'M'">
					<el-form-item>
						<template #label>
							<span>
								<el-tooltip
									content="控制器中定义的权限字符，如：@PreAuthorize(`@ss.hasPermi('system:user:list')`)"
									placement="top"
								>
									<el-icon><InfoFilled /></el-icon>
								</el-tooltip>
								权限字符
							</span>
						</template>
						<el-input
							v-model="form.perms"
							placeholder="请输入权限标识"
							maxlength="100"
						/>
					</el-form-item>
				</el-col>
				<el-col :span="12" v-if="form.menuType === 'C'">
					<el-form-item>
						<template #label>
							<span>
								<el-tooltip
									content="选择是则会被`keep-alive`缓存，需要匹配组件的`name`和地址保持一致"
									placement="top"
								>
									<el-icon><InfoFilled /></el-icon>
								</el-tooltip>
								是否缓存
							</span>
						</template>
						<el-radio-group v-model="form.isCache">
							<el-radio :label="0">缓存</el-radio>
							<el-radio :label="1">不缓存</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :span="12" v-if="form.menuType !== 'F'">
					<el-form-item>
						<template #label>
							<span>
								<el-tooltip
									content="选择隐藏则路由将不会出现在侧边栏，但仍然可以访问"
									placement="top"
								>
									<el-icon><InfoFilled /></el-icon>
								</el-tooltip>
								显示状态
							</span>
						</template>
						<el-radio-group v-model="form.visible">
							<el-radio value="0">显示</el-radio>
							<el-radio value="1">隐藏</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :span="12" v-if="form.menuType !== 'F'">
					<el-form-item>
						<template #label>
							<span>
								<el-tooltip
									content="选择停用则路由将不会出现在侧边栏，也不能被访问"
									placement="top"
								>
									<el-icon><InfoFilled /></el-icon>
								</el-tooltip>
								菜单状态
							</span>
						</template>
						<el-radio-group v-model="form.status">
							<el-radio value="0">正常</el-radio>
							<el-radio value="1">停用</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<template #footer>
			<div class="dialog-footer">
				<el-button @click="emits('close')">取消</el-button>
				<el-button
					v-loading.fullscreen.lock="activeKey == 'okLoading'"
					type="primary"
					element-loading-text="请稍后..."
					@click="validateData(formRef)"
				>
					确认
				</el-button>
			</div>
		</template>
	</el-dialog>
</template>

<script lang="ts" setup name="AddEditor">
import { useForm, useBasicsState, curryingRequestUrl, URL, useAsyncData } from '@/hooks';
import { useUserStore } from '@/stores';
import { convertMenuTree } from '@/utils';
const userStore = useUserStore();
/* 接受父组件参数 */
const props = defineProps({
	data: {
		type: Object,
		default: {},
	},
});
/* 父组件方法 */
const emits = defineEmits(['close', 'success']);
/* 弹窗状态控制 */
const [activeKey, setActiveKey] = useBasicsState<string | null>(null);
/* 表单 */
const { form, formRef } = useForm<any>(() => ({
	icon: '',
	parentId: '0',
	menuType: 'M',
	isCache: 0,
	status: '0',
	isFrame: 1,
	visible: '0',
	...props.data,
}));
// 获取菜单数据
const { data: menuOptions, initData: getMenuOptions } = useAsyncData(async () => {
	const { res, err } = await curryingRequestUrl({
		url: URL.SYSTEM.QUERY_MENU,
		params: {},
		method: 'get',
	});
	if (err) return;
	const menu = [
		{
			value: '0',
			label: '主类目',
			children: res?.data?.map((item) => convertMenuTree(item)),
		},
	];
	return menu; // 处理数据
});
/* 表单验证 */
const rules = {
	parentId: [{ required: true, message: '请选择上级菜单', trigger: 'blur' }],
	menuType: [{ required: true, message: '请选择菜单类型', trigger: 'blur' }],
	icon: [{ required: true, message: '请选择图标', trigger: 'blur' }],
	orderNum: [{ required: true, message: '请输入显示排序', trigger: 'blur' }],
	menuName: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
	path: [{ required: true, message: '请输入路由地址', trigger: 'blur' }],
	component: [{ required: true, message: '请输入组件路径', trigger: 'blur' }],
};

/* 验证数据 */
const validateData = (formEl: any) => {
	if (!formEl) return;
	formEl.validate((valid) => {
		if (valid) {
			/* 可加其他特殊校验 */
			if (form.value.dialogTitle == '编辑菜单') submitData('editApi');
			else submitData('addApi');
		} else return false;
	});
};
/* 提交数据 */
const submitData = async (type: 'addApi' | 'editApi') => {
	const { res, err } = await curryingRequestUrl(
		{
			url: URL.SYSTEM.HANDLE_MENU,
			data: form.value,
			method: type == 'addApi' ? 'post' : 'put',
		},
		{
			before: () => setActiveKey('okLoading'), // 设置loading
			after: () => setActiveKey(null), // 关闭loading
			successMsg: '操作成功',
		},
	);
	// 处理错误
	if (err) return;
	// 触发成功
	emits('success');
	// 触发关闭
	emits('close');
};
</script>
<style scoped lang="scss">
.addTable {
	.el-form-item {
		margin-bottom: 0px !important;
	}
}
</style>

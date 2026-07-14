<template>
	<el-dialog
		:model-value="true"
		:title="form.roleId ? (form.isReadOnly ? '角色详情' : '编辑角色') : '新增角色'"
		width="60vw"
		draggable
		:close-on-click-modal="true"
		@close="emits('close')"
	>
		<el-form
			ref="formRef"
			:model="form"
			label-align="left"
			:rules="rules"
			label-width="auto"
			:disabled="!!form.isReadOnly"
		>
			<el-row :gutter="24">
				<el-col :span="12">
					<el-form-item label="角色名称" prop="roleName">
						<el-input v-model.trim="form.roleName" placeholder="请输入角色名称" />
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item prop="roleKey">
						<template #label>
							<span>
								<el-tooltip
									content="控制器中定义的权限字符，如：@PreAuthorize(`@ss.hasRole('admin')`)"
									placement="top"
								>
									<el-icon><InfoFilled /></el-icon>
								</el-tooltip>
								权限字符
							</span>
						</template>
						<el-input v-model.trim="form.roleKey" placeholder="请输入权限字符" />
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="角色顺序" prop="roleSort">
						<el-input-number
							v-model="form.roleSort"
							controls-position="right"
							:min="0"
							class="w-full"
						/>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="状态" prop="status">
						<el-radio-group v-model="form.status">
							<el-radio value="0">正常</el-radio>
							<el-radio value="1">停用</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="数据权限">
						<el-checkbox v-model="isExpandAll" @change="handleExpandChange"
							>展开/折叠</el-checkbox
						>
						<el-checkbox v-model="isCheckAll" @change="handleCheckAllChange"
							>全选/全不选</el-checkbox
						>
						<el-checkbox v-model="checkStrictly">父子联动</el-checkbox>
						<div
							style="
								height: 300px;
								width: 100%;
								overflow-y: auto;
								border-radius: 12px;
								border: 1px solid #eee;
							"
						>
							<el-tree
								ref="treeRef"
								:data="powerList"
								show-checkbox
								node-key="id"
								:expand-on-click-node="true"
								:check-on-click-node="true"
								:check-strictly="!checkStrictly"
								:default-expanded-keys="manySelected"
								:default-checked-keys="manySelected"
								:default-expand-all="defaultExpandAll"
								:highlight-current="true"
								:props="{
									children: 'children',
									label: 'label',
								}"
								@check="handleTreeCheck"
							/>
						</div>
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="备注" prop="remark">
						<el-input
							v-model="form.remark"
							type="textarea"
							:rows="4"
							placeholder="请输入内容"
						/>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<template #footer>
			<div class="dialog-footer">
				<el-button @click="emits('close')">取消</el-button>
				<el-button
					v-if="!form.isReadOnly"
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
import { useForm, useBasicsState, useAsyncData, curryingRequestUrl, URL } from '@/hooks';
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
	status: '0',
	roleSort: 0,
	...props.data,
}));
const treeRef = ref();
// 勾选的权限
const manySelected = ref([] as any);
const submitSelected = ref([] as any); // 提交的权限数组
const checkStrictly = ref(true); //在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false
const defaultExpandAll = ref(false); // 是否默认展开所有节点
const isExpandAll = ref(false); //展开/折叠控制
const powerList = ref([] as any); // 权限列表
const isCheckAll = ref(false); // 全选/全不选控制
/**
 * 处理树节点展开/折叠状态变化
 *
 * @param val - true表示展开，false表示折叠
 */
const handleExpandChange = (val: any) => {
	const expanded = !!val;
	const tree = treeRef.value;
	if (!tree) return;
	// 递归遍历树节点，设置 expanded 属性
	const traverse = (nodes: any[]) => {
		nodes.forEach((node) => {
			node.expanded = expanded;
			if (node.childNodes && node.childNodes.length > 0) {
				traverse(node.childNodes);
			}
		});
	};
	traverse(tree.store.root.childNodes);
};

// 全选/全不选控制
const handleCheckAllChange = (val: any) => {
	const checked = !!val;
	if (checked) {
		treeRef.value?.setCheckedNodes(powerList.value); // 全选
	} else {
		treeRef.value?.setCheckedKeys([]); // 全不选
	}
	// 手动触发一次 check 事件，更新要提交的数据
	const checkedKeys = treeRef.value?.getCheckedKeys() || [];
	const halfCheckedKeys = treeRef.value?.getHalfCheckedKeys() || [];
	submitSelected.value = [...checkedKeys, ...halfCheckedKeys];
};

/* 表单验证 */
const rules = {
	roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
	roleKey: [{ required: true, message: '请输入角色编码', trigger: 'blur' }],
	roleSort: [{ required: true, message: '请输入角色顺序', trigger: 'blur' }],
};
onMounted(async () => {
	const powerListData = await getRolePowerList();
	powerList.value = powerListData;
});
/* 验证数据 */
const validateData = (formEl: any) => {
	if (!formEl) return;
	formEl.validate((valid) => {
		if (valid) {
			/* 可加其他特殊校验 */
			/* 有id则表示修改，没有则表示新增 */
			if (props.data.roleId) submitData('editApi');
			else submitData('addApi');
		} else return false;
	});
};
// 获取角色的菜单ID集合
const getRolePowerList = async () => {
	const { res, err } = await curryingRequestUrl({
		url: URL.SYSTEM.QUERY_ROLE_MENU_TREE + '/' + props.data.roleId,
		method: 'get',
	});
	if (err) return;
	return res?.data;
};

/* 提交数据 */
const submitData = async (type: 'addApi' | 'editApi') => {
	const { res, err } = await curryingRequestUrl(
		{
			url: URL.SYSTEM.HANDLE_ROLE,
			data: { ...form.value, menuIds: submitSelected.value },
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
onMounted(async () => {
	checkStrictly.value = false;
	const list = await getRolePowerList();
	manySelected.value = list.checkedKeys;
	submitSelected.value = list.checkedKeys;
	powerList.value = list.menus;
	setTimeout(() => {
		checkStrictly.value = true;
	}, 150);
});
const handleTreeCheck = (...e) => {
	const { checkedKeys, halfCheckedKeys } = e[1];
	submitSelected.value = [...checkedKeys, ...halfCheckedKeys];
};
</script>
<style scoped lang="scss">
.addTable {
	.el-form-item {
		margin-bottom: 0px !important;
	}
}
</style>

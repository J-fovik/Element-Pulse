<template>
	<el-dialog
		:model-value="true"
		:title="form.userId ? (form.isReadOnly ? '员工详情' : '编辑员工') : '新增员工'"
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
				<el-col :span="12" v-if="!form.userId">
					<el-form-item label="员工编号" prop="userName">
						<el-input v-model.trim="form.userName" placeholder="请输入员工编号" />
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="员工姓名" prop="nickName">
						<el-input v-model.trim="form.nickName" placeholder="请输入员工姓名" />
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="归属部门" prop="deptId">
						<el-tree-select
							v-model="form.deptId"
							placeholder="请选择归属部门"
							:data="deptOptions"
							filterable
							check-strictly
							:render-after-expand="false"
						/>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="手机号码" prop="phonenumber">
						<el-input
							v-model="form.phonenumber"
							placeholder="请输入手机号码"
							maxlength="11"
						/>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="邮箱" prop="email">
						<el-input v-model="form.email" placeholder="请输入邮箱" maxlength="50" />
					</el-form-item>
				</el-col>
				<el-col :span="12" v-if="!form.userId">
					<el-form-item label="员工密码" prop="password">
						<el-input
							v-model="form.password"
							placeholder="请输入员工密码"
							maxlength="20"
						/>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="用户性别" prop="sex">
						<el-select v-model="form.sex" filterable clearable>
							<el-option
								v-for="dict in dictionaryStore.getDictionaryInfo('sys_user_sex')"
								:key="dict.value"
								:label="dict.label"
								:value="dict.value"
							/>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="员工状态" prop="status">
						<el-radio-group v-model="form.status">
							<el-radio value="0">正常</el-radio>
							<el-radio value="1">停用</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="岗位" prop="postIds">
						<el-select v-model="form.postIds" multiple filterable clearable>
							<el-option
								v-for="dict in selectList.posts"
								:key="dict.postId"
								:label="dict.postName"
								:value="dict.postId"
							/>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="角色" prop="roleIds">
						<el-select v-model="form.roleIds" multiple filterable clearable>
							<el-option
								v-for="dict in selectList.roles"
								:key="dict.roleId"
								:label="dict.roleName"
								:value="dict.roleId"
							/>
						</el-select>
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
import { convertDeptTree } from '@/utils';
import { useDictionaryStore } from '@/stores';

/* 接受父组件参数 */
const props = defineProps({
	data: {
		type: Object,
		default: {},
	},
});
const dictionaryStore = useDictionaryStore();
/* 父组件方法 */
const emits = defineEmits(['close', 'success']);

/* 弹窗状态控制 */
const [activeKey, setActiveKey] = useBasicsState<string | null>(null);
/* 表单 */
const { form, formRef } = useForm<any>(() => ({
	status: '0',
	...props.data,
}));
const selectList = ref({} as any);
/* 表单验证 */
const rules = {
	nickName: [{ required: true, message: '请输入员工名称', trigger: 'blur' }],
	userName: [
		{ required: true, message: '请输入员工编号', trigger: 'blur' },
		{
			min: 2,
			max: 20,
			message: '员工编号长度必须介于 2 和 20 之间',
			trigger: 'blur',
		},
	],
	password: [
		{ required: true, message: '请输入员工密码', trigger: 'blur' },
		{
			min: 5,
			max: 20,
			message: '员工密码长度必须介于 5 和 20 之间',
			trigger: 'blur',
		},
	],
	deptId: [{ required: true, message: '请选择部门', trigger: 'change' }],
	email: [
		{
			type: 'email',
			message: '请输入正确的邮箱地址',
			trigger: ['blur', 'change'],
		},
	],
	phonenumber: [
		{
			pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
			message: '请输入正确的手机号码',
			trigger: 'blur',
		},
	],
};
// 获取部门数据
const { data: deptOptions, initData: getDeptOptions } = useAsyncData(async () => {
	const { res, err } = await curryingRequestUrl({
		url: URL.SYSTEM.QUERY_DEPT,
		params: {},
		method: 'get',
	});
	if (err) return;
	return res?.data?.map((item) => convertDeptTree(item)); // 处理数据
});
// 获取角色岗位
const getSelectList = async () => {
	const { res, err } = await curryingRequestUrl({
		url: URL.SYSTEM.HANDLE_USER + '/' + 0,
		method: 'get',
	});
	if (err) return;
	selectList.value.posts = res?.data.posts;
	selectList.value.roles = res?.data.roles;
};
getSelectList();
// 获取详情
const getUserDetail = async (userId: number) => {
	const { res, err } = await curryingRequestUrl({
		url: URL.SYSTEM.HANDLE_USER + '/' + userId,
		method: 'get',
	});
	if (err) return;
	form.value = {
		...res?.data.user,
		roleIds: res?.data.roleIds,
		postIds: res?.data.postIds,
	};
};
if (props.data.userId) getUserDetail(props.data.userId);
/* 验证数据 */
const validateData = (formEl: any) => {
	if (!formEl) return;
	formEl.validate((valid) => {
		if (valid) {
			/* 可加其他特殊校验 */
			/* 有id则表示修改，没有则表示新增 */
			if (props.data.userId) submitData('editApi');
			else submitData('addApi');
		} else return false;
	});
};
/* 提交数据 */
const submitData = async (type: 'addApi' | 'editApi') => {
	const { res, err } = await curryingRequestUrl(
		{
			url: URL.SYSTEM.HANDLE_USER,
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

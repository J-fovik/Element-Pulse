export default {
	// 用户
	USER: {
		LOGIN: '/auth/login', // 用户登录
		GET_USER_INFO: '/system/user/getInfo', // 获取用户信息
		EDIT_PASS: '/system/user/profile/updatePwd', // 修改密码
	},
	// 公共
	PUBLIC: {
		GET_ROUTES_LIST: '/system/menu/getRouters', // 路由列表
		QUERY_DICT_DATA_LIST: '/system/dict/data/list', // 查询字典(hooks)
	},
	// 系统
	SYSTEM: {
		// 菜单管理
		QUERY_MENU: '/system/menu/list', // 查询菜单
		HANDLE_MENU: '/system/menu', // 新增修改删除菜单
		// 岗位管理
		QUERY_POST: '/system/post/list', // 查询岗位
		HANDLE_POST: '/system/post', // 新增修改删除岗位
		// 部门管理
		QUERY_DEPT: '/system/dept/list', // 查询部门
		HANDLE_DEPT: '/system/dept', // 新增修改删除部门
		DEPT_LIST_EXCLUDE: '/system/dept/list/exclude', // 查询部门列表（排除节点）
		// 操作日志
		QUERY_OPER: '/system/operlog/listByDept', // 查询操作日志
		HANDLE_OPER: '/system/operlog', // 删除操作日志
		CLEAR_OPER: '/system/operlog/clean', // 清空操作日志
		// 登录日志
		QUERY_LOGIN: '/system/logininfor/listByDept', // 查询登录日志
		HANDLE_LOGIN: '/system/logininfor', // 删除登录日志
		CLEAR_LOGIN: '/system/logininfor/clean', // 清空登录日志
		// 字典管理
		QUERY_DICT: '/system/dict/type/list', // 查询字典管理
		HANDLE_DICT: '/system/dict/type', // 新增修改删除详情字典
		REFRESH_CACHE: '/system/dict/type/refreshCache', // 刷新缓存(未使用)
		HANDLE_DICT_DATA: '/system/dict/data', // 新增修改删除详情字典数据
		HANDLE_DICT_DATA_TYPE: '/system/dict/data/type', // 根据type查询字典数据(未使用)
		// 角色管理
		QUERY_ROLE: '/system/role/list', // 查看角色
		HANDLE_ROLE: '/system/role', // 新增修改删除详情角色
		QUERY_ROLE_MENU_TREE: '/system/menu/roleMenuTreeselect', // 根据角色ID查询菜单下拉树结构
		ROLE_DATA_SCOPE: '/system/role/dataScope', // 角色数据权限
		ALLOCATED_LIST: '/system/role/authUser/allocatedList', // 分配用户列表
		UN_ALLOCATED_LIST: '/system/role/authUser/unallocatedList', // 查询角色未授权用户列表
		AUTH_USER_CANCEL: '/system/role/authUser/cancel', // 取消用户授权
		AUTH_USER_CANCEL_ALL: '/system/role/authUser/cancelAll', // 批量取消用户授权
		AUTH_USER_SELECT_ALL: '/system/role/authUser/selectAll', // 提交角授权用户
		CHANGE_ROLE_STATUS: '/system/role/changeStatus', // 修改角色状态
		// 用户管理
		QUERY_USER: '/system/user/list', // 查询用户
		HANDLE_USER: '/system/user', // 新增修改删除详情用户
		CHANGE_USER_STATUS: '/system/user/changeStatus', // 修改用户状态
		AUTH_ROLE: '/system/user/authRole', // 角色授权
		RESET_PASS: '/system/user/resetPwd', // 重置密码
	},
	// 系统维护
	BASIC: {
		// 基础参数配置
		QUERY_BASIC: '/needConfigType/listPage', // 查询基础配置
		HANDLE_BASIC: '/needConfigType', // 新增修改删除详情角色
		DELETE_BASIC: '/needConfigType/ids', // 批量删除基础配置
		// 基础参数配置详情
		QUERY_BASIC_DETAIL: '/needConfigData/listPage', // 查询基础参数配置详情
		DELETE_BASIC_DETAIL: '/needConfigData/ids', // 批量删除基础参数数据
		HANDLE_BASIC_DETAIL: '/needConfigData', // 新增修改基础参数数据
		// 作业任务调度
		QUERY_JOB: '/job/list', // 查询定时任务调度列表
		HANDLE_JOB: '/job', // 新增修改删除详情任务调度
		CHANGE_JOB_STATUS: '/job/changeStatus', // 修改任务调度状态
		JOB_RUN: '/job/run', // 定时任务立即执行一次
		// 调度日志
		QUERY_JOB_LOG: '/job/log/list', // 查询调度日志列表
		DEL_JOB_LOG: '/job/log', // 删除调度日志
		CLEAN_JOB_LOG: '/job/log/clean', // 清空调度日志
	},
	// 基础数据管理
	BASIC_DATA: {
		// 设备集成信息-左侧设备信息树
		QUERY_EQUIPMENT: '/Equipment/GetEquipmentTreeList', // 查询设备信息树
		HANDLE_EQUIPMENT: '/Equipment/AddEquipment', // 新增修改设备信息树
		DELETE_EQUIPMENT: '/Equipment/DelEquipmentByJD', // 删除设备信息树
		QUERY_EQUIPMENT_DETAIL: '/Equipment/GetEquipmentDetailByID', // 查询设备详情
		EQUIPMENT_CATEGORY: '/EquipmentCategory/list', // 设备类别下拉列表
	},
	// 点检管理
	INSPECTION: {
		// 点检管理-左侧点检树
		QUERY_INSPECTION_TREE: '/inspection/tree/list', // 查询点检信息树
		INSPECTION_TREE: '/inspection/tree', // 新增/post、修改/put、删除/delete点检信息树
		QUERY_INSPECTION_DETAIL: '/inspection/GetEquipmentDetailByID', // 查询点检详情
		QUERY_INSPECTION_STANDARD: '/inspection/standard/list', // 查询点检项目列表
		QUERY_INSPECTION_STANDARD_NEW: 'inspection/standard/listnew', // 查询点检项目列表（新版）
		INSPECTION_STANDARD: '/inspection/standard', // 新增/post、修改/put、删除/delete点检项目
		INSPECTION_STANDARD_EXPORT: '/inspection/standard/export', // 导出点检项目列表
		QUERY_REPORT: '/InspectionReport/QueryInspectionMonthReport', // 查询月点检报告
	},
	// 零库存
	ZERO_INVENTORY: {
		QUERY_STORE_LIST: '/Store/QueryStorePageList', // 查询库存列表
		QUERY_IN_OR_OUT_LIST: '/Store/QueryInOrOutStorePageList', // 查询入库或出库列表
		QUERY_STORE_WARN_LIST: '/Store/QueryStoreWarnPageList', // 查询库存预警列表
		QUERY_STORE_INFO: '/Store/QueryStoreInfo', // 查询库存信息
		QUERY_STORE_SELECT_ALL: '/Store/QueryStoreSelectAll', // 查询所有库存下拉框
		QUERY_SUPPLIER_SELECT_ALL: '/Supplier/QuerySupplierSelectAll', // 查询所有供应商下拉框
	},
};

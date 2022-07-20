module.exports = {
	extends: ["@commitlint/config-conventional"],
	rules: {
		"type-enum": [
			2,
			"always",
			[
				"wip", // 开发中
				"feat", // 新功能
				"fix", // bug 修复
				"docs", //文档变更
				"style", //样式变更
				"refactor", //重构
				"perf", // 性能优化
				"test", //新增或修订单元测试
				"revert", // 回滚操作
				"chore" //构建过程或辅助工具变更
			]
		]
	}
};

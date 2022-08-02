<template>
	<div class="update-window">
		<div v-if="!updateError" class="update">
			<div class="update-title">{{ updateMessage }}</div>
			<el-progress :stroke-width="8" :percentage="percentage">
				<p>正在更新，已完成{{ percentage }}%</p>
			</el-progress>
		</div>
		<div v-else class="update-error">
			<div class="update-title">更新失败</div>
			<p class="error-tips">点击重试，或前往官网下载最新安装包</p>
			<div class="button-group">
				<el-button type="primary" @click="retry">重试</el-button>
				<el-button type="primary">前往官网</el-button>
				<el-button @click="cancel">取消</el-button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";

import { ipcRendererOn } from "@/utils/ipcRenderer";

const updateError = ref(false);
const updateMessage = ref("版本更新中...");
const percentage = ref(0);
onMounted(() => {
	ipcRendererOn("download-progress", (event, ...args) => {
		percentage.value = args[0].percent;
	});
	ipcRendererOn("update-downloaded", (event, ...args) => {
		console.log(args);
		updateMessage.value = args[0].message;
		percentage.value = 100;
	});
	ipcRendererOn("update-finish", (event, ...args) => {
		updateMessage.value = args[0].message;
	});
	ipcRendererOn("error", (event, ...args) => {
		console.log(args);
		updateError.value = true;
	});
	window.addEventListener("offline", () => {
		updateError.value = true;
	});
});

const cancel = () => {
	ipcRenderer.send("quit");
};
const retry = () => {
	if (!navigator.onLine) {
		ElMessage({
			type: "warning",
			message: "网络未连接，请检查网络后重试"
		});
	} else {
		updateError.value = false;
		ipcRenderer.send("checkUpdateNow");
	}
};
</script>

<style scoped lang="less">
.update-window {
	box-sizing: border-box;
	width: 420px;
	height: 170px;
	// text-align: center;
	.update-title {
		height: 44px;
		padding-left: 20px;
		color: @textColor;
		font-size: @lFont;
		line-height: 44px;
		border-bottom: 1px solid #ccc;
	}
	.update {
		width: 100%;
		.el-progress {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			margin: 50px 20px 0;
			:deep(.el-progress-bar) {
				width: 380px;
			}
			:deep(.el-progress__text) {
				margin-left: 0;
				p {
					font-size: @sFont;
				}
			}
		}
	}
	.update-error {
		.error-tips {
			margin: 30px auto;
			font-size: @sFont;
			text-align: center;
		}
		.button-group {
			display: flex;
			justify-content: space-around;
			width: 325px;
			margin: 0 auto;
		}
	}
}

.update-message {
	margin-bottom: 10px;
	font-size: @lFont;
	text-align: center;
}
</style>

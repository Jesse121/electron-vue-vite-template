<template>
	<div class="windows-bar">
		<div v-if="$slots.default" class="windows-bar-left">
			<slot />
		</div>
		<div class="windows-bar-right">
			<span @click="minimizeWin"><svg-icon icon-class="minimize" /></span>
			<span @click="maximizeWin">
				<svg-icon v-show="showNormalIcon" icon-class="normal" />
				<svg-icon v-show="!showNormalIcon" icon-class="maximize" />
			</span>
			<span @click="closeWin"><svg-icon icon-class="close" /></span>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";

import { ipcRendererInvoke, ipcRendererOn, ipcRendererSend } from "@/utils/ipcRenderer";

const route = useRoute();

const minimizeWin = () => {
	ipcRendererSend("minimize-win");
};

const showNormalIcon = ref(false);
const maximizeWin = () => {
	ipcRendererInvoke("maximize-win").then(res => {
		if (res === "showNormalIcon") {
			showNormalIcon.value = true;
		} else if (res === "showMaximizeIcon") {
			showNormalIcon.value = false;
		}
	});
};

const closeWin = () => {
	ipcRendererSend("close-win", {
		needClose: route.name === "login"
	});
};
</script>

<style scoped lang="less">
.windows-bar {
	display: flex;
	justify-content: space-between;
	height: 28px;
	background-color: #fff;
	/* 拖拽 */
	-webkit-app-region: drag;

	&-left {
		display: flex;
		align-items: center;
		-webkit-app-region: no-drag;
	}

	&-right {
		display: flex;
		flex: 1;
		justify-content: flex-end;
	}

	span {
		display: block;
		height: 28px;
		padding: 0 10px;
		line-height: 28px;
		cursor: pointer;
		-webkit-app-region: no-drag;
		&:hover {
			background-color: #eee;
		}
		.svg-icon {
			color: @descTextColor;
			font-size: @sFont;
		}
		.el-icon {
			color: @descTextColor;
		}
	}
}
.file-preview {
	align-items: center;
	height: 45px;
	border-bottom: 1px solid @borderColor;
	.line {
		height: 100%;
		margin: 0 10px;
		border-right: 1px solid @borderColor;
	}
}
</style>

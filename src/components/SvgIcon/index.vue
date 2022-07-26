<template>
	<svg :class="svgClass" aria-hidden="true" v-bind="$attrs" :style="style">
		<use :xlink:href="iconName" />
	</svg>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
	name: "SvgIcon",
	props: {
		iconClass: {
			type: String,
			required: true
		},
		className: {
			type: String,
			default: ""
		},
		color: {
			type: String
		}
	},
	setup(props) {
		const iconName = computed(() => `#icon-${props.iconClass}`);
		const style = computed(() => {
			if (props.color) return { color: props.color };
			return {};
		});

		const svgClass = computed(() => {
			if (props.className) {
				return "svg-icon " + props.className;
			} else {
				return "svg-icon";
			}
		});
		const styleExternalIcon = computed(() => {
			return {
				mask: `url(${props.iconClass}) no-repeat 50% 50%`,
				"-webkit-mask": `url(${props.iconClass}) no-repeat 50% 50%`
			};
		});

		return {
			iconName,
			svgClass,
			style,
			styleExternalIcon
		};
	}
});
</script>

<style scoped lang="less">
.svg-icon {
	width: 1em;
	height: 1em;
	overflow: hidden;
	vertical-align: -0.15em;
	fill: currentColor !important;
}

.svg-external-icon {
	display: inline-block;
	background-color: currentColor;
	mask-size: cover !important;
}
</style>

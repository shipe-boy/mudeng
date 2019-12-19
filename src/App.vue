<template>
	<div id="app">

		<header-nav></header-nav>

		<router-view />

		<footer-nav></footer-nav>

	</div>
</template>

<script>
	export default {
		name: 'App'
	}
</script>

<style>
	/*初始化  */
	body,
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	hr,
	p,
	blockquote,
	dl,
	dt,
	dd,
	ul,
	ol,
	li,
	pre,
	form,
	fieldset,
	legend,
	button,
	input,
	textarea,
	th,
	td {
		margin: 0;
		padding: 0;
	}

	body,
	button,
	input,
	select,
	textarea {
		font: 12px/1.5tahoma, arial, \5b8b\4f53;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		font-size: 100%;
	}

	address,
	cite,
	dfn,
	em,
	var {
		font-style: normal;
	}

	code,
	kbd,
	pre,
	samp {
		font-family: couriernew, courier, monospace;
	}

	small {
		font-size: 12px;
	}

	ul,
	ol {
		list-style: none;
	}

	a {
		text-decoration: none;
		color: #000000;
	}

	/* a:hover { text-decoration:underline; } */
	sup {
		vertical-align: text-top;
	}

	sub {
		vertical-align: text-bottom;
	}

	legend {
		color: #000;
	}

	fieldset,
	img {
		border: 0;
	}

	button,
	input,
	select,
	textarea {
		font-size: 100%;
	}

	table {
		border-collapse: collapse;
		border-spacing: 0;
	}

	body {
		background: #fff;
	}

	.clearfix::after {
		content: "";
		display: block;
		clear: both;
		height: 0;
		visibility: hidden;
	}

	/* 首页banner */
	.swiper-pagination.swiper-pagination-clickable.swiper-pagination-bullets .swiper-pagination-bullet {
		width: 30px;
		height: 5px;
		border-radius: 8px;
	}

	.swiper-pagination-bullet {
		width: 30px !important;
		height: 4px !important;
		border-radius: 10px !important;
	}

	/* 新闻banner */
	.pagination .swiper-pagination-bullet {
		width: 50px !important;
		height: 5px !important;
		margin: 5px 5px;
		background-color: #aaa;
		border-radius: 10px;
	}

	.pagination .swiper-pagination-bullet-active {
		background-color: rgb(0, 122, 212) !important;
	}

	/* 分页 */
	.page {
		padding: 20px 0;
		text-align: center;
	}

	.el-pagination {
		display: inline-block;
		text-align: center;
		color: #000;
	}

	.el-pagination.is-background .el-pager li {
		margin: 0 10px !important;
		background-color: #fff !important;
		border-radius: 50% !important;
		font-weight: 400;
		font-size: 14px;
		color: #000 !important;
	}
	.el-pagination.is-background .el-pager li:not(.disabled):hover{
		color: #000 !important;
	}

	.el-pagination.is-background .el-pager li:not(.disabled).active {
		background-color: #dadada !important;
		color: #000 !important;
	}

	/* .el-pagination.is-background .el-pager li:not(.disabled):hover {
		color: rgb(0, 122, 212) !important;
	} */

	/* 百度地图 */
	.BMap_cpyCtrl .BMap_noprint .anchorBL {
		display: none;
	}

	/*调用百度地图api 去掉地图左下角LOGO或文字*/
	.anchorBL {
		display: none;
	}

	/* 文本超出省略 */
	.el1 {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

	.el2 {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	/* 详情页 */
	.details-w{
		width: 100%;
		border-top: 1px solid rgba(0,0,0,0.15);
	}
	.details {
		max-width: 1400px;
		margin: 0 auto;
		/* border-top: 1px solid rgba(0,0,0,0.15); */
	}

	.details .b-crumbs {
		height: 60px;
		line-height: 60px;
		border-bottom: 1px solid #eee;
	}



	input::-ms-clear {
		display: none !important;
	}
	@media screen and (max-width:992px) {
		/* 移动端导航下拉三角等央视 */
		.el-submenu__title{
			margin-top: 10px;
		}
		.el-submenu__title i {
			display: none !important;
		}
		
		.el-submenu__title:hover {
			position: relative;
			background-color: #fff;
		}
		.el-menu-item-group__title{
			display: none;
		}
		.el-menu-item-group>ul{
			box-sizing: border-box;
			border-top: 1px solid #d0d0d0;
			border-left: 1px solid #d0d0d0;
			border-right: 1px solid #d0d0d0;
			background-color: #f3f3f3;
		}
		.el-menu-item-group .el-menu-item:hover{
			background-color: #e8e8e8!important;
		}
		.el-menu-item-group .el-menu-item:hover a{
			color: rgb(0, 122, 212);
		}
	}

	@media screen and (max-width:767px) {
		.details .b-crumbs {
			height: 30px;
			line-height: 30px;
			border-bottom: none;
		}
		.el-pagination.is-background .el-pager li {
			margin: 0 2px !important;
		}
	}
</style>

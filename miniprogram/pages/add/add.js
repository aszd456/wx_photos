// pages/add/add.js
const db = wx.cloud.database()
const photos = db.collection('photos')
var app = getApp()

function formatDate() {
	var now = new Date()
	var y = now.getFullYear()
	var m = now.getMonth() + 1
	var d = now.getDate()

	if (m < 10) {
		m = '0' + m
	}
	if (d < 10) {
		d = '0' + d
	}
	return y + '-' + m + '-' + d
}
Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},
	upload() {
		wx.chooseImage({
			count: 1,
			sizeType: ['compressed'],
			sourceType: ['album', 'camera'],
			success: res => {
				wx.showLoading({
					title: '上传中'
				})
				const filePath = res.tempFilePaths[0]
				const cloudPath = Math.floor(Math.random() * 1000000) + filePath.match(/\.[^.]+?$/)[0]
				wx.cloud.uploadFile({
					cloudPath: cloudPath,
					filePath: filePath,
					success: res => {
						wx.showToast({
							title: '上传成功',
							duration: 3000
						})
						let userInfo = app.globalData.userInfo
						let today = formatDate()

						photos.add({
							data: {
								photoUrl: res.fileID,
								avatarUrl: userInfo.avatarUrl,
								country: userInfo.country,
								province: userInfo.province,
								nickName: userInfo.nickName,
								addDate: today
							},
							success: res => {
								console.log(res)
							},
							fail: err => {
								wx.showToast({
									title: '上传失败',
									icon: 'none'
								})
							}
						})
					},
					fail: e => {
						console.error(e)
					},
					complete: () => {
						wx.hideLoading()
						this.getHistoryPhotos()
					}
				})
			}
		})
	},
	getHistoryPhotos() {
		let openid = app.globalData.openid
		photos.where({
			_openid: openid
		}).get({
			success: res => {
				this.setData({
					historyPhotos: res.data
				})
			}
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		this.getHistoryPhotos()
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	}
})

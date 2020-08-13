// pages/detail/detail.js
const db = wx.cloud.database()
const photos = db.collection('photos')
Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},
	downloadPhoto() {
		wx.cloud.downloadFile({
			fileID: this.data.photo.photoUrl,
			success: res => {
				wx.saveImageToPhotosAlbum({
					filePath: res.tempFilePath,
					success: res => {
						wx.showToast({
							title: '保存成功'
						})
					},
					fail: err => {
						wx.showToast({
							title: '保存失败',
							icon: 'none'
						})
					}
				})
			},
			fail: err => {
				console.log(err)
			}
		})
	},
	previewPhoto() {
		var urls = [this.data.photo.photoUrl]
		wx.previewImage({
			urls: urls
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		photos.doc(options.id).get({
			success: res => {
				this.setData({
					photo: res.data
				})
			}
		})
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
		return {
			title: '给你分享一张好看的图片',
			path: 'pages/detail/detail?id=' + this.data.photo._id
		}
	}
})

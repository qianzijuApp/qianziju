import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/store'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
			name: 'login',
			component: resolve => require(['@/pages/login'], resolve)
    },
    {
      path: '/home',
      name: 'home',
      redirect: "/waittingBroker",
      component: resolve => require(['@/components/home'], resolve),
      children:[
        {
          path: '/brokerList',
          name: 'brokerList',
          meta: {
						title: '经纪人列表'
					},
          component: resolve => require(['@/pages/brokerManagement/brokerList'], resolve)//经纪人列表
        },
        {
          path: '/brokerDetail',
          name: 'brokerDetail',
          component: resolve => require(['@/pages/brokerManagement/brokerDetail'], resolve)//经纪人详情
        },
        {
          path: '/waittingBroker',
          name: 'waittingBroker',
          meta: {
						title: '待审核经纪人'
					},
          component: resolve => require(['@/pages/brokerManagement/waittingBroker'], resolve)//待审核经济人
        },
        {
          path: '/waittingDetail',
          name: 'waittingDetail',
          component: resolve => require(['@/pages/brokerManagement/waittingDetail'], resolve)//待审核经纪人详情
        },
        {
          path: '/blackList',
          name: 'blackList',
          meta: {
						title: '黑名单'
					},
          component: resolve => require(['@/pages/brokerManagement/blackList'], resolve)//黑名单
        },
        {
          path: '/blackDetail',
          name: 'blackDetail',
          component: resolve => require(['@/pages/brokerManagement/blackDetail'], resolve)//黑名单详情
        },
        {
          path: '/secoundHousingDeal',
          name: 'secoundHousingDeal',
          meta: {
						title: '二手房买卖'
					},
          component: resolve => require(['@/pages/housingManagement/secoundHousingDeal'], resolve)//二手房买卖
        },
        {
          path: '/secoundDealDetail',
          name: 'secoundDealDetail',
          component: resolve => require(['@/pages/housingManagement/secoundDealDetail'], resolve)//二手房买卖、租赁详情
        },
        {
          path: '/seoundHousingRent',
          name: 'seoundHousingRent',
          meta: {
						title: '二手房租赁'
					},
          component: resolve => require(['@/pages/housingManagement/seoundHousingRent'], resolve)//二手房租赁
        },
        {
          path: '/secoundRentDetail',
          name: 'secoundRentDetail',
          component: resolve => require(['@/pages/housingManagement/secoundRentDetail'], resolve)//二手房租赁详情（未写）
        },
        {
          path: '/newPlate',
          name: 'newPlate',
          meta: {
						title: '新盘'
					},
          component: resolve => require(['@/pages/housingManagement/newPlate'], resolve)//新盘
        },
        {
          path: '/newDetail',
          name: 'newDetail',
          component: resolve => require(['@/pages/housingManagement/newDetail'], resolve)//新盘详情
        },
        {
          path: '/edit',
          name: 'edit',
          component: resolve => require(['@/pages/housingManagement/edit'], resolve)//新建新盘
        },

        {
          path: '/modifyEdit',
          name: 'modifyEdit',
          component: resolve => require(['@/pages/housingManagement/modifyEdit'], resolve)//编辑
        },

        {
          path: '/deal',
          name: 'deal',
          meta: {
						title: '买卖'
					},
          component: resolve => require(['@/pages/signatureManagement/deal'], resolve)///签单买卖
        },
        {
          path: '/dealDetail',
          name: 'dealDetail',
          component: resolve => require(['@/pages/signatureManagement/dealDetail'], resolve)///签单买卖详情
        },
        {
          path: '/rent',
          name: 'rent',
          meta: {
						title: '租赁'
					},
          component: resolve => require(['@/pages/signatureManagement/rent'], resolve)///签单租赁
        },
        {
          path: '/rentDetail',
          name: 'rentDetail',
          component: resolve => require(['@/pages/signatureManagement/rentDetail'], resolve)///签单租赁详情
        },
        {
          path: '/plate',
          name: 'plate',
          meta: {
						title: '新盘'
					},
          component: resolve => require(['@/pages/signatureManagement/plate'], resolve)///签单新盘
        },
        {
          path: '/plateDetail',
          name: 'plateDetail',
          component: resolve => require(['@/pages/signatureManagement/plateDetail'], resolve)///签单新盘详情
        },
        {
          path: '/performanceRecord',
          name: 'performanceRecord',
          meta: {
						title: '业绩记录'
					},
          component: resolve => require(['@/pages/performanceManagement/performanceRecord'], resolve)///业绩记录
        },
        {
          path: '/bonusRecord',
          name: 'bonusRecord',
          meta: {
						title: '奖金记录'
					},
          component: resolve => require(['@/pages/performanceManagement/bonusRecord'], resolve)///奖金记录
        },
        {
          path: '/customers',
          name: 'customers',
          meta: {
						title: '报客户'
					},
          component: resolve => require(['@/pages/recommendCustomers/customers'], resolve)///报客户
        },
        {
          path: '/customDetail',
          name: 'customDetail',
          component: resolve => require(['@/pages/recommendCustomers/customDetail'], resolve)///报客户详情
        },
        {
          path: '/advert',
          name: 'advert',
          meta: {
						title: '广告管理'
					},
          component: resolve => require(['@/pages/advertisement/advert'], resolve)///广告管理
        },
        {
          path: '/advertEdit',
          name: 'advertEdit',
          component: resolve => require(['@/pages/advertisement/advertEdit'], resolve)///编辑广告
        },
        {
          path: '/advertDetail',
          name: 'advertDetail',
          component: resolve => require(['@/pages/advertisement/advertDetail'], resolve)///广告详情
        },
        {
          path: '/messageCenter',
          name: 'messageCenter',
          meta: {
						title: '信息中心'
					},
          component: resolve => require(['@/pages/messageManagement/messageCenter'], resolve)///信息中心
        },
        {
          path: '/messageEdit',
          name: 'messageEdit',
          component: resolve => require(['@/pages/messageManagement/messageEdit'], resolve)///推送信息
        },
        {
          path: '/messageDetail',
          name: 'messageDetail',
          component: resolve => require(['@/pages/messageManagement/messageDetail'], resolve)///信息详情
        },
        {
          path: '/feedBack',
          name: 'feedBack',
          meta: {
						title: '反馈意见'
					},
          component: resolve => require(['@/pages/messageManagement/feedBack'], resolve)///反馈意见
        },
        {
          path: '/feedDetail',
          name: 'feedDetail',
          component: resolve => require(['@/pages/messageManagement/feedDetail'], resolve)///意见详情
        },
        {
          path: '/city',
          name: 'city',
          meta: {
						title: '城市建设'
					},
          component: resolve => require(['@/pages/systemSetting/city'], resolve)///城市建设
        },
        {
          path: '/system',
          name: 'system',
          meta: {
						title: '参数设置'
					},
        component: resolve => require(['@/pages/systemSetting/system'], resolve)///参数设置
        },
        {
          path: '/preparaRecord',
          name: 'preparaRecord',
          meta: {
            title: '报备记录'
					},
          component: resolve => require(['@/pages/newOffer/preparaRecord'], resolve)//报备记录
        },
        {
          path: '/offerInformation',
          name: 'offerInformation',
          meta: {
						title: '报盘资料'
					},
          component: resolve => require(['@/pages/newOffer/offerInformation'], resolve)//报盘信息
        },
        {
          path: '/newPerson',
          name: 'newPerson',
          meta: {
            title: '新建人员'
          },
          component: resolve => require(['@/pages/newPerson'], resolve)//新建人员
        },
        
      ]
    },
    {
      path: '*',
      name: 'notFound',
      component: resolve => require(['@/pages/notFound'], resolve)//新建人员
    },
  ]
})



if (sessionStorage.getItem('token')) {
  store.commit('setToken', sessionStorage.getItem('token'))
}
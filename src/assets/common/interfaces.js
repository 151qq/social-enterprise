/**
 * Created by zhangbin on 2017/7/6.
 */
const platform = "/E2-Platform/"
export default {
    interfaces: {
        "authentication": platform + "authentication.json",
        "getUserInfo": platform + "getUserInfo.json",
        "changePassword": platform + "changePassword.json",
        "headImage": platform + "headImage.json",
        "logout": platform + 'logout.json',
        "sendSmsCode": platform + 'sendSmsCode.json',
        "changePassword": platform + "changePassword.json",
        "resetPassword": platform + "resetPassword.json",

        uploadFile: platform + 'platformFile/uploadFile.json',

        /**
        * 企业 get
        */
        showAllEnterprise: platform + 'enterprise/showAllEnterprise.json',
        showEnterpriseInfo: platform + 'enterprise/showEnterpriseInfo.json',
        platformPubWechatInfo: platform + 'enterprise/platformPubWechatInfo.json',
        platfromEnterpriseWechatInfo: platform + 'enterprise/platfromEnterpriseWechatInfo.json',
        platfromWechatInfo: platform + 'enterprise/platfromWechatInfo.json',
        enterpriseBaseInfoSave: platform + 'enterprise/enterpriseBaseInfoSave.json',
        disOfEnterpriseInfo: platform + 'enterprise/disOfEnterpriseInfo.json',
        findDictionaryByType: platform + 'enterprise/findDictionaryByType.json',
        removeEnterpriseInfo: platform + 'enterprise/removeEnterpriseInfo.json',
        checkName: platform + 'enterprise/checkName.json',
        enterpriseQCCGet: platform + 'enterprise/enterpriseQCCGet.json',
        getValidateCode: platform + 'enterprise/getValidateCode.json',
        valiSmsPass: platform + 'enterprise/valiSmsPass.json',
        enterpriseWechatInfoSave: platform + 'enterprise/enterpriseWechatInfoSave.json',

        selectProductAndEvent: platform + 'productAndEvent/selectProductAndEvent.json',
        enterpriseOrderStart: platform + 'platform/enterpriseOrderStart.json',
        enterpriseOrderStop: platform + 'platform/enterpriseOrderStop.json',

        /**
        * 客服 get
        */
        insertCallCenterConfig: platform + 'callCenterConfig/insertCallCenterConfig.json',
        updateCallCenterConfig: platform + 'callCenterConfig/updateCallCenterConfig.json',
        findCallCenterConfig: platform + 'callCenterConfig/findCallCenterConfig.json',
        getEnterpriseConfigDic: platform + 'callCenterConfig/getEnterpriseConfigDic.json',

        /**
        * 调研 get
        */
        manageSurveyInfo: platform + 'surveyInfo/manageSurveyInfo.json',
        updateSurveyStatus: platform + 'surveyInfo/updateSurveyStatus.json',
        selectByEcAndTy: platform + 'surveyInfo/selectByEcAndTy.json',
        deleteSurvey: platform + 'surveyInfo/deleteSurvey.json',
        selectSurveyInfo: platform + 'surveyInfo/selectSurveyInfoBySurveyCode.json',


        manageSurveySubject: platform + 'surveySubject/manageSurveySubject.json',
        selectSurveySBySC: platform + 'surveySubject/selectSurveySubjectBySurveyCode.json',
        selectSurveySBySS: platform + 'surveySubject/selectSurveySubjectBySurveySubjectCode.json',
        deleteSurveySubject: platform + 'surveySubject/deleteSurveySubjectBySurveySubjectCode.json',

        attachmentInsert: platform + 'attachment/attachmentInsert.json',
        attachmentDelete: platform + 'attachment/attachmentDelete.json',
        /**
        * 我的素材库 get
        */
        listPage: platform + 'material/listPage.json',
        materialFolderInsert: platform + 'material/save.json',
        materialFolderDelete: platform + 'material/delete.json',
        materialFolderUpdate: platform + 'material/update.json',
        materialCopy: platform + 'material/copy.json',
        materialMove: platform + 'material/move.json',

        /**
        * 产品树 get
        */
        pruductCatalogList: platform + 'product/productCatalogList.json',
        deleteProductCatalog: platform + 'product/deleteProductCatalog.json',
        saveProductCatalog: platform + 'product/saveProductCatalog.json',
        productInfoGet: platform + 'product/productInfoGet.json',
        productInfoSave: platform + 'product/productInfoSave.json',
        productInfoDelete: platform + 'product/productInfoDelete.json',
        productScenarioList: platform + 'product/productScenarioList.json',
        getProductScenario: platform + 'product/getProductScenario.json',
        productScenarioSave: platform + 'product/productScenarioSave.json',
        productScenarioDelete: platform + 'product/deleteProductScenario.json',
        productParameterList: platform + 'product/productParameterList.json',
        deleteProductParameter: platform + 'product/deleteProductParameter.json',
        productParameterSave: platform + 'product/productParameterSave.json',
        productParameterDelete: platform + 'product/deleteProductParameter.json',
        getProductType: platform + 'product/getProductType.json',
        productInfoList: platform + 'product/productInfoList.json',
        getPriceType: platform + 'product/getPriceType.json',
        saveProductCover: platform + 'product/saveProductCover.json',

        /**
        * 营销树 get
        */
        eventInfoList: platform + 'event/eventInfoList.json',
        eventInfoDelete: platform + 'event/eventInfoDelete.json',
        eventInfoGet: platform + 'event/eventInfoGet.json',
        eventInfoInsert: platform + 'event/eventInfoInsert.json',
        eventInfoUpdate: platform + 'event/eventInfoUpdate.json',
        eventInfoChangeStatus: platform + 'event/eventInfoChangeStatus.json',


        couponInfoList: platform + 'coupon/couponInfoList.json',
        couponInfoDelete: platform + 'coupon/couponInfoDelete.json',
        couponInfoInsert: platform + 'coupon/couponInfoInsert.json',
        couponInfoGet: platform + 'coupon/couponInfoGet.json',
        couponInfoUpdate: platform + 'coupon/couponInfoUpdate.json',
        couponInfoChangeStatus: platform + 'coupon/couponInfoChangeStatus.json',
        getCouponType: platform + 'coupon/getCouponType.json',

        manageCouponGroup: platform + 'couponGroup/manageCouponGroup.json',
        deleteCouponGroup: platform + 'couponGroup/deleteCouponGroup.json',
        couponGroupOfPage: platform + 'couponGroup/couponGroupOfPage.json',



        /**
        * 推荐文章 get
        * key 搜索时使用，返回搜索相关数据
        */
        html5PageList: platform + 'html5PageList.json',
        html5PageDelete: platform + 'html5PageDelete.json',
        html5PageSubmit: platform + 'html5PageSubmit.json',
        getPageInfo: platform + 'getPageInfo.json',
        html5PageSave: platform + 'html5PageSave.json',
        html5PageAreaSave: platform + 'html5PageAreaSave.json',
        listPageArea: platform + 'listPageArea.json',
        deletePageArea: platform + 'deletePageArea.json',
        html5PageExtendInsert: platform + 'html5PageExtendInsert.json',
        html5PageExtendDelete: platform + 'html5PageExtendDelete.json',
        getExtendPages: platform + 'getExtendPages.json',

        getTemplates: platform +'htmlPageTemplate/listPage.json',
        insertTemplate: platform + 'htmlPageTemplate/save.json',
        deleteTemplate: platform + 'htmlPageTemplate/delete.json',
        updateTemplate: platform +'htmlPageTemplate/update.json',


        /**
        * 会员 get
        */
        memberList: platform + 'memberController/list.json',
        memberDetail: platform + 'memberController/details.json',
        selectLogList: platform + 'memberController/selectLogList.json',

        /**
        * 文章统计 get
        * ids 文章报告id eg: [1,2,3]
        */
        articleEchart: '/static/api/article/articleEchart.json',

        getCitys: '/static/api/common/city.json'
    }
}

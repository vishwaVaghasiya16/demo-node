import {
    appointmentStatusEnum,authProviderEnum,discountTypeEnum,paymentStatusEnum,serverEnums,addressTypeEnum,taxTypeEnum,
    userRoleEnum,videoCallStatusEnum,discountAppliesOnEnumType,costTypeEnum,orderStatusEnum,aboutUsTypeEnum,connectionTypeEnum,
    returnOrderStatusEnum,blogTypeEnum,homePageTypeEnum,paymentMethodEnum,genderTypeEnum
} from "../../../config/enum.js";
import {successResponse} from "../../../helper/apiResponse.js";

class controller {
    static getEnums = async (req,res) => {
        const result = {
            serverEnums: serverEnums,
            userRoleEnum: userRoleEnum,
            appointmentStatusEnum: appointmentStatusEnum,
            addressTypeEnum: addressTypeEnum,
            taxTypeEnum: taxTypeEnum,
            authProviderEnum: authProviderEnum,
            paymentStatusEnum: paymentStatusEnum,
            discountTypeEnum: discountTypeEnum,
            videoCallStatusEnum: videoCallStatusEnum,
            discountAppliesOnEnumType: discountAppliesOnEnumType,
            costTypeEnum: costTypeEnum,
            orderStatusEnum: orderStatusEnum,
            aboutUsTypeEnum: aboutUsTypeEnum,
            connectionTypeEnum: connectionTypeEnum,
            returnOrderStatusEnum: returnOrderStatusEnum,
            blogTypeEnum: blogTypeEnum,
            homePageTypeEnum: homePageTypeEnum,
            paymentMethodEnum: paymentMethodEnum,
            genderTypeEnum: genderTypeEnum,
        };
        return successResponse({
            res,
            statusCode: 200,
            data: result,
            message: "Enums retrieved successfully."
        });
    };
}

export default controller;

import {paymentStatusEnum} from "../../config/enum.js";
import PaymentModel from "./model.js";

class Service {
    static createOrder = async (doc) => {
        return PaymentModel.create(doc);
    };

    static getAllOrders = async (filter,pagination) => {
        return PaymentModel.find(filter)
            .skip(pagination.skip)
            .limit(pagination.limit)
            .sort({createdAt: -1})
            .populate({path: "orderId",select: "orderId"})
            .populate({path: "customer",select: "username email phone customerId url"})
            .select("amount paymentId status createdAt updatedAt");
    };

    static findStatus = async (paymentId) => {
        return PaymentModel.findOne({paymentId: paymentId});
    };

    static refund = async (paymentId,userId) => {
        return PaymentModel.findOneAndUpdate(
            {paymentId},
            {$set: {status: paymentStatusEnum.REFUNDED,admin: userId}},
            {new: true}
        );
    };
}
export default Service;

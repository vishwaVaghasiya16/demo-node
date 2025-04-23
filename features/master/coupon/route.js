import express from "express";
import controller from "./controller.js";
import {verifyToken} from "../../../middleware/verifyToken.js";
import {validate} from "../../../middleware/validate.js";
import validation from "../coupon/validation.js";
import {userRoleEnum} from "../../../config/enum.js";
import {checkPermission} from "../../../middleware/role.js";

const route = express.Router();

/**create coupon */
route.post(
    "/",
    verifyToken,
    checkPermission([
        userRoleEnum.ADMIN,
        userRoleEnum.MANAGER,
        userRoleEnum.PRODUCTMANAGER
    ]),
    validate(validation.create),
    controller.create
);

/**get coupon */
route.get(
    "/get/:id?",
    controller.get
);

/**get coupon */
route.get(
    "/admin/:id?",
    verifyToken,
    checkPermission([
        userRoleEnum.ADMIN,
        userRoleEnum.MANAGER,
        userRoleEnum.PRODUCTMANAGER
    ]),
    controller.getByAdmin
);

/**update coupon */
route.patch(
    "/:id",
    verifyToken,
    checkPermission([
        userRoleEnum.ADMIN,
        userRoleEnum.MANAGER,
        userRoleEnum.PRODUCTMANAGER
    ]),
    validate(validation.update),
    controller.update
);

/**delete coupon */
route.delete(
    "/:id",
    verifyToken,
    checkPermission([
        userRoleEnum.ADMIN,
        userRoleEnum.MANAGER,
        userRoleEnum.PRODUCTMANAGER
    ]),
    controller.delete
);

export default route;

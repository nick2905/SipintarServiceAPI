import {
    addCanteenProduct,
    removeCanteenProduct,
    getAllProduct,
    getAllProductCanteenOrderActive,
    getAllProductOrderCanteenCancelSubmission,
    getOneProductOrderById,
    acceptCancelProductOrder,
    finishProductOrder,
    addCanteenRoom,
    removeCanteenRoom,
    getAllRoom
} from "../controllers/CanteenControllers";

import {
    addCooperationProduct,
    removeCooperationProduct,
    getAllCooperationProduct,
    getAllOrderCooperationActive,
    getAllProductCooperationCancelSubmission,
    getOneProductCooperationOrder,
    acceptCancelProductCooperationOrder,
    finishCooperationOrder,
    getOrderPulsaActive,
    getOrderPulsaFinish,
    getOneOrder,
    putStatusFinish,

} from "../controllers/CooperationControllers";
import {
    userRegister,
    userLogin,
    addCanteenProductOrder,
    cancelCanteenProductOrder,
    addCooperationProductOrder,
    cancelCooperationProductOrder,
    addCooperationPulsaOrder,
    loginRequiredCostumers,
    getCanteentOrderCustomer,
    loginRequiredAdmin
} from "../controllers/UserControllers";
import {
    addDelRoom,
    removeDelRoom,
    getAllDelRoom,
    acceptDelRoomBooking
} from "../controllers/ITDelControllers";

const routes = async (app) => {
    // Buyer Hit point
    app.route('/customer/auth/register')
        .post(userRegister)

    app.route('/customer/login')
        .post(userLogin)

    app.route('/customer/canteen/order')
        .post(loginRequiredCostumers, addCanteenProductOrder)
        .get(loginRequiredCostumers, getCanteentOrderCustomer)

    app.route('/customer/canteen/:idCanteenProductOrder')
        .put(loginRequiredCostumers, cancelCanteenProductOrder)

    app.route('/customer/cooperation/order')
        .post(loginRequiredCostumers, addCooperationProductOrder)
        .get(loginRequiredCostumers, getCooperationOrderCustomer)

    app.route('/customer/cooperation/order/:idCooperationOrder')
        .put(loginRequiredCostumers, cancelCooperationProductOrder)

    app.route('/customer/cooperation/pulsa')
        .post(loginRequiredCostumers, addCooperationPulsaOrder)
        .get(loginRequiredCostumers, getCooperationPulsaOrder)

    //Admin Hit Point
    // Cooperation Modul
    app.route('/admin/cooperation/product')
        .get(loginRequiredAdmin, getAllCooperationProduct)
        .post(loginRequiredAdmin, addCooperationProduct)

    app.route('/admin/cooperation/product/:idCooperationProduct')
        .delete(loginRequiredAdmin, removeCooperationProduct)


    app.route('/admin/cooperation/order/product')
        .get(loginRequiredAdmin, getAllOrderCooperationActive);

    app.route('/admin/cooperation/order/product/:idCooperationOrder')
        .get(loginRequiredAdmin, getOneProductCooperationOrder)

    app.route('/admin/cooperation/order/product/costumercancel')
        .get(loginRequiredAdmin, getAllProductCooperationCancelSubmission)

    app.route('/admin/cooperation/order/product/costumercancel/:idCooperationOrder')
        .put(loginRequiredAdmin, acceptCancelProductCooperationOrder)

    app.route('/admin/cooperation/order/product/finish/:idCooperationOrder')
        .post(loginRequiredAdmin, finishCooperationOrder)

    app.route('/admin/cooperation/order/pulsa')
        .get(loginRequiredAdmin, getOrderPulsaActive)

    app.route('/admin/cooperation/order/pulsa/:idOrderPulsa')
        .get(loginRequiredAdmin, getOneOrder)

    app.route('/admin/cooperation/order/pulsa/:idOrderPulsa')
        .put(loginRequiredAdmin, putStatusFinish)

    app.route('/admin/cooperation/order/pulsa/finish/')
        .get(loginRequiredAdmin, getOrderPulsaFinish)

    //Canteen Modul
    app.route('/admin/canteen/product')
        .get(loginRequiredAdmin, getAllProduct)
        .post(loginRequiredAdmin, addCanteenProduct)

    app.route('/admin/canteen/product/:idProduct')
        .delete(loginRequiredAdmin, removeCanteenProduct)

    app.route('/admin/canteen/room')
        .get(loginRequiredAdmin, getAllRoom)
        .post(loginRequiredAdmin, addCanteenRoom)

    app.route('/admin/canteen/room/:idCanteenRoom')
        .delete(loginRequiredAdmin, removeCanteenRoom)

    app.route('/admin/canteen/order')
        .get(loginRequiredAdmin, getAllProductCanteenOrderActive)

    app.route('/admin/canteen/order/:idProductOrder')
        .get(loginRequiredAdmin, getOneProductOrderById)

    app.route('/admin/canteen/order/finish/:idProductOrder')
        .put(loginRequiredAdmin, finishProductOrder)

    app.route('/admin/canteen/order/canceluser')
        .get(loginRequiredAdmin, getAllProductOrderCanteenCancelSubmission)

    app.route('/admin/canteen/order/canceluser/:idProductOrder')
        .put(loginRequiredAdmin, acceptCancelProductOrder)

    // IT Del Modul
    app.route('/admin/itdel/room')
        .get(loginRequiredAdmin, getAllDelRoom)
        .post(loginRequiredAdmin, addDelRoom)

    app.route('/admin/itdel/room/:idDelRoom')
        .delete(loginRequiredAdmin, removeDelRoom)

    app.route('/admin/itdel/room/booking/:idDelRoomBooking')
        .put(loginRequiredAdmin, acceptDelRoomBooking)

}

export default routes;
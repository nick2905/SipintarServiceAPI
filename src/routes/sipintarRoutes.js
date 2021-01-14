import {
    addCanteenProduct,
    removeCanteenProduct,
    getAllProduct,
    getAllProductCanteenOrder,
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
    getAllOrderCooperation,
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
    loginRequiredAdmin,
    getCooperationOrderCustomer,
    getCooperationPulsaOrder,
    addDelRoomBooking,
    getDelRoomBookingByUser
} from "../controllers/UserControllers";
import {
    addDelRoom,
    removeDelRoom,
    getAllDelRoom,
    acceptDelRoomBooking,
    getAllDelRoomBooking
} from "../controllers/ITDelControllers";

const routes = async (app) => {
    // Buyer Hit point
    // Sudah di Test
    app.route('/customer/auth/register')
        .post(userRegister)

    // Sudah di Test
    app.route('/customer/login')
        .post(userLogin)

    // Sudah di Test
    app.route('/customer/canteen/order')
        .post(loginRequiredCostumers, addCanteenProductOrder)
        .get(loginRequiredCostumers, getCanteentOrderCustomer)

    // Sudah di Test
    app.route('/customer/canteen/cancel/:idCanteenProductOrder')
        .put(loginRequiredCostumers, cancelCanteenProductOrder)

    // Sudah di Test
    app.route('/customer/cooperation/order')
        .post(loginRequiredCostumers, addCooperationProductOrder)
        .get(loginRequiredCostumers, getCooperationOrderCustomer)

    // Sudah di Test
    app.route('/customer/cooperation/order/:idCooperationOrder')
        .put(loginRequiredCostumers, cancelCooperationProductOrder)

    // Sudah di Test
    app.route('/customer/cooperation/pulsa')
        .post(loginRequiredCostumers, addCooperationPulsaOrder)
        .get(loginRequiredCostumers, getCooperationPulsaOrder)

    // IT Del Hitpoint
    // Sudah di Test Local
    app.route('/customer/itdel/room/booking')
        .post(loginRequiredCostumers, addDelRoomBooking)
    
    // Sudah di Test Local
    app.route('/customer/itdel/room/booking/:idUser')
        .get(loginRequiredCostumers, getDelRoomBookingByUser)

    // Admin Hit Point
    // Cooperation Modul
    // Sudah di Test
    app.route('/admin/cooperation/product')
        .get(loginRequiredAdmin, getAllCooperationProduct)
        .post(loginRequiredAdmin, addCooperationProduct)

    // Sudah di Test
    app.route('/admin/cooperation/product/:idCooperationProduct')
        .delete(loginRequiredAdmin, removeCooperationProduct)

    // Sudah di Test
    app.route('/admin/cooperation/order/product')
        .get(loginRequiredAdmin, getAllOrderCooperation);

    // Sudah di Test
    app.route('/admin/cooperation/order/product/:idCooperationOrder')
        .get(loginRequiredAdmin, getOneProductCooperationOrder)

    // Sudah di Test
    app.route('/admin/cooperation/order/product/cancel/:idCooperationOrder')
        .put(loginRequiredAdmin, acceptCancelProductCooperationOrder)

    // Sudah di Test
    app.route('/admin/cooperation/order/product/finish/:idCooperationOrder')
        .post(loginRequiredAdmin, finishCooperationOrder)

    // Sudah di Test
    app.route('/admin/cooperation/order/pulsa')
        .get(loginRequiredAdmin, getOrderPulsaActive)

    // Sudah di Test
    app.route('/admin/cooperation/order/pulsa/detail/:idOrderPulsa')
        .get(loginRequiredAdmin, getOneOrder)

    // Sudah di Test
    app.route('/admin/cooperation/order/pulsa/:idOrderPulsa')
        .put(loginRequiredAdmin, putStatusFinish)

    // Sudah di Test
    app.route('/admin/cooperation/order/pulsa/finish/')
        .get(loginRequiredAdmin, getOrderPulsaFinish)

    //Canteen Modul
    // Sudah di Test
    app.route('/admin/canteen/product')
        .get(loginRequiredAdmin, getAllProduct)
        .post(loginRequiredAdmin, addCanteenProduct)

    // Sudah di Test
    app.route('/admin/canteen/product/:idProduct')
        .delete(loginRequiredAdmin, removeCanteenProduct)

    // Sudah di Test
    app.route('/admin/canteen/room')
        .get(loginRequiredAdmin, getAllRoom)
        .post(loginRequiredAdmin, addCanteenRoom)

    // Sudah di Test
    app.route('/admin/canteen/room/:idCanteenRoom')
        .delete(loginRequiredAdmin, removeCanteenRoom)

    // Sudah di Test
    app.route('/admin/canteen/order')
        .get(loginRequiredAdmin, getAllProductCanteenOrder)

    // Sudah di Test
    app.route('/admin/canteen/order/:idProductOrder')
        .get(loginRequiredAdmin, getOneProductOrderById)

    // Sudah di Test
    app.route('/admin/canteen/order/finish/:idProductOrder')
        .put(loginRequiredAdmin, finishProductOrder)

    // Sudah di Test
    app.route('/admin/canteen/order/canceluser/:idProductOrder')
        .put(loginRequiredAdmin, acceptCancelProductOrder)

    // IT Del Modul
    // Sudah Di Test
    app.route('/admin/itdel/room')
        .get(loginRequiredAdmin, getAllDelRoom)
        .post(loginRequiredAdmin, addDelRoom)

    // Sudah Di Test
    app.route('/admin/itdel/room/:idDelRoom')
        .delete(loginRequiredAdmin, removeDelRoom)


    app.route('/admin/itdel/room/booking/order/:idDelRoomBooking')
        .put(loginRequiredAdmin, acceptDelRoomBooking)

    app.route('/admin/itdel/room/booking')
        .get(loginRequiredAdmin, getAllDelRoomBooking)
}

export default routes;
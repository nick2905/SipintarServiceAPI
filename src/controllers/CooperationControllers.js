import mongoose from 'mongoose';
import { CooperationProductSchema } from "../models/CooperationProductModel";
import { CooperationOrderSchema } from "../models/CooperationOrderModel";
import { PulsaOrderSchema } from "../models/PulsaOrderModel";
const mailgun = require("mailgun-js");
const DOMAIN = 'nicolasmanurung.tech';
const mg = mailgun({ apiKey: "76d09f6b0646ad23850b363dcebdb7ad-e5da0167-d59bdd1e", domain: DOMAIN });
const CooperationProduct = mongoose.model('CooperationProduct', CooperationProductSchema);
const CooperationOrder = mongoose.model('CooperationOrder', CooperationOrderSchema);
const PulsaOrder = mongoose.model('PulsaOrder', PulsaOrderSchema);

// Admin Cooperation Modul
export const addCooperationProduct = async (req, res) => {
    try {
        const newCooperationProduct = new CooperationProduct(req.body);
        await newCooperationProduct.save();
        return res.status(200).json({ message: 'Successfull add product' });
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Maaf ada kesalahan' });
    }
}

export const removeCooperationProduct = async (req, res) => {
    try {
        await CooperationProduct.findOneAndDelete(req.params.idCooperationProduct);
        return res.status(200).json({ message: 'Successfull remove product' });
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Maaf ada kesalahan' });
    }
}

export const getAllCooperationProduct = async (req, res) => {
    try {
        const findAllCooperationProduct = await CooperationProduct.find();
        return res.status(200).json(findAllCooperationProduct);
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Maaf ada kesalahan' });
    }
}

// Order modul
export const getAllOrderCooperation= async (req, res) => {
    try {
        const findAllProductOrder = await CooperationOrder.find();
        return res.status(200).json(findAllProductOrder);
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Maaf ada kesalahan' });
    }
}

export const getAllProductCooperationCancelSubmission = async (req, res) => {
    try {
        const findAllroductCooperationCancel = await CooperationOrder.find({ isCancelUser: true });
        console.log("value findAllroductCooperationCancel ->" + findAllroductCooperationCancel);
        return res.status(200).json(findAllroductCooperationCancel);
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Maaf ada kesalahan' });
    }
}

export const getOneProductCooperationOrder = async (req, res) => {
    try {
        // Using Parameter idCooperationOrder
        const findOneCooperationOrder = await CooperationOrder.findById(req.params.idCooperationOrder);
        return res.status(200).json(findOneCooperationOrder);
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Maaf ada kesalahan' });
    }
}

export const acceptCancelProductCooperationOrder = async (req, res) => {
    try {
        // Using parameter idCooperationOrder
        await CooperationOrder.findByIdAndUpdate(req.params.idCooperationOrder, {
            $set: {
                isCancelAdmin: true
            }
        })
        return res.status(200).json({ message: 'Successfull! Order cancel!' });
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Maaf ada kesalahan' });
    }
}

export const finishCooperationOrder = async (req, res) => {
    try {
        // Using parameter idCooperationOrder
        await CooperationOrder.findByIdAndUpdate(req.body.idCooperationOrder, {
            $set: {
                isFinished: true
            }
        })
        return res.status(200).json({ message: 'Successfull! Order finished!' });
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Maaf ada kesalahan' });
    }
}

//Pulsa with Spring Boot

//Order Pulsa
export const getOrderPulsaActive = async (req, res) => {
    try {
        const findAllOrder = await PulsaOrder.find({ isFinished: false });
        return res.status(200).json(findAllOrder);
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Maaf ada kesalahan' });
    }
}

export const getOrderPulsaFinish = async (req, res) => {
    try {
        const findAllOrderFinish = await PulsaOrder.find({ isFinished: true });
        return res.status(200).json(findAllOrderFinish);
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Maaf ada kesalaahan' });
    }
}

export const getOneOrder = async (req, res) => {
    try {
        // Using parameter idOrderPulsa
        const findOneOrder = await PulsaOrder.findById(req.params.idOrderPulsa);
        return res.status(200).json(findOneOrder);
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Maaf ada kesalahan' });
    }
}

export const putStatusFinish = async (req, res) => {
    try {
        const findOneOrderConfirm = await PulsaOrder.findByIdAndUpdate(req.params.idOrderPulsa, {
            $set: {
                isFinished: true
            }
        });
        const data = {
            from: 'Sipintar IT Del <sipintaritdel@itdel.com>',
            to: req.body.email,
            subject: 'Email verifikasi',
            html: `<body class="em_body" style="margin:0px auto; padding:0px;" bgcolor="#efefef">
                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="em_full_wrap" align="center" bgcolor="#efefef">
                    <tr>
                        <td align="center" valign="top"><table align="center" width="650" border="0" cellspacing="0" cellpadding="0" class="em_main_table" style="width:650px; table-layout:fixed;">
                            <tr>
                                <td align="center" valign="top" style="padding:0 25px;" class="em_aside10"><table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
                                    <tr>
                                        <td height="26" style="height:26px;" class="em_h20">&nbsp;</td>
                                    </tr>
                                    <tr><td align="center" valign="top"><a href="#" target="_blank" style="text-decoration:none;"><img src="https://drive.google.com/uc?id=1Q6Uo4eLetR1gIKzQvokgZo5GgT3JVSFM" width="208" height="41" alt="kodelapo" border="0" style="display:block; font-family:Arial, sans-serif; font-size:18px; line-height:25px; text-align:center; color:#1d4685; font-weight:bold; max-width:208px;" class="em_w150" /></a></td></tr>
                                    <tr>
                                        <td height="28" style="height:28px;" class="em_h20">&nbsp;</td>
                                    </tr>
                                </table>
                                </td>
                            </tr>
                        </table>
                        </td>
                    </tr>
                </table>
                <table class="body-wrap" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; background-color: #f6f6f6; margin: 0;" bgcolor="#f6f6f6"><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0;" valign="top"></td>
                    <td class="container" width="600" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; display: block !important; max-width: 600px !important; clear: both !important; margin: 0 auto;" valign="top">
                        <div class="content" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; max-width: 600px; display: block; margin: 0 auto; padding: 20px;">
                            <table class="main" width="100%" cellpadding="0" cellspacing="0" itemprop="action" itemscope itemtype="http://schema.org/ConfirmAction" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; border-radius: 3px; background-color: #fff; margin: 0; border: 1px solid #e9e9e9;" bgcolor="#1d4685"><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-wrap" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 20px;" valign="top">
                                <meta itemprop="name" content="Confirm Email" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;" /><table width="100%" cellpadding="0" cellspacing="0" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                                    Pulsa kamu telah di isi sebesar `+req.body.sumPulsa+`
                                                  </td>
                                </tr><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                                    Apabila kamu memiliki kendala, harap hubungi admin IT Del.
                                                  </td>
                                    </tr><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
                                    </tr><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box;font-size: 14px; margin: 0;">
                                    <td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                                        &mdash; Sipintar ITDel
                                    </td>
                                    </tr></table></td>
                            </tr></table><div class="footer" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; clear: both; color: #999; margin: 0; padding: 20px;">
                                <table width="100%" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="aligncenter content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 12px; vertical-align: top; color: #999; text-align: center; margin: 0; padding: 0 0 20px;" align="center" valign="top">Follow <a href="http://instagram.com/it.del" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 12px; color: #999; text-decoration: underline; margin: 0;">@itdel</a> on Instagram.</td>
                                </tr></table></div></div>
                    </td>
                    <td style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0;" valign="top"></td>
                </tr></table></body>`
        };
        mg.messages().send(data, function (error, body) {
            console.log(body);
        });
        return res.status(200).json({message: 'Successfull'});
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Maaf ada kesalahan' });
    }
}
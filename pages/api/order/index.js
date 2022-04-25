import logger from '../../../services/logger';

const {Order} = require('../../../models');



export default async function handler(req, res) { 
    const { method, headers } = req;

    if (headers && headers.api_token) {
        if (headers.api_token !== process.env.SECRET) {
            res.status(400).json({success: false, msg: "api_token provided in the headers does not match with the app token"})
        }
    }else{
        res.status(400).json({success: false, msg: "api_token not provided in the headers"})
    }


    switch (method) {
        case 'GET':
            try {
                const orders = await Order.findAll();
                res.status(200).json({ success: true, msg: 'Retrived data successfully', data: orders })
            } catch (error) {
                logger.error(error.stack);
                res.status(400).json({ success: false, msg: error  });
            }
            break;
        
        case 'POST':
            try {
                const order = await Order.create(req.body);
                res.status(201).json({ success: true, msg: 'Created data successfully', data: order })
            } catch (error) {
                logger.error(error.stack);
                res.status(400).json({ success: false, msg: error });
            }
            break;
        default:
            res.status(400).json({ success: false, msg: null  });
            break;
    }

}
import logger from '../../../services/logger';

const {InProgressOrder} = require('../../../models');



export default async function handler(req, res) {

    const { 
        query: {id},
        method , headers
    } = req;

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
                const response = await InProgressOrder.findByPk(id);

                if (!response) {
                    res.status(200).json({ success: false, msg: `No data found with id ${id}`  });
                }

                res.status(200).json({ success: true, msg: 'Retrived data successfully', data: account });

            } catch (error) {
                 logger.error(error.stack);
                res.status(400).json({ success: false, msg: error  });
            }
            break;
        
        case 'PUT':
            try {
                let response = await InProgressOrder.findByPk(id);
                
                if(!response){
                    logger.info(`Record with id ${id} was not found`)
                    res.status(200).json({ success: false, msg: 'Record Not found', data: response })
                }
                
                await InProgressOrder.update(req.body,{ where: { id,  }});
                response = await InProgressOrder.findByPk(id);
                
                res.status(200).json({ success: true, msg: 'Updated data successfully', data: response })

            } catch (error) {
                logger.error(error.stack);
                res.status(400).json({ success: false, msg: error });
            }
            break;

        case 'DELETE':
            try {
                let response = await InProgressOrder.findByPk(id);
                
                if(!response){
                    logger.info(`Record with id ${id} was not found`)
                    res.status(200).json({ success: false, msg: 'Record Not found', data: response })
                }

                await InProgressOrder.destroy({ where: { id: id }});
                res.status(200).json({ success: true, msg: 'Deleted data successfully', data: response })
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
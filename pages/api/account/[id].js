import logger from '../../../services/logger';

const {Account} = require('../../../models');



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
                const account = await Account.findByPk(id);

                if (!account) {
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
                let response = null;
                const account = await Account.update(req.body,{ where: { id,  }});

                if(!account){
                    logger.info(`Account with id ${id} was not found`)
                    res.status(200).json({ success: false, msg: 'Account Not found', data: response })
                }

                response = await Account.findByPk(id);

                res.status(200).json({ success: true, msg: 'Updated data successfully', data: response })

            } catch (error) {
                logger.error(error.stack);
                res.status(400).json({ success: false, msg: error });
            }
            break;

        case 'DELETE':
            try {
                const account = await Account.destroy({ where: { id: id }});
                res.status(200).json({ success: true, msg: 'Updated data successfully', data: account })
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
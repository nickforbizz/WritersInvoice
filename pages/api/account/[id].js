import logger from '../../../services/logger';

const db_Sequelize = require('../../../utils/db');
const {Account} = require('../../../models');



export default async function handler(req, res) {

    const { 
        query: {id},
        method 
    } = req;


    switch (method) {
        case 'GET':
            try {
                const accounts = await Account.findByPk(id);

                if (!accounts) {
                    res.status(400).json({ success: false, msg: `No data found with id ${id}`  });
                }

                res.status(200).json({ success: true, msg: 'Retrived data successfully', data: accounts });

            } catch (error) {
                 logger.error(error.stack);
                res.status(400).json({ success: false, msg: error  });
            }
            break;
        
        case 'PUT':
            try {
                let response = null;
                const account = await Account.update(req.body,{ where: { id: id }});

                if(account){
                    response = await Account.findByPk(id);
                }

                res.status(200).json({ success: true, msg: 'Updated data successfully', data: response })

            } catch (error) {
                 logger.error(error.stack);
                res.status(400).json({ success: false, msg: error });
            }
            break;

        case 'DELETE':
            try {
                const account = await Account.destroy({ where: { id: id }});
                res.status(201)
                    .json({ success: true, msg: 'Updated data successfully', data: account })
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
const db_Sequelize = require('../../../utils/db');
const {Account} = require('../../../models');



export default async function handler(req, res) {
    const { method } = req;


    switch (method) {
        case 'GET':
            try {
                const accounts = await Account.findAll();
                res.status(200)
                    .json({
                        success: true,
                        msg: 'Retrived data successfully',
                        data: accounts,
                    })
            } catch (error) {
                res.status(400).json({ success: false, msg: error  });
            }
            break;
        
        case 'POST':
            try {
                const account = await Account.create(req.body);
                res.status(201)
                    .json({
                        success: true,
                        msg: 'Created data successfully',
                        data: account,
                    })
            } catch (error) {
                res.status(400).json({ success: false, msg: error });
            }
            break;
        default:
            res.status(400).json({ success: false, msg: null  });
            break;
    }

}
import logger from '../../../services/logger';

const { User } = require('../../../models');



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
                const users = await User.findAll();
                res.status(200).json({ success: true, msg: 'Retrived data successfully', data: users })
            } catch (error) {
                logger.error(error.stack);
                res.status(400).json({ success: false, msg: error  });
            }
            break;
        
        case 'POST':
            try {
                let found_user = await User.findOne({where: {email: req.body.email}});
                if(found_user){
                    res.status(200).json({ success: false, msg: `User with email ${req.body.email} already exists`  });
                }
                const user = await User.create(req.body);
                res.status(201).json({ success: true, msg: 'Created data successfully', data: user })
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
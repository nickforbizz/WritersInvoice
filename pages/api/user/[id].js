import logger from '../../../services/logger';

const {User} = require('../../../models');



export default async function handler(req, res) {

    const { 
        query: {id},
        headers,
        method 
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
                const user = await User.findByPk(id);

                if (!user) {
                    res.status(200).json({ success: false, msg: `No data found with id ${id}`  });
                }

                res.status(200).json({ success: true, msg: 'Retrived data successfully', data: user });

            } catch (error) {
                 logger.error(error.stack);
                res.status(400).json({ success: false, msg: error  });
            }
            break;
        
        case 'PUT':
            try {
                let response = await User.findByPk(id);
                
                if(!response){
                    res.status(200).json({ success: false, msg: 'User Not found', data: response })
                }
                
                await User.update(req.body,{ where: { id }, individualHooks: true});
                response = await User.findByPk(id);

                res.status(200).json({ success: true, msg: 'Updated data successfully', data: response })

            } catch (error) {
                 logger.error(error.stack);
                res.status(400).json({ success: false, msg: error });
            }
            break;

        case 'DELETE':
            try {
                const user = await User.destroy({ where: { id: id }});
                res.status(200).json({ success: true, msg: 'Updated data successfully', data: user })
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
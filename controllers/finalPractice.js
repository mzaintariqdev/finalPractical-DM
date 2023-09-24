const POSTINFO = require("../models/postInfo");

const getPostInfo = async(req, res)=>{

  let priceSort = req.query.price || 1;
  priceSort = parseInt(priceSort);
  let createdAtSort = req.query.createAt || 1;
  createdAtSort = parseInt(createdAtSort);


  let sortQuery= {
    price: priceSort,
    createdAt: createdAtSort,
  }

  let limit = req.query.limit || 5;
  limit = parseInt(limit);
  let page= req.query.page || 1;
  page = parseInt(page);
  let skip = (page -1)*limit;

  let matchQuery = {}; 
  
  if(req.body.userIds) { 
    matchQuery = {
      ...matchQuery,
      user_id: {
        $in: req.body.userIds,
      }
    }
  }
  
  if(req.body.brandIds) { 
    matchQuery = {
      ...matchQuery,
      brand: {
        $in: req.body.brandIds,
      }
    }
  }

  if(req.body.clothIds) { 
    matchQuery = {
      ...matchQuery,
      clothType: {
        $in: req.body.clothIds,
      }
    }
  }
  

  try {
    const data = await POSTINFO.aggregate([
      {
        $addFields: {
          user_id: {
            $toString: "$user_id"
          },
          brand: {
            $toString: "$brand"
          },
          clothType: {
            $toString: "$clothType"
          },
        }
      },
      {
        $match: matchQuery,
      },
      {
        $addFields: {
          user_id: {
            $toObjectId: "$user_id"
          },
          brand: {
            $toObjectId: "$brand"
          },
          clothType: {
            $toObjectId: "$clothType"
          },
        }
      },
      {
        $sort: sortQuery
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
      {
        $lookup: {
          from: 'users',
          localField: 'user_id',
          foreignField: '_id',
          as: 'user',
        }
      },
      {
        $lookup: {
          from: 'brands',
          localField: 'brand',
          foreignField: '_id',
          as: 'brand',
        }
      },
      {
        $lookup: {
          from: 'clothes',
          localField: 'clothType',
          foreignField: '_id',
          as: 'cloth',
        }
      },
    ])
    res.json({data, total: data?.length})
  }
  catch(e){
    console.log(e)
  }
}

module.exports = { getPostInfo };
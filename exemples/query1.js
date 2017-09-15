db.restaurants.aggregate(
  [{
      $match: {
        "cuisine": "Bakery"
      }
    },
    {
      $addFields: {
        "size_grades": {
          $size: "$grades"
        }
      }
    },
    {
      $group: {
        "_id": "$cuisine",
        "total_size": {
          $sum: "$size_grades"
        }
      }
    }
  ]
);

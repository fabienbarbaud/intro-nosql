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
        },
        "sum_grades": {
          $reduce: {
            "input": "$grades",
            "initialValue": 0,
            "in": {
              "$add": ["$$value", "$$this.score"]
            }
          }
        }
      }
    },
    {
      $group: {
        "_id": "$cuisine",
        "total_size": {
          $sum: "$size_grades"
        },
        "total_score": {
          $sum: "$sum_grades"
        }
      }
    }
  ]
);

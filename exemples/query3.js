db.restaurants.aggregate(
  [{
      $match: {
        "cuisine": "Bakery"
      }
    },
    {
      $addFields: {
        "avg_score": {
          $divide: [{
              $reduce: {
                "input": "$grades",
                "initialValue": 0,
                "in": {
                  "$add": ["$$value", "$$this.score"]
                }
              }
            },
            {
              $cond: [{
                  "$ne": [{
                    "$size": "$grades"
                  }, 0]
                },
                {
                  "$size": "$grades"
                },
                1
              ]
            }
          ]
        }
      }
    },
    {
      $group: {
        "_id": "$cuisine",
        "avg": {
          $avg: "$avg_score"
        }
      }
    }
  ]
);

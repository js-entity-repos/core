# Filter

This is an object that filters the entities. The [filter type definition](../src/types/Filter.ts) currently supports the following operators which have been borrowed from Mongo.

Operator | Description
--- | ---
[$and](https://docs.mongodb.com/manual/reference/operator/query/and/#op._S_and) | Includes entities where all of the specified filters are true.
[$or](https://docs.mongodb.com/manual/reference/operator/query/or/#op._S_or) | Includes entities where some of the specified filters are true.
[$not](https://docs.mongodb.com/manual/reference/operator/query/no/#op._S_no) | Includes entities where a specified filter is not true.
[$eq](https://docs.mongodb.com/manual/reference/operator/query/eq/#op._S_eq) | Includes entities where the value of a given property is equal to the specified value.
[$ne](https://docs.mongodb.com/manual/reference/operator/query/ne/#op._S_ne) | Includes entities where the value of a given property is not equal to the specified value.
[$lt](https://docs.mongodb.com/manual/reference/operator/query/lt/#op._S_lt) | Includes entities where the value of a given property is less than the specified value.
[$lte](https://docs.mongodb.com/manual/reference/operator/query/lt/#op._S_lt) | Includes entities where the value of a given property is less than or equal to the specified value.
[$gt](https://docs.mongodb.com/manual/reference/operator/query/gt/#op._S_gt) | Includes entities where the value of a given property is greater than the specified value.
[$gte](https://docs.mongodb.com/manual/reference/operator/query/gt/#op._S_gt) | Includes entities where the value of a given property is greater than or equal to the specified value.
[$in](https://docs.mongodb.com/manual/reference/operator/query/in/#op._S_in) | Includes entities where the value of a given property is equal to one of the specified values.
[$nin](https://docs.mongodb.com/manual/reference/operator/query/ni/#op._S_ni) | Includes entities where the value of a given property is not equal to any of the specified values.

The filter below is comprehensive example using all of the operators.

```json
{
  "$or": [
    {
      "numberProp1": {
        "$not": {
          "$gt": 0,
          "$lt": 1
        }
      }
    },
    {
      "$and": [
        {
          "stringProp1": "string value 1",
          "numberProp2": {
            "$gte": 0,
            "$lte": 1
          },
          "numberProp3": { "$ne": 0 },
          "numberProp4": { "$eq": 0 }
        },
        {
          "stringProp2": {
            "$in": ["string value 2", "string value 3"]
          },
          "stringProp3": {
            "$nin": ["string value 4", "string value 5"]
          }
        }
      ]
    }
  ]
}
```

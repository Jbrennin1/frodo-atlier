const pool = require('../db');

module.exports.getReviews = async (page, count, sort, product_id) => {
  const query = `
  SELECT reviews.*, array_agg(row_to_json(photos)::jsonb) AS photos
  FROM reviews
  LEFT JOIN (SELECT id, review_id, url FROM photos) AS photos ON reviews.review_id = photos.review_id
  WHERE reviews.product_id = ${product_id} AND reviews.product_id = ${product_id}
  GROUP BY reviews.review_id, reviews.product_id, reviews.rating, reviews.summary, reviews.body, reviews.recommend, reviews.reviewer_name, reviews.date, reviews.response, reviews.email, reviews.reported, reviews.helpfulness
  LIMIT ${count} OFFSET ${(page-1) * count}
`;
  try {
    const reviews = await pool.query(query);
      return {
        product: product_id,
        page: page,
        count: count,
        results: reviews.rows
      };
  } catch (error) {
    console.log(error);
  }
}

module.exports.getReviewsMeta = async (product_id) => {
  var queryMeta = `
  SELECT
    ARRAY_AGG(DISTINCT reviews.rating) AS ratings,
    ARRAY_AGG(DISTINCT reviews.recommend),
    ARRAY_AGG(DISTINCT characteristics.*) AS characteristics,
    ARRAY_AGG(DISTINCT characteristics_reviews.*) AS characteristics_reviews_list
    FROM reviews
    JOIN characteristics ON reviews.product_id = characteristics.product_id
    JOIN characteristics_reviews ON characteristics.id = characteristics_reviews.characteristic_id
    WHERE reviews.product_id = ${product_id}
    AND characteristics.id = characteristics_reviews.characteristic_id
    GROUP BY reviews.product_id, characteristics.id
  `
  try {
    const result = await pool.query(queryMeta)
    console.log(result.rows[0].ratings)
    const final = {product_id: product_id, ratings: {}, recommended: {}, characteristics: {}}
    result.rows[0].ratings.forEach((rating, index) => {
      console.log(rating)
      final.ratings[index] = rating;
      if(result.rows[0].array_agg[index]) {
        final.recommended.true =+ 1
      } else {
        final.recommended.false =+ 1
      }
    })
    result.rows.forEach((row) => {
      var name = row.characteristics.split(',')[1]
      var id = row.characteristics.split(',')[0].split('(')[1]

      final.characteristics[name]= {}
      console.log(final.characteristics[name])
      final.characteristics[name].id = id
      var values = row.characteristics_reviews_list

      values.split('","').forEach((value) => {
        value = value.split(',')
        if(!final.characteristics[name].value) {
          final.characteristics[name].value = value[1]
        } else {
          final.characteristics[name].value = (final.characteristics[name].value + value[1])/2
        }
        if(!final.characteristics[name].id) {
          final.characteristics[name].id = value[0].split('(')[1]
        }
      })
    })
    return final;
  } catch (err) {
    console.log(err)
  }
}

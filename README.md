# Authentication patterns
The Authentication steps use Graphql requests to check the user credentials.
I identify a cookie called `customer` containing an encoded string with user's `firstName`
I would use this data to detect the login and then move forward. At leats for now
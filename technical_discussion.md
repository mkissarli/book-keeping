# Technical discussion

+ I used typescript, as I prefer static types as they allow less testing and make code clearer. I regret it as it made working with mongoose confusing. If I were starting over, this is the number one thing I'd change.
+ I choose to use expressjs, as its simple and standard.
+ Mongodb was chosen as the date given was already in JSON which is natively the idea behind them.
  - NoSQL tends to work well with javascript and is easier to experiment with as there’s no fixed schema.
  - Additional, if the project was to scale up NoSQL, would handle that better again because of this design.
  - Having said that Mongoose and typescript caused me issues, and one big benefit on SQL that isn't spoken about is that its apis are more stable. 
  - One disadvantage I realised too late is that all our data now has two different id's, mongodb's native _id and whatever ones were imported from data.json. Ideally, these would all be made more consistent, but it doesn't affect anything in the code particularly, and keeping old ids around is useful for legacy code.
+ I choose Jest as my test framework simply because it looked the easiest to work with. I find most test frameworks work very similarly anyway, so didn't think on this too much.

+ File structure is as it is because it is a pretty standard way to structure a REST api. If this were a bigger api with more endpoints, I'd also have each resource have its own route file to keep things organised but given the scale of the project I just kept these in app.ts.
+ I have hot loading enabled, although if these were production, I would have different scripts for all that.

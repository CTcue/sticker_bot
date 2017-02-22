# Sticker bot

Sticker pack support for slack


## Contribute

Stickers have their own directory. For better guessing there is a `__mapping__.json`. Each entry should have a filename and some tags. The subject is optional.

```
{
    "subject" : false,  // Person name, to boost score of pictures with said person
    "img"     : ["nice.png"],  // Allow multiple images -> chooses one randomly
    "tags"    : ["nice", "thumbs up", "nice work", "good work", "pluim"]  // Tags to match with a query
}
```



#### Publish it

To put it online:

`git push heroku master`


#### Link it

```
// Login
heroku login

// Add remote link to heroku toolbelt
git remote add heroku git@heroku.com:desolate-citadel-3922.git
```


> Read more [https://dashboard.heroku.com/apps/desolate-citadel-3922/deploy/heroku-git](https://dashboard.heroku.com/apps/desolate-citadel-3922/deploy/heroku-git) (requires login)
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

To put it online:

`git push heroku master`

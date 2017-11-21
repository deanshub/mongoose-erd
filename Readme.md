mongoose-erd
============

This package is for generating an ERD when using mongoose models

## How to use
1. install using ```yarn add mongoose-erd```
2. import the package ```import mongooseErd from 'mongoose-erd'```
3. use either ```mongooseErd.toString(mongoose)``` or ```mongooseErd.toFile(mongoose, FILE_PATH)``` and send your mongoose object

## What does it do
The package generates an er file which can be converted into png\\pdf\\...

after getting the er file use the [ERD tool](https://github.com/BurntSushi/erd) to convert it to whatever you want.

you can even use [atom erd package](https://atom.io/packages/erd)

if you need any help, write me an [issue](https://github.com/deanshub/mongoose-erd/issues)

## Who is the most gever
[Dean Shub](https://github.com/deanshub)

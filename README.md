# api.fri3d.be

## Introduction

The api site is a REST interface to the fri3d datastore that provides data support to several applications:

* fri3d button is a Facbook/Google-like button to indicate interest in a certain topic, e.g. an item on the program,... but any URI can be "liked".

The api site is a Flask-based Python application, prepared to be deployed on e.g. Heroku.

## Create a (local) Mongo instance

```bash
$ mongo
MongoDB shell version v3.4.5
connecting to: mongodb://127.0.0.1:27017
MongoDB server version: 3.4.5
> use admin
switched to db admin
> db.auth("admin", "admin" )
1
> use fri3d
switched to db fri3d
> db.createUser({ user: "fri3d", pwd: "fri3d", roles: [ { role: "readWrite", db: "fri3d" }] } )
Successfully added user: {
	"user" : "fri3d",
	"roles" : [
		{
			"role" : "readWrite",
			"db" : "fri3d"
		}
	]
}
> use fri3d
switched to db fri3d
> db.auth("fri3d", "fri3d")
1
```

## Run the api site 

```bash
$ virtualenv venv
$ . venv/bin/activate
(venv) $ pip install -r requirements.txt
(venv) $ python run.py
```

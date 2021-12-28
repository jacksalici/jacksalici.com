---
title: Notion Cli List Manager.
date: 2021-12-21T22:00:00+00:00
slug: notion-cli-list-manager
summary: A command-line interface to manage Notion databases.
---
![](/uploads/notion-cli.gif)  



[Notion](https://notion.so) is a very nice online tool for "task management, project management, knowledge management" (from Wikipedia), that allows to use databases for basically everything. I made a CLI (command-line interface) for managing those databases. If you want to give it a try:  
```
pip install notion-cli-list-manager
```  
  

You can read more on the [Github repository](https://github.com/jacksalici/notion-cli-list-manager), but basically the syntax is the following:

| Commands:|    | Options:|
|---|---|---|
| `list` | to display all the ___List___ not done yet. | `--db [id] ` to display a specific database. <br> `--all` to display all the lists.
| `list add [title]` | to add a new ___List___ called `title`. |   `[title]` will be the text of the ___List___ (and the title of the associated Notion database page)  <br> `--db [id] ` to add the entry to a specific database. Otherwise, the default database will be used.| 
| `list rm [index]` | to remove the ___List___ with the index `index`.  <br> _(Command to call after `list all`)_| `[index]` has to be formatted either like a range and a list, or a combination of these. E.g.: 3,4,6:10:2 will remove pages 3, 4, 6, 8.
| `list db` | to display all the notion display saved in the manager. | `--label [LABEL] --id [ID]` to add a database to the manager. <br> `--rm [LABEL]` to remove a database named [LABEL] from the manager. Note that adding or removing a database to the manager does not cause the actual creation or deletion on Notion.
| `list set --token [token] --id [database_id]` | to set the token and the ID of the Notion Database you want as default. _This must be executed as the first command_. | You can get the `[token]` as internal api integration [here](https://www.notion.so/my-integrations). <br> You can get the database id from the database url: notion.so/[username]/`[database_id]`?v=[view_id].  | 

Note that the project is not completed yet, so commands could change a bit. 

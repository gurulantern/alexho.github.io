---
title: myStock Mobile Application Database 
date: 2024/4/6
description: Category Three Artifact of the SNHU CS Portfolio
tag: databases, mobile development
author: You
---

[**Portfolio**](/portfolio) | [**Home**](/) | [**About**](/about) | [**Posts**](/posts)

[**Previous: Algorithms & Data Structures**](/portfolio/artifact2) 

---

## Development Narrative

[**Link to Github Repository**](https://github.com/gurulantern/myStock-mobile-app)

For the third artifact, I chose an inventory management mobile application that I developed in CS 360 Mobile Architect and Programming. The goal for this artifact was to produce an application that allows a user to login or register. If they registered, the application would request permission to use SMS to notify them when item quantities reached 0. Upon logging in, the user would be able to see a grid layout of items in their database and could manage these items by adding, deleting, and changing quantity. 

I chose this project to display my versatility in terms of programming. Both of the previous artifacts showcase my ability to learn in different architectures and with different technologies. This enhancement continues this trend by demonstrating my ability to carry over my skills to any development environment. My goal for the enhancement was to add a history feature where users could view the history of actions taken on items in their database and a data visualization feature. Both of these features require more database interaction than the unenhanced artifact.

![myStock Main](/images/myStock_main.jpg)

Upon starting the enhancement, I realized that my previous iteration of the user database needed a major overhaul as it was far from secure. The issue was that the SQLiteOpenHelper would only create one database with the necessary tables on the phone resulting in all users being able to see the same inventory table when logging in. The intention was for each user to have their own inventory table to manage. This meant that I needed to redesign the registration method so that each user had their own individual inventory and history tables.

```java
    public long registerUserDB(String name, String email, String password) {
        SQLiteDatabase db = null;
        try {
            db = this.getWritableDatabase();
            if (db == null) {
                System.err.println("Failed to get writable database");
                return -1; // Indicate failure
            }
            // Generate a unique user id
            long userId = generateUniqueUserId(name);

            // Create a unique InventoryTable for the user
            String inventoryTableName = "inventory_" + name; // Unique name
            createInventoryTable(db, inventoryTableName);

            // Create a unique HistoryTable for the user
            String historyTableName = "history_" + inventoryTableName; // Unique name
            createHistoryTable(db, historyTableName);

            // Insert the user into UserTable
            ContentValues userValues = new ContentValues();
            userValues.put(UserTable.COL_USER_ID, userId);
            userValues.put(UserTable.COL_NAME, name);
            userValues.put(UserTable.COL_EMAIL, email);
            userValues.put(UserTable.COL_PASSWORD, password);
            db.insert(UserTable.TABLE, null, userValues);

            // Insert a mapping between the user and their inventory table
            ContentValues mapValues = new ContentValues();
            mapValues.put(UserInventoryMapTable.COL_USER_ID, userId);
            mapValues.put(UserInventoryMapTable.COL_INVENTORY_TABLE_NAME, inventoryTableName);
            db.insert(UserInventoryMapTable.TABLE, null, mapValues);

            // Return userId
            return userId;
        } finally {
            if (db != null) {
                db.close();
            }
        }
    }
```

To start, I had to adjust my scope for the enhancement as this database helper redesign would take up most of the time. After successfully redesigning the login and registration process, I spent the latter half of my time implementing the foundations for the history activity and data activity, both of which had their own learning curves. 

I enjoyed this part of development the most as I got to learn more about the technologies we could use in Android development. Specifically, I had most of my fun learning a third-party data charting repo that I used called MPAndroidChart. This repo had its own challenges as the documentation is fairly thorough which meant there was a lot more to read and more to try out. In the end, I was able to create database queries that could populate a pie chart with item names and quantities. 

![myStock Main](/images/myStock_pie.jpg)

The history activity took some time to implement as I was spending most of my time making it able to filter for searches but I decided that I would rather focus on making sure that the queries to the database worked and displayed the correct information.  Even though I did not get to implement all of the enhancements intended for this specific feature, this activity works and is a great foundation for further enhancement later on down the line. Currently, it queries the database for all the actions in an inventory table’s history table. It then displays each history item from a list with a name, an action string, and a timestamp.

![myStock Main](/images/myStock_history.jpg)


### Outcomes Achieved

**Develop a security mindset that anticipates adversarial exploits in software architecture and designs to expose potential vulnerabilities, mitigate design flaws, and ensure privacy and enhanced security of data and resources.**

- By realizing my errors in designing the initial artifact, I took steps to make sure that the product delivered on its original promise of allowing users to edit their own inventory table so that future features would not suffer or need reworking. This overhaul included changing the onCreate process to limit table creation to the UserTable and the UserInventoryMapTable so that the application could keep track of user information and the inventory tables that belonged to the users. It also required a reworking of the registration method so that when a user was added, the database helper would also create the user’s corresponding history and inventory tables. 

**Demonstrate an ability to use well-founded and innovative techniques, skills, and tools in computing practices for the purpose of implementing computer solutions that deliver value and accomplish industry-specific goals.**  

- After completing the overhaul, I implemented two features that utilized built-in features of the Android development suite and trusted third-party repos to complete the enhancement. So much work is done by so many talented developers and part of the development process is finding libraries that can help us reach our goals with more speed and efficiency. The trade off for this tactic is that what we gain in speed, we lose in understanding by abstracting these finer grain details to external libraries, which is something we must always keep in mind when developing as it can result in issues later down the line.    

---

[**Previous: Algorithms & Data Structures**](/portfolio/artifact2)

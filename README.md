# Bamazon
B+Amazon

A store front app using node.js and mySql.

## Walkthrough

start the app using
    npm start

This displays the current items in stock with their respective prices. 
User has the option of selecting the item id they would like to purchase.

![Store Front Screen](screenshots/onStartScreenShot.png)

After chosing their desired product, user is told how many is left in stock and then prompted to input quantity.

![Customer Quantity Select](screenshots/quantitySelectScreenShot.png)

Input Validation is in effect. Negative numbers dont work (nice try).

![Customer input validation](screenshots/notEnoughInStockScreenShot.png)

![Customer input validation](screenshots/negNumberScreenShot.png)

![Customer input validation](screenshots/inputValScreenShot.png)

Price is confirmed before purchase is completed.

![Customer price Confirm.](screenshots/priceConfirmScreenShot.png)

after purchase store front is refreshed.

![Customer Purchase Complete](screenshots/purchaseCompleteScreenShot.png)
//Item controller
const ItemCtrl = (function(){
    //Item constructor 
    const Item = function(id, name, calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    //Data structure / state
    const data = {
        items: StorageCtrl.getItemsFromStorage(),
            // {id: 0, name: "Steak Dinner", calories:102},
            // {id: 1, name: "Cookie", calories:37},
            // {id: 2, name: "Ice-cream", calories:18},
        
        
        currentItem: null,
        totalCalories: 0
    }
    //Public methods 
    return {
        getItems: function(){
            return data.items
        },
        addItem: function(name, calories){
            let ID;
            //Generate IDs
            if(data.items.length > 0){
                ID = data.items[data.items.length - 1].id + 1;
            } else {
                ID = 0;
            }

            //Parse calories to number
            calories = parseInt(calories);

            //create new item 
            newItem = new Item(ID, name, calories);

            //Push the new item to the data structure
            data.items.push(newItem);

            return newItem;

        },
        setCurrentItem: function(item){
            data.currentItem = item;
        },
        getCurrentItem: function(){
            return data.currentItem;
        },
        getTotalCalories: function(){
            let total = 0;
            //loop through items and add cals
            data.items.forEach(item => total += item.calories);

            //set total calories in data structure.
            data.totalCalories = total;

            //return total sum
            return data.totalCalories;
        },
        getItemById: function(id){
            let found  = null;

            //loop through  items
            data.items.forEach(item => {
                if(item.id === id){
                    found = item;
                }
            });
            return found;
        },
        updateItem: function(name, calories){
            //Calories to number 
            calories = parseInt(calories);
            let found  = null;

            //loop through  items
            data.items.forEach(item => {
                if(item.id === data.currentItem.id){
                    item.name = name;
                    item.calories = calories;
                    found = item;
                }
            });
            return found;
        },
        deleteItem: function(id){
            const ids = data.items.map(item => item.id);

            //get index
            const index = ids.indexOf(id);

            //remove item
            data.items.splice(index, 1);
        },
        clearAllItems: function(){
            data.items = [];
        },
        logData: function(){
            return data
        }
    }
})();
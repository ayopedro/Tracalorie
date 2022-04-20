//App controller
const App = (function(StorageCtrl, ItemCtrl, UICtrl){
    //Load Event Listeners
    const loadEventListeners = function(){
        //Get UI Selectors
        const UISelectors = UICtrl.getSelectors();

        //Add item Event 
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

        //disable on enter key
        document.addEventListener('keydown', e => {
            if(e.keyCode === 13 || e.which === 13){
                e.preventDefault();
                return false;
            }
        })

        //Edit Icon click
        document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

        //Update item event
        document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateClick);
        
        //Delete item event
        document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteClick);

        //Back item event
        document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);

        //clear all event
        document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllEventClick);
    }

    //Add item submit
    const itemAddSubmit = function(e){
        //get form input from UI controller
        const input = UICtrl.getItemInput();
        //check for name and calorie input 
        if(input.name !== '' && input.calories !== ''){
            //Add item
            const newItem = ItemCtrl.addItem(input.name, input.calories);
            //Add item to UI List
            UICtrl.addListItem(newItem);
            //Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();
            //Add total calories to UI
            UICtrl.showTotalCalories(totalCalories);

            //store in local storage 
            StorageCtrl.storeItem(newItem);

            //clear fields
            UICtrl.clearInput();
        }

        e.preventDefault();
    }
    //Click item to edit 
    const itemEditClick = function(e){
        if(e.target.classList.contains('edit-item')){
            //Get list  item ID
            const listId = e.target.parentNode.parentNode.id;
            //break into array
            const listIdArr = listId.split('-');
            //get actual ID
            const id = parseInt(listIdArr[1]);
            //get item
            const itemToEdit = ItemCtrl.getItemById(id);
            //set current item
            ItemCtrl.setCurrentItem(itemToEdit);
            //Add item to form
            UICtrl.addItemToForm();
        }


        e.preventDefault();
    }
    //click item to update
    const itemUpdateClick = function(e){
        //get item input 
        const input = UICtrl.getItemInput();

        //update item
        const updatedItem =ItemCtrl.updateItem(input.name, input.calories);

        //Update the UI
        UICtrl.updateListItem(updatedItem);
        //Get total calories
        const totalCalories = ItemCtrl.getTotalCalories();
        //Add total calories to UI
        UICtrl.showTotalCalories(totalCalories);

        //Update Local Storage
        StorageCtrl.updateItemStorage(updatedItem);

        //Clear fields
        UICtrl.clearEditState();

        e.preventDefault();
    }

    //click item to delete
    const itemDeleteClick = function(e){
        const currentItem = ItemCtrl.getCurrentItem();

        //delete from data structure
        ItemCtrl.deleteItem(currentItem.id);

        //delete from UI
        UICtrl.deleteListItem(currentItem.id);

        //Get total calories
        const totalCalories = ItemCtrl.getTotalCalories();
        //Add total calories to UI
        UICtrl.showTotalCalories(totalCalories);

        //delete from local storage
        StorageCtrl.deleteItemFromStorage(currentItem.id);

        //Clear fields
        UICtrl.clearEditState();
        e.preventDefault();
    }

    //click to clear all enteries 
    const clearAllEventClick = function(e){
        //delete all items from data structure 
        ItemCtrl.clearAllItems();
        //Get total calories
        const totalCalories = ItemCtrl.getTotalCalories();
        //Add total calories to UI
        UICtrl.showTotalCalories(totalCalories);
        //delete from UI
        UICtrl.removeItems();
        //delete from LS
        StorageCtrl.clearItemsFromStorage();

        //hide UL
        UICtrl.hideList();
        

        e.preventDefault();
    }


    //Public methods 
    return {
        init: function(){
            console.log('Initializing App...');
            //Set initial state
            UICtrl.clearEditState();
            //Fetch Items from data structure.
            const items = ItemCtrl.getItems();
            //check if any items 
            if(items.length === 0){
                //hide the list section
                UICtrl.hideList();
            } else{
                
                //Populate lists with items
                UICtrl.populateItemList(items);
            }
            //Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();
            //Add total calories to UI
            UICtrl.showTotalCalories(totalCalories);
           

            //load event listeners
            loadEventListeners();
        }
    }
})(StorageCtrl, ItemCtrl,  UICtrl);

App.init();
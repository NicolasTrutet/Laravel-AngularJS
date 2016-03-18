/**
* [directives.js]
*
*/



/*************************************************************************
* Directive [addbutton] and [addrow] are used to add and remove
* rows from the newliste.html page. 
*
*/


/* Add and remove rows from the DOM */
app.directive("addbutton", function() 
{
    return {
		restrict: "E",
		template: "<ul class='book-form'><li><button addrow data='1' id='1' class='add-btn' ></button></li><li><input id='nomObject' type='text' class='form-control' placeholder='Object name' ng-model='inputGroup.object_1.ListeNom'></li><li><input id='descriptionObject' type='text' class='form-control' placeholder='Description' ng-model='inputGroup.object_1.ListeDescription'></li></ul>"
	}
});






/*
* Add or remove one row from the DOM
* and increment/decrement 'row', 'id'.
*/
app.directive("addrow", function($compile)
{
	return function(scope, element, attrs)
    {
		element.bind("click", function(obj)
        {
            
			var value = obj.target.attributes.data.value;
            
			if (value == scope.count) 
            {
                
				//Change the round icon + for -
				angular.element($('#'+scope.count)).css({"background":"url(resources/images/removex24.png) no-repeat"});
				
                //Increment id and the number of rows displayed in the view.
				scope.count++;
				scope.N_elements++;
				
                //Add a row.
				angular.element($('#new-row')).append($compile("<ul class='book-form'><li><button addrow data="+scope.count+" id='"+scope.count+"' class='add-btn'></button></li><li><input id='nomObject' type='text' class='form-control' placeholder='Object name' ng-model='inputGroup.object_"+scope.count+".ListeNom'></li><li><input id='descriptionObject' type='text' class='form-control' placeholder='Description' ng-model='inputGroup.object_"+scope.count+".ListeDescription'></li></ul></ul>")(scope));				
				

				scope.numberOfElement = scope.N_elements;	                
				
                //Add a new object
                var object = "object_" + scope.count;
                scope.inputGroup[object] = {"ListeNom": "", "ListeDescription":""};
                
            
            } else {
                
				scope.N_elements--;
				
                //Remove a row from the DOM
				angular.element($('#'+value)).parent().parent().remove();
				
                
				scope.numberOfElement = scope.N_elements;	
				scope.$apply();				
                
                //remove an object from scope.inputGroup
                var propertyID = "object_" + value;
                delete scope.inputGroup[propertyID];
			}	
		});
	};
});

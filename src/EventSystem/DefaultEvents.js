// Default Events Available for All Areas
var checkCurrentStatus = new Event("Check your current status", 
								   checkStatus, 
								   player, 
								   false, 
								   {}
								  );
var useItemInField = new Event("Use an item", 
							   useItemInField, 
							   player, 
							   false, 
					   		   {}
							  );

var leaveArea = new Event("Leave the area", 
						  leaveTheArea, 
						  "", 
						  false, 
					   	  {}
					     );

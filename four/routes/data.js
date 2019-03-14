var express = require('express');
var mysql = require('mysql');
var router = express.Router();


router.get('/technographics', function(req, res, next) {
    const connection = mysql.createConnection({
        user: 'root',
        password: 'space bar',
        database: 'new_schema'
    });
    var data; 
    connection.connect(function(err) {
        if (err) { console.log(err); }
        connection.query('SELECT * FROM cookie;', [], function (err, results) {
                if (err) { console.log(err); } 
                dt = results; 

		





		res.render('technographics', {data: dt});



        });
    });
});

router.get('/errors', function(req, res, next) {                           
    const connection = mysql.createConnection({                                    
        user: 'root',                                                              
        password: 'space bar',                                                     
        database: 'new_schema'                                                      
    });                                                                            
    var data;                                                                      
    connection.connect(function(err) {                                             
        if (err) { console.log(err); }                                             
        connection.query('SELECT * FROM error;', [], function (err, results) {                         
                if (err) { console.log(err); }                                     
                data = results;         
		
		
	 	// parse data                                                                  
                var dr = {                                                          
                        refErr: 0,                                                  
                        typErr: 0,                                                  
                        uriErr: 0,                                                  
                        synErr: 0,                                                  
                        rngErr: 0,                                                           
                        evlErr: 0                                                   
                } 

		
   	 	for (var i = 0; i < data.length; i++) {                                  
   	 		var type = data[i].errorMessage;
			var n = type.indexOf(':');	
			type = type.substring(0, n != -1 ? n : type.length);

			
			if(type == "ReferenceError"){
				dr.refErr = dr.refErr + 1;
			}
			else if( type == "Uncaught EvalError"){
				dr.evlErr = dr.evlErr + 1;
			}
			else if( type == "Uncaught RangeError"){                    
                                dr.rngErr = dr.rngErr + 1;                         
                        }
			else if( type == "Uncaught SyntaxError"){
                                dr.synErr = dr.synErr + 1;
                        }
			else if( type == "Uncaught TypeError"){
                                dr.typErr = dr.typErr + 1;
                        }
			else if( type == "Uncaught URIError"){
                                dr.uriErr = dr.uriErr + 1;
                        }


    		} 

		res.render('errors', {data: dr});
        });                                                                        
    });                                                                                                            
});


/*
router.get('/errors', function(req, res, next) {
    const connection = mysql.createConnection({
        user: 'root',
        password: 'space bar',
        database: 'collector'
    });
    var data;
     
    connection.connect(function(err) {
        if (err) { console.log(err); }
        connection.query('SELECT img1 FROM random_load;', [], function (err, results) {
       		if (err) {                                                 
                                console.log(err);                                  
                                return res.status(500).send({                      
                                        message: 'Database read failed.'           
                                });                                                
                        }
		data = results;
		res.render('errors', data);
			
	}); 
    });

    // parse data
    // var dr = { 
    //     refErr: {count:0}, 
    //     typErr: {count:0}, 
    //     uriErr: {count:0}, 
    //     synErr: {count:0}, 
    //     rngErr: {count:0}, 
    //     evlErr: {count:0}
    // }
    // for (var i = 0; i < data.length; i++) {
    //     var type = data[i].errorMessage;
    //     console.log(type);
    // }

    /*
    res.render('errors', data);
    */
//});




router.get('/performance', function(req, res, next) {
    res.render('performance');
});

module.exports = router;

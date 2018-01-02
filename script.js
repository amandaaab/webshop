$(document).ready(function(){

    var users;

       //Hämtar users.json och sparar i en variabel (users)
       fetch("json/kunder.json")
       .then(function(response) {
           return response.json();
       })
       .then(function(ourUsers) {
           users = ourUsers;
       });

       $(".loggaUt").hide();
   //       INLOGGNING
       if(sessionStorage.saveUser != null ){
        thisUserIsLoggedIn();
        }else{
    
            $(".buttonForm").click(function(){
            for(var i = 0; i < users.length; i++){
                
                if( $(".mailForm").val() == users[i].email && $(".passwordForm").val() == users[i].password){
    
                    thisUserIsLoggedIn();
                    sessionStorage.saveUser = users[i].email;
                    console.log("heeeej");
                    }else{
                        console.log("glömt ditt lösenord");
                    }
                }
            })
        }
//          Utloggning
        $(".loggaUt").click(function(){
            sessionStorage.removeItem("saveUser");
            location.reload();
        });




 //         Funktioner
        function thisUserIsLoggedIn(){
            $(".loginform").hide();
            $(".loggaIn").hide();
            $(".bliMedlem").hide();
            $(".loggaUt").show();
        }

      
        

});
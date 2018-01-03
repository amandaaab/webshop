$(document).ready(function(){

    var users;
    var huvudkategori;
    var kategori;
    var produkt;
   

       //Hämtar users.json och sparar i en variabel (users)
       fetch("json/kunder.json")
       .then(function(response) {
           return response.json();
           
       })
       .then(function(ourUsers) {
           users = ourUsers;
           console.log(users);
           
           
       });

       fetch("json/huvudkategorier.json")
       .then(function(response) {
           return response.json();
       })
   
       .then(function(huvud) {
           huvudkategori = huvud;
          
           
    });


    fetch("json/underkategorier.json")
    .then(function(response) {
        return response.json();           
    })
     .then(function(under) {
        kategori = under;

       

    });

    fetch("json/produkter.json")
    .then(function(response) {
        return response.json();           
    })
     .then(function(item) {
        produkt = item;
        console.log(produkt);
        allScriptCode();
    });
    

    function allScriptCode(){

        loopHuvudKategori();
        loopUnderkategori();
        
        console.log(huvudkategori);
        console.log(kategori);
        console.log(users);
        console.log("hej:" + produkt);

        //Lopar och skriver ut huvudkategorierna
        function loopHuvudKategori(){
        
            for(var i = 0; i < huvudkategori.length; i++){
                $(".mainmeny").append("<div class='headitem'><a href='#' onclick='visaVarde("+ huvudkategori[i].id +")'>" + huvudkategori[i].room + "<i class='fa fa-angle-down' aria-hidden='true'></i></a></div>");
            }

        }

        //Lopar och skriver ut underkategorierna
        function loopUnderkategori(){
            visaVarde = function(val){
                
                console.log ("hejsan" + val);
                var visaKategori = val;

                $(".dropdownmenu").html(" ");

                for(i = 0; i < kategori.length; i++) {
                    if (kategori[i].huvudkategori == visaKategori){
                        $(".dropdownmenu").append("<li>" + kategori[i].underkategori + "</li>")
                    }

                    $(".underKategori").show();
                    $(".dropdownmenu").show();

                }

            }

        }

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
   

    }

});
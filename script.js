$(document).ready(function(){
    
        var users;
        var huvudkategori;
        var kategori;
        var produkt;
        var shoppingCart = [];
       
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
            loopProdukter();
            loopSpecProdukt();
            
            //                                    FÖRSTASIDAN
           

            $(".main1").show();
            $(".homebox1").show();
            $(".homebox2").show();

            console.log(huvudkategori);
            console.log(kategori);
            console.log(users);
    
            //                               HUVUDKATEGORIERNA
            function loopHuvudKategori(){
            //$(".main1").html(" ");
        

                for(var i = 0; i < huvudkategori.length; i++){
                   
                    $(".mainmeny").append("<div class='headitem'><a href='#' onclick='visaVarde("+ huvudkategori[i].id +")'>" + huvudkategori[i].room + "<i class='fa fa-angle-down' aria-hidden='true'></i></a></div>");
                    

                   $(".cart").click(function(){
                    $(".cardInCart").html(" ");

                    addToCart();

                    });
                    
                  
                }
    
            }
    
            //                            UNDERKATEGORIERNA
            function loopUnderkategori(){
                visaVarde = function(val){
                    console.log ("hejsan" + val);
    
                    $(".dropdownmenu").html(" ");
                    $(".main1").html(" ");
    
                    for(i = 0; i < kategori.length; i++) {
                        if (kategori[i].huvudkategori == val){
                            $(".dropdownmenu").append("<li><a href='#' onclick='visaVardeProdukt("+ kategori[i].id +")'>" + kategori[i].underkategori + "</li>")
                        }
                            $(".underKategori").show();
                            $(".dropdownmenu").show();
                    }
                }
           }
              
            //                                PRODUKTERNA
           function loopProdukter(){
    
                visaVardeProdukt = function(val){
                    console.log ("hej" + val);
    
                    $(".main1").html(" ");
                    $(".produktItem").html(" ");

    
                    for(var i = 0; i < produkt.length; i++){
                        if (produkt[i].underkategori == val){
                           
                        $(".main1").append("<div class='produktItem' onclick='visaSpecProdukt("+ produkt[i].id +")'><img src='./img/sovrum/" + produkt[i].image + "'>" + "<div class='prisTitle'>" + "<h3>" +  produkt[i].prodName + "</h3>" + "<h3>" + produkt[i].prodPrice + "kr" + "<h3>" + "</div>" + "</div>");
                        }
                    }
                }
            }
    
            //                             SPECIFIK PRODUKTSIDA
           function loopSpecProdukt(){
                visaSpecProdukt = function(val){
                    console.log(val);
              $(".main1").html(" ");
                    var spec = val;
    
                   

                    for(var i = 0; i < produkt.length; i++){
                        if(produkt[i].id == spec){

                            var imgProdCard = "<div class='imgProdCard'>" + "<img src='./img/sovrum/" + produkt[i].image + "'>" + "</div>";
                            var infoH2 = "<h2>" + produkt[i].prodName + "</h2>"; 
                            var infoP = "<p>" + produkt[i].prodDesc + "</p>";
                            var infoPrice = "<h3>" + produkt[i].prodPrice + "kr" + "</h3>";
                            var ProdToCart = "<button class='prodToCart'onClick='pushToCart(" + produkt[i].id + ")'>" + "LÄGG TILL I VARUKORG" + "</div>";
                            var textProdCard = "<div class='textProdCard'>" + infoH2 + infoP + infoPrice + ProdToCart + "</div>";
                            
                            $(".main1").append(imgProdCard + textProdCard);

                            
                            //console.log("produkt" + produkt);
                        }
                    }
                }
            }
    
            //                            VARUKORG
    
            pushToCart = function(val){

                var cart = produkt[val-1];  
                shoppingCart.push(cart);
               
                console.log(cart);
        
            }
                
          
               
            addToCart = function(){

                $(".main1").html(" ");
                $(".main1").append("<h2>Varukorg</h2>");
            
                   var json_str = JSON.stringify(shoppingCart);
                   localStorage.shopping = json_str;
                   var loopItemCart = JSON.parse(localStorage.shopping);

    
                for(var i = 0; i < loopItemCart.length; i++){

                    var imgCartCard = "<div class='imgCartCard'>" + "<img src='./img/sovrum/" + loopItemCart[i].image + "'>" + "</div>";
                    var cartCardTitle = "<h2 class='cartName'>" + loopItemCart[i].prodName + "</h2>";
                    var priceCard = "<h2 class='cartName'>" + loopItemCart[i].prodPrice + "kr</h2>";
                    var cardInCart = "<div class='cardInCart'>" + imgCartCard + cartCardTitle + priceCard + "</div>";

                $(".main1").append(cardInCart);
                console.log(shoppingCart);
                //console.log(loopItemCart);
                
                }
            }

        
            //                              LOGGA IN/UT
    
    
            $(".loggaUt").hide();
            $(".loginform").hide();
    
            $(".loggaIn").click(function(){
            $(".homebox1").hide();
            $(".homebox2").hide();
              
            $(".loginform").show();
    
            });
    
                //                                     INLOGGNING
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
                       });
                   }
       
               //                                        Utloggning
                $(".loggaUt").click(function(){
                       sessionStorage.clear();
                       location.reload();
                    
                
                });
    
            function thisUserIsLoggedIn(){
               
                $(".loginform").hide();
                $(".loggaIn").hide();
                $(".bliMedlem").hide();
                $(".loggaUt").show();
            }
       
    
        }
    
    });
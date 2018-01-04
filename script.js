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
        loopProdukter();
        loopSpecProdukt();
        $(".produktWrap").hide();
        
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
                        $(".dropdownmenu").append("<li><a href='#' onclick='visaVardeProdukt("+ kategori[i].id +")'>" + kategori[i].underkategori + "</li>")
                    }
                        $(".underKategori").show();
                        $(".dropdownmenu").show();

                }

            }
        }

        function loopProdukter(){

            visaVardeProdukt = function(val){
                var visaProdukt = val;
                console.log ("hej" + val);

                $(".produktItem").html(" ");

                for(var i = 0; i < produkt.length; i++){
                    if (produkt[i].underkategori == visaProdukt){
                        $(".homebox1").hide();
                        $(".homebox2").hide();
                        $(".produktWrap").append("<div class='produktItem' onclick='visaSpecProdukt("+ produkt[i].id +")'><img src='/img/sovrum/" + produkt[i].image + "'>" +  produkt[i].prodName + produkt[i].prodPrice + "</div>");
                        $(".produktwrap").show();
                    }
                    $(".produkterKategori").show();
                    $(".produkter").show();

                }
            }
        }

        function loopSpecProdukt(){
            visaSpecProdukt = function(val){
                var visaSpec = val;
                console.log("spec:" + val);

                //$(".").html()
                for(var i = 0; i < produkt.length; i++){
                    if(produkt[i].id == visaSpec){
                        var imgProdCard = "<div class='imgProdCard'>" + "<img src='/img/sovrum/" + produkt[i].image + "'>" + "</div>";
                        var infoH2 = "<h2>" + produkt[i].prodName + "</h2>"; 
                        var infoP = "<p>" + produkt[i].prodDesc + "</p>";
                        var ProdToCart = "<button class='prodToCart'>" + "Lägg till i varukorg" + "</div>";
                        var textProdCard = "<div class='textProdcard'>" + infoH2 + infoP + ProdToCart + "</div>";

                        $(".produktItem").hide();
                        $(".produktWrap").hide();
                        $(".specWrap").append(imgProdCard + textProdCard);
                        $(".specWrap").show();
                    }
                    $(".produkterKategori").hide();
                    $(".produkter").hide();
                }
            }
        }





        $(".loggaUt").hide();
        $(".loginForm").hide();

        $(".loggaIn").click(function(){

            $(".homebox1").hide();
            $(".homebox2").hide();
            $(".loginForm").show();


        });


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
                   sessionStorage.clear();
                   location.reload();
                   $(".main1").show();
            
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
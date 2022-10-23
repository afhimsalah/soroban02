$(document).ready(function() {
      var num,spd,dig,clr,gen,rand,i,res,msg,answer,interval,keyCode,lang;
      function randomize(max) {
        rand = Math.random();
        while (rand < max) {
          rand = Math.random();
        }
        return rand;
      }
      function check() {
        answer = $("#bd").find("input").val();
        if (res == answer) {
            msg = "<p class='text-success'>Good answer</p>"+res;
            if (lang == "fr") {
              msg = "<p class='text-success'>Réponse correcte</p>"+res;
            }
            if (lang == "ar") {
              msg = "<p class='text-success'>الجواب صحيح</p>"+res;
            }
        } else {
            msg = "<p class='text-danger'>Sorry, the correct answer is</p>"+res;
            if (lang == "fr") {
              msg = "<p class='text-danger'>Désolé, la réponse correcte est</p>"+res;
            }
            if (lang == "ar") {
              msg = "<p class='text-danger'>آسف، الجواب الصحيح هو</p>"+res;
            }
        }
        $("#bd").html("<div class='h1 font-weight-bold animated zoomIn'>"+msg+"</div>");
        setTimeout(function(){
          $(".d-none").removeClass("d-none");
          $("#bd").html("");
        },2000);
      }
      function stopNumbers() {
        clearInterval(interval);
        setTimeout(function(){
          chk = "check";
          if (lang == "fr") {
            chk = "vérifier";
          }
          if (lang == "ar") {
            chk = "تحقق";
          }
          $("#bd").html("<div class='input-group w-75 mx-auto' dir='rtl'><div class='input-group-append'><button class='btn btn-lg btn-outline-dark rounded-0 bg-transparent border-left-0'>"+chk+"</button></div><input type='number' class='form-control text-center rounded-0 border-dark bg-transparent' style='box-shadow:none'></div>");
          $("#bd").find("input").focus().prev().on("click", "button", function(event){
            check();
          });
          $("#bd").find("input").on("keyup", function(event){
            var keyCode = (event.keyCode ? event.keyCode : event.which);
            if (keyCode == 13) {
              check();
            }
          });
        },spd);
      }
      function playNumbers() {
        i = 0;
        res = 0;
        interval = setInterval(function(){
          gen = Math.floor(randomize(0.1) * Math.pow(10,dig));
          $("#beep").get(0).play();
          clr = "dark";
          if (i % 2 == 0) {
            clr = "primary";
          }
          stp = "stop";
          if (lang == "ar") {
            stp = "توقف";
          }
          $("#bd").html("<div class='text-"+clr+"' id='gen'>"+gen+"</div><div><button type='button' class='btn btn-outline-dark rounded-0 px-5' style='box-shadow:none'>"+stp+"</button></div>");
          res += gen;
          i++;
          $("#bd").on("click", "button", function(){stopNumbers();});
          if (i == num) {
            stopNumbers();
          }
        },spd);
      }
      $("#start").on("click", function(){
        $("#bd").html("");
        dig = Number($("#dig").val());
        num = Number($("#num").val());
        spd = Number($("#spd").val());
        $("#row").children().addClass("d-none");
        $("#bd").removeClass("d-none");
        playNumbers();
      });
      $(".btn-group").on("click", "button", function(){
        lang = $(this).attr("id");
        $(this).addClass("active").siblings().removeClass("active");
        if (lang == 'ar') {
          $("label:first").text("عدد اﻷرقام");
          $("label:eq(1)").text("عدد اﻷعداد");
          $("label:last").text("التوقيت");
          $("button:last").text("أبدأ");
        }
        if (lang == 'fr') {
          $("label:first").text("Chiffres");
          $("label:eq(1)").text("Nombres");
          $("label:last").text("Millisecondes");
          $("button:last").text("Commencer");
        }
        if (lang == 'en') {
          $("label:first").text("Digits");
          $("label:eq(1)").text("Numbers");
          $("label:last").text("Milliseconds");
          $("button:last").text("Start");
        }
      });
});

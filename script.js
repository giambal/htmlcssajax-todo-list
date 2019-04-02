

function clearCard() {
  var cardList=$(".card");
  cardList.remove();
}


// ---- FUNZIONE PER VISUALIZZARE LE CARDS ----


function loadCard() {

  clearCard();

  $.ajax({

    url: "http://157.230.17.132:3002/todos/",
    method:"GET",
    success: function (inData,state) {

      var container=$(".cards-container");
      var template=$("#card-template").html();
      var compiled=Handlebars.compile(template);

      for (var i = 0; i < inData.length; i++) {

        var cardData=inData[i];
        var text=cardData.text;
        var id=cardData.id;

        var tempData={

          id:id,
          testo:text

        };

        var card=compiled(tempData);
        container.append(card);

      }


    },
    error:function () {

    }

  });
}


// ---- FUNZIONE PER ELIMINARE LA CARD ----


function deleteCard() {

  var me=$(this);
  var cardId= me.siblings(".data-id");
  var id=cardId.text();

  $.ajax({

    url: "http://157.230.17.132:3002/todos/"+id,
    method:"DELETE",
    success: function (inData,state) {


      loadCard();
    },
    error: function () {

    }

  });

}



// ---- FUNZIONE PER CREARE NUOVE CARDS ----

function createCard() {

  $.ajax({

    url: "http://157.230.17.132:3002/todos/",
    method:"POST",
    success: function (inData,state) {


      var input=$("#usr-input");

      var tempData={

        id:inData.id+1,
        testo:input.val()

      };

      var container=$(".cards-container");
      var template=$("#card-template").html();
      var compiled=Handlebars.compile(template);
      var card=compiled(tempData);
      container.append(card);


      loadCard();
    },
    error: function () {

    }

  });
}



function clearTextECreate(e){
  var me=$(this);

  var keyPressed=e.which;

  if (keyPressed==13) {

    createCard();

    me.val("");
  }
}




function init() {

  var btn=$("#btn-load");
  btn.click(loadCard);

  $(document).on("click" , ".del" , deleteCard);

  var input=$("#usr-input");
  input.keyup(clearTextECreate);
}

$(document).ready(init);

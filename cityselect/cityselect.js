(function($){
  $(document).ready(function(){
   $('.city-select').each(function(){
      citySel($(this));
   });
  });
  
  var citySel = function(o){
      var cityrow = $('.city-row', o);
      var cityname = $('.city-name', o);
      var cityphones = $('.city-phones', o);
      var citypopup = $('.city-popup', o);
      if(!$.cookie('cityselect_noask')) citypopup.find('.city-popup-inner').append('<div class="city-noask">В списке нет моего города</div>');
      var citylist = $('ul.city-list', o);
      var citynoask = $('.city-noask', o);

      citypopup.hide();
      /*
      $.each(Drupal.settings.citylist, function( key, value ){
        var addclass =  Drupal.settings.citylist[key].name == getlocation() ? 'selected':'';
        if(Drupal.settings.citylist[key].name!='' && Drupal.settings.citylist[key].name!='null') citylist.append('<li class="'+addclass+'">'+Drupal.settings.citylist[key].name+'</li>');
      });
    */
      $.each(citylist.find('li'), function( key, value ){
        var cityname = $(this).text();
        var addclass =  Drupal.settings.citylist[cityname].name == getlocation() ? 'selected':'';
        citylist.find('li:eq('+key+')').addClass(addclass);
      });
    
      $("li", citylist).click(function(){
        if($(this).text() == getlocation()) {
          closePopup();
          return false;
        }
        $("li", citylist).removeClass('selected');
        $(this).addClass('selected');
        citynoask.trigger('click');
        setcookie('cityselect', $(this).text());
        setlocation($(this).text());
        closePopup();
        document.location.reload();
        return false;
      });
  
    function setcookie(cookiename, city){
      var $expiration = new Date();
      var minutes = 24*60*30;
      $expiration.setTime($expiration.getTime() + (minutes * 60 * 1000));
      $.cookie(cookiename, city, { expires: $expiration, path: '/'});
    }
    
    function  closePopup(){
      citypopup.hide();
    }
    
    function openPopup(){
      citypopup.show();
    }

    function getlocation(){
      return $('.city-name.has-city span').length ? $('.city-name.has-city span').text() : 'null';
    }
    
     function setlocation(city){
      var phones = Drupal.settings.citylist[city] ? Drupal.settings.citylist[city].phones : Drupal.settings.citydefault.phones;
      if(city=='' || city=='null'){
        cityrow.html('<span class="city-name"><span>Выберите город</span></span>');
      } else {
        cityrow.html('Ваш город:&nbsp;<span class="city-name has-city"><span>'+city+'</span></span>');
      }
      var phoneClass = phones.charAt(0) == '+' ? 'plus7' : '';
      cityphones.html('<span class="'+phoneClass+'">'+phones+'</span>'); 
    }

    citynoask.click(function(){
      closePopup();
      setcookie('cityselect_noask', 1);
      $('.city-noask', o).remove();
    });

    cityname.find(' >span').click(function(){
      citypopup.toggle();
    });

    cityname.mouseleave(function(){
      if($.cookie('cityselect_noask')) closePopup();
    });
    
    var curcity = getlocation();
    if(curcity!='' && curcity!='null'){
      setcookie('cityselect', curcity);
    } else 
    if(!$.cookie('cityselect_noask')){
      cityname.find(' >span').trigger('click');
    }

  }
  
})(jQuery);
  
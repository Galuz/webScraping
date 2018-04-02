var casper = require('casper').create();
var utils = require('utils');
var x = require('casper').selectXPath;

casper.start('https://www.lobstersnowboards.com/shop/halldor-pro-model--460');
casper.viewport(1200,800);
//click button to select a country
casper.then(function(){
  casper.click(x('//*[@id="country_language_form"]/ul/li[1]/div/button'));
});
//selecting united states
casper.then(function(){
  casper.click(x('//*[@id="country_language_form"]/ul/li[1]/div/div/ul/li[31]/a'));
});
//getting a screenshot after selection
casper.wait(3000,function(){
  casper.capture("after2.jpeg",{top:0,left:0,width:1400,height:900});
});
//getting all information required
casper.then(function(){
  var results = casper.evaluate(function(){
    var image = $('.main-view .img-responsive').attr('src');
    var name = $('.product-title').text();
    var price = $('.product_price h2').text();
    var size = $('.product_colors ul>li>a>span').text();

    return  [name,"\n",image,"\n",price,"\n",size];
  });
  casper.echo(this.getCurrentUrl());
  casper.echo(results);
});

casper.run();

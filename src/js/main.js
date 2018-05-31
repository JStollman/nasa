 var apod = {
//apod = astronomy picture of the day

    randomDate: function(start, end){
        var date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        
        var d = date.getDate();
        var m = date.getMonth() + 1;
        var y = date.getFullYear();

        if(m < 10){
            m ='0'+m;
        }

        if(d<10){
            d = +d;

        }

        return y + '-' + m + '-' + d;
    },

buildDom: function(result){

    $('#apodTitle').text(result.title);

    if(result.media_type === 'video'){
        $('#apodImg').hide();
        $('#apodVideo > iframe').attr('src' , result.url).show();
    }else{
        $('#apodVideo').hide();    
        $('#apodImg')
            .attr('src',result.url)
            .attr('alt', result.title)
            .show();
    }


    $('#apodCopyright').text('Copyright: ' + result.copyright)     
    $('#apodDate').text('Date: ' + result.date)
    $('#apodDest').text(result.explanation);
    
},

getRequest: function(){
    
    var date = this.randomDate(new Date(1995, 5, 16), new Date());
    var that = this;
    var nasaKey = 'N9I5L8HjYqChYp4VtLvJ3OInAnNM7QNtp5F1ZbRk';
    var url = 'https://api.nasa.gov/planetary/apod?api_key=';
    
     $.ajax({
         url: url + nasaKey + '&date=' + date
     }).done(function(result){
         that.buildDom(result);

     }).fail(function(result){;
         console.log(result);
     });

},

    init: function(){
        this.getRequest();
    }
};

apod.init();

$('#randBtn').on('click', function(){
    apod.getRequest();
});
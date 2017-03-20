function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}

$(function() {
    $("form").on("submit", function(e) {
       e.preventDefault();
       // prepare the request
       var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            q: encodeURIComponent($("#search").val()).replace(),
            maxResults: 3,
            order: "viewCount",
            publishedAfter: "2015-01-01T00:00:00Z"
       }); 
       // execute the request
       request.execute(function(response) {
        var results = response.result;
         $("#results").html("");
        $.each(results.items, function(index, item) {
            $.get("tpl/item.html", function(data) {
               $("#results").append(tplawesome(data, [{"title":item.snippet.title, "videoid":item.id.videoId}]));
           });
       //  consule.log(response);
          });
         resetVideoHeight();
       });
    });
    
    $(window).on("resize", resetVideoHeight);
});

function resetVideoHeight() {
    $(".video").css("height", $("#results").width() * 9/16);
}

function init() {
    gapi.client.setApiKey("AIzaSyBqpoYrLMYHr6ZEVgmKYU0MW7Q4vGQ31sU");
    gapi.client.load("youtube", "v3", function() {
        // api is ready
    });
}

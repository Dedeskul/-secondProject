var API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjMwMGZmYzBmMzhjY2NkMmE1OWEyODk1ZDBhMzIzYWRlY2VkOWY4OWI1ZDQ0Mjc1YWIxZWMyZjZjMWFjZTA3Yjg4ZDI2OWQwM2I4ODNmZTUwIn0.eyJhdWQiOiIxMCIsImp0aSI6IjMwMGZmYzBmMzhjY2NkMmE1OWEyODk1ZDBhMzIzYWRlY2VkOWY4OWI1ZDQ0Mjc1YWIxZWMyZjZjMWFjZTA3Yjg4ZDI2OWQwM2I4ODNmZTUwIiwiaWF0IjoxNTczOTI1MzEwLCJuYmYiOjE1NzM5MjUzMTAsImV4cCI6MTg4OTU0NDUxMCwic3ViIjoiMTk1NiIsInNjb3BlcyI6WyJ1c2VyQmFzZUluZm8iLCJ1c2VyRGV0YWlsZWRJbmZvIiwidXNlckNvdXJzZUluZm8iXX0.gGfrH8rhaDHWIY3vKSRpncATnf2pE7U7FWQGwG6zpkF5KLec7qyPV2HfHavcdVJKejiVGFLy6CmcRXwDseKNWYlHX1yGRnlNV6muLeZDe3CZaKS92mJ670yiwt8v6AUG_oQJXgmVnsHgXseB8-4xlM2vJd-EtSaHHRLSqImceDA2MxgrIp6buiGXIMBiKuHDuult_n-SEq8ldowT-I2xMS-Vc1vuwa7cVki0210-b0gZSuWvTR1NABisvQPrQL1MQFUUBisQaInYW5h-G5mmpqvRajzJcWQXzvoer_G6ZK-DVaN6WvyMxJf73_PzhiNy0v5B3DrERgQa0MQ4-8nQn_LEYu5J2GpBQ3lycbvzFv9nfOJR2ro1vBVEn-7Tv6K6npY8m2UKkAre2lYuRTj9q_uSXihxWSgrnW5KNd38Ync0NRUYhoBlNKhkbT2Ov0-8Mcufq_FiiIxDrYgNLNmeA0qMakjT9-fxauLUWGy6xHKHIPecrNhQ7hBbuPLGBF9JRHUsavl_OCusud8Kqyf2XaEMgrBxJ7yhfJNEGT4GS85V86g9lraMgfR3rUiWIETgqjvYufNTzxy8aMEm8Muh2CmNODGJV6_MII25xfDgh4-R1vrZc_karULt9ASAl4m8nX5nRhDZfwkJKVVHxI3HaXicT9YXIFDAiAqXLk6wOiA';
var client = new INTITAClient({
    key: API_KEY,
});
client.getUserDetails(function (error, data) {
    console.log(data);
    
    var nameEl = document.getElementById("name");
    nameEl.innerHTML = data.secondName + " " + data.firstName;

    document.getElementById('avatar').src = data.avatar;
    document.getElementById('address').innerHTML = data.country + ", " + data.city + "," + data.address;
    document.getElementById('email').innerHTML = data.email;
    document.getElementById('phone').innerHTML = data.phone;
    document.getElementById('skype').innerHTML = data.skype;
    document.getElementById('education').innerHTML = data.education;
    document.getElementById('interests').innerHTML = data.interests;
    document.getElementById('trainer').innerHTML = data.trainers[0].firstName+" "+data.trainers[0].secondName+"<br>"+data.trainers[0].email;
});

client.getUserCoursesAndModules(function (error, data) {
    console.log(error, data);
  
    document.getElementById('courses').innerText = data.courses[0].title;
    data.courses.forEach(function (element) {
  
  //------------------<getCourseModules>-------------------
  
          client.getCourseModules(element.id,function (error,modules) {
                  modules.forEach(function (module) {
                      console.log(modules);
                      var modules = document.getElementById("modules");
                  
                    var div = document.createElement("div");
                      div.innerText = module.title;
                      modules.appendChild(div);
                      var ul_ = document.createElement("ul");
                      div.appendChild(ul_);
  
  //-------------------<getModuleLectures>-------------------------------------
  
                      client.getModuleLectures(module.id,function (error,occupations) {
                          occupations.forEach(function (occupation) {
                              var li_ = document.createElement("li");
                              li_.innerText = occupation.title;
                              ul_.appendChild(li_);
  
                          });
                      });
  
                      div.onclick=function(){
                          ul_.classList.toggle('visible');
                          ul_.classList.toggle('custom-jumbotron');    
                      };
                  });
          });
      });
  });   




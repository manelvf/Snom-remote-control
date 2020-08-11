//TODO: Fix auth issue (XDR issue)
/*
function make_base_auth(username, password) {
    return "Basic " + btoa(username + ":" + password);
}    
function sendHttpReq(url, username, password) {
    if(username == ''){
        $.get(url); 
    } else {
        var auth = make_base_auth(username, password);
        //jquery ajax request 
        $.ajax({
            url : url,
            method : 'GET',
            beforeSend : function(req) {
                req.setRequestHeader('Authorization', auth);
            }
        });
    } 
}
*/
function sendHttpReq(url){
    $.get(url);
}

var screenUrl;
function startVideo(form, image) {
    switch(image){
        case 'screen':
            var imageFile = '/screen.bmp';
            var screenBufferId = '#screen-buffer';
            var screenDisplayedId = '#screen-displayed';
            break;
        case 'label':
            var imageFile = '/label_screen.bmp';
            var screenBufferId = '#label-buffer';
            var screenDisplayedId = '#label-displayed';
            break;
        case 'exp':
            var imageFile = '/exp_screen.bmp';
            var screenBufferId = '#exp-buffer';
            var screenDisplayedId = '#exp-displayed';
            break;
    }
    //TODO: Fix auth issue (XDR issue)
    /*
    if(typeof form.user.value != ''){
        var screenUrl = form.proto.value + '://' + form.user.value + ':' + form.password.value + '@' + form.phone.value + ':' + form.port.value + '/screen.bmp';
    } else {
        var screenUrl = form.proto.value + '://' + form.phone.value + ':' + form.port.value + '/screen.bmp';
    } */   
    var screenUrl = form.proto.value + '://' + form.phone.value + ':' + form.port.value + imageFile;
    
    $(screenBufferId).load(function(){
        var loadedImage = $(this).attr('src');
        $(screenDisplayedId).attr('src', loadedImage);
        $(this).attr('src', screenUrl + '?nocache=' + Math.random());
    });
    $(screenBufferId).attr('src', screenUrl + '?nocache=' + Math.random());
}

function stopVideo(image){
    switch(image){
        case 'screen':
            var screenBufferId = '#screen-buffer';
            var screenDisplayedId = '#screen-displayed';
            break;
        case 'label':
            var screenBufferId = '#label-buffer';
            var screenDisplayedId = '#label-displayed';
            break;
        case 'exp':
            var screenBufferId = '#exp-buffer';
            var screenDisplayedId = '#exp-displayed';
            break;
    } 
    $(screenBufferId).unbind('load');
    $(screenBufferId).attr('src', '');
    $(screenDisplayedId).attr('src', '');
}

function pressKey(form){
    var key = form.key.value;
    var commandUrl = form.proto.value + '://' + form.phone.value + ':' + form.port.value + '/command.htm?key=' + key;
    sendHttpReq(commandUrl);    
}

function dialNumber(form){
    var number = form.number.value;
    var commandUrl = form.proto.value + '://' + form.phone.value + ':' + form.port.value + '/command.htm?number=' + number;
    sendHttpReq(commandUrl);
}

function endCalls(form){
    var command = 'RELEASE_ALL_CALLS';
    var commandUrl = form.proto.value + '://' + form.phone.value + ':' + form.port.value + '/command.htm?' + command;
    sendHttpReq(commandUrl);    
}

function rebootPhone(form){
    var commandUrl = form.proto.value + '://' + form.phone.value + ':' + form.port.value + '/advanced_update.htm?reboot=Reboot';
    sendHttpReq(commandUrl);    
}

function setSetting(form){
    var setting_name = form.setting_name.value;
    var setting_value = form.setting_value.value;
    var commandUrl = form.proto.value + '://' + form.phone.value + ':' + form.port.value + '/dummy.htm?settings=save&' + setting_name + '=' + setting_value; 
    sendHttpReq(commandUrl);    
}

fetch('control.html')
  .then(response => {
    return response.text()
  })
  .then(data => {
    const data2 = data.replace("form1", "form2")
    const data3 = data.replace("form1", "form3")
    const leftcolumn = document.getElementById("leftcolumn")
    leftcolumn.insertAdjacentHTML('afterbegin', data)
    leftcolumn.insertAdjacentHTML('afterbegin', '<br/>')
    leftcolumn.insertAdjacentHTML('afterbegin', data2)
    leftcolumn.insertAdjacentHTML('afterbegin', '<br/>')
    leftcolumn.insertAdjacentHTML('afterbegin', data3)

  });

fetch('screen.html')
  .then(response => {
    return response.text()
  })
  .then(data => {
    let wrapper = document.getElementById("wrapper")
    wrapper.insertAdjacentHTML('beforeend', data)
    wrapper.insertAdjacentHTML('beforeend', '<br/>')
    wrapper.insertAdjacentHTML('beforeend', data)
    wrapper.insertAdjacentHTML('beforeend', '<br/>')
    wrapper.insertAdjacentHTML('beforeend', data)

  });

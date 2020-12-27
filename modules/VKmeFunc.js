var request = require('request');
var VKmeFunc = function(context, command, regex, cm_of, cm_on, TOKEN) {
    var online = {
        url: `https://api.vk.me/method/account.setPrivacy?v=5.109&key=online&value=all&access_token=${TOKEN}`,
        headers: {
            'User-Agent': 'VKAndroidApp/1.777-777 (Android 777; SDK 777; jsonic; 1; ru; 777x777)'
        }
    };
    var offline = {
        url: `https://api.vk.me/method/account.setPrivacy?v=5.109&key=online&value=only_me&access_token=${TOKEN}`,
        headers: {
            'User-Agent': 'VKAndroidApp/1.777-777 (Android 777; SDK 777; jsonic; 1; ru; 777x777)'
        }
    }
	if (context.text == cm_of) {
		request(offline, callback);
        context.editMessage({
            message: 'Невидимка включена!'
        })
	} else if (context.text == cm_on) {
        request(online, callback);
        context.editMessage({
            message: 'Невидимка выключена!'
        })
	} else if (context.text.toLowerCase().startsWith(command)) {
                context.editMessage({
                    message: 'ᅠ'
                })
                context.deleteMessage({
                    message_ids: context.id,
                    delete_for_all: 1
                })
		var res = context.text.match(regex);
		timer = (res[2].trim() == '') ? 86400 : (res[2] == '0' ? 5 : (parseInt(res[2]) * 3600));
		context.send({
                        message: res[3],
                        peer_id: context.peerId,
                        random_id: 0,
                        expire_ttl: timer
                });
    }
    
    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            const info = JSON.parse(body);
            console.log(info);
        }
    };
}
module.exports = VKmeFunc;

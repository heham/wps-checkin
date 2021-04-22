"auto";
//这里填写你的数字锁屏密码
passwd = "";


//一些单选题的题目及对应答案，如有不全可以自行增加，一对一
ques = ["（单选）遇到磁盘数据损坏，WPS会员有没有数据修复特权？",
    "（单选）以下哪个是WPS会员特权中的一个？",
    "（单选）通过什么工具可以将多张图片转成一个PDF文档？",
    "（单选）重要文档损坏了，心急的小李要怎么做？",
    "（单选）老板让小李把一百张图片做成一个PDF文档，小李应该？",
    "（单选）小李上班发现自己的硬盘坏了，数据丢失怎么办？",
    "（单选）以下哪种工具能将PDF转成WORD？",
    "（单选）老板让小李改一份PDF文档，小李要怎么做？",
    "（单选）小李收到一份多页PDF文档，想存储到相册里去，有什么办法？",
    "（单选）想搜索文档具体内容，有什么方式可以实现？",
    "（单选）WPS会员拥有多大的云文档存储空间？",
    "（单选）老板让小李修改一份纸质文档，小李应该？",
    "（单选）老板让小李在一万份文档里搜索内容包含了“行程”的全部文档，怎么办？"
];
ans = ["有，且无限次",
    "文档修复",
    "WPS图片转PDF插件",
    "使用WPS会员修复",
    "WPS会员图片转PDF",
    "WPS会员数据恢复",
    "金山PDF转WORD",
    "WPS会员PDF转doc",
    "WPS会员PDF转图片",
    "WPS全文检索功能",
    "100G",
    "WPS会员拍照转文字",
    "WPS会员全文检索"
];

unlock(passwd);
device.keepScreenOn(5 * 60 * 1000);
wpscheckin();
//device.cancelKeepingAwake();
daoke();
device.keepScreenOn(1000);
engines.myEngine().forceStop();


function wpscheckin() {
    app.launch("com.tencent.mm");
    sleep(5000);
    killlast();
    sleep(1000);
    wpsin();
    killlast();
    wpsin();
    if (className("android.widget.Button").text("立即打卡，分会员").exists()) {
	//测试有的手机通过控件点击会有问题，有些又似乎相反，看情况采用，注释掉下面不用的那一行就可以了，以下有点击的类似
	//滑动说明第一个参数为滑动起始点的X坐标，第二个参数为滑动起始点的Y坐标，第三个参数为滑动终止点的X坐标，第四个参数为滑动终止点的Y坐标，最后一个是滑动操作的时间单位毫秒 
        //className("android.widget.Button").text("立即打卡，分会员").findOne().click();
	click(text("立即打卡，分会员").findOne().bounds().centerX(),text("立即打卡，分会员").findOne().bounds().centerY());
	sleep(2000);    
        que = changeque();
        sleep(2000);
        wpsanswer(que);
    }
}

function wpsin(){
    app.launch("com.tencent.mm");
    sleep(5000);
    //偶尔出现了不能读取设备宽度和高度的情况，导致下面的滑动操作不成功，可以按自己分辨率计算一下把数值写上去。以下类似
    swipe(device.width / 2, device.height / 4, device.width / 2, device.height / 2 * 3, 500);
    sleep(1000);
    //text("我的WPS会员").findOne().parent().click();
    click(text("我的WPS会员").findOne().bounds().centerX(),text("我的WPS会员").findOne().bounds().centerY());
    sleep(5000);
}

//仅答单选题，多选直接确认跳过
function wpsanswer(que) {
    if (ques.indexOf(que)) {
        an = ans[ques.indexOf(que)];
        //console.show();
        //console.log(an);
        className("android.view.View").textContains(an).findOne().click();
        sleep(2000);
	click(text("确认").findOne().bounds().centerX(),text("确认").findOne().bounds().centerY());
        //className("android.widget.Button").text("确认").findOne().click();
        sleep(3000);
    } else {
        return changeque();
    }
}

function changeque() {
    do {
    	sleep(2000);
	click(text("确认").findOne().bounds().centerX(),text("确认").findOne().bounds().centerY());    
        //className("android.widget.Button").text("确认").findOne().click();
        sleep(2000);
    } while (className("android.view.View").textContains("多选").exists());
    que = className("android.view.View").textContains("单选").findOne().text();
    return que;
}


function daokein(){
	sleep(1000);
	app.launch("com.tencent.mm");
	sleep(5000);
	swipe(device.width / 2, device.height / 4, device.width / 2, device.height / 2 * 3, 500);
	sleep(2000);
	click(text("WPS稻壳会员").findOne().bounds().centerX(),text("WPS稻壳会员").findOne().bounds().centerY());
	//text("WPS稻壳会员").findOne().parent().click();  
	sleep(5000);
	}


function daoke() {
    daokein();
    killlast();
    daokein();
    if (className("android.view.View").text("签到领奖励").exists()) {
	click(text("签到领奖励").findOne().bounds().centerX(),text("签到领奖励").findOne().bounds().centerY());    
        //className("android.view.View").text("签到领奖励").findOne().parent().click();
    }
    sleep(1000);
    killlast();
    daokein();
    if (className("android.widget.Button").text("立即领取").exists()) {
	click(text("立即领取").findOne().bounds().centerX(),text("立即领取").findOne().bounds().centerY());    
    	//className("android.widget.Button").text("立即领取").findOne().click();
    	sleep(5000);
    	//if (className("android.view.View").text("领取成功").exists()) {
    	//	killlast();
    	//	}	
	}
}

function killlast() {
    sleep(1000);
    home();
    sleep(1000);
    recents();
    sleep(1000);
    swipe(device.width / 2, device.height / 3 * 2, device.width / 2, device.height / 4, 200);
    sleep(1000);
    home();
    sleep(1000);
}

function unlock(passwd) {
    //device.wakeUp();
    sleep(1000);
    device.wakeUpIfNeeded();
    sleep(1000);
    swipe(device.width / 2, device.height / 4, device.width / 2, device.height / 2 * 3, 500);
    sleep(1000);
    for (var i = 0; i < passwd.length; i++) {
        //eval("p" + passwd[i] + "()");
        click(passwd[i]);
        sleep(1000);
    }
}

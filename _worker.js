
// 部署完成后在网址后面加上这个，获取自建节点和机场聚合节点，/?token=auto或/auto或

let mytoken = 'auto'; //可以随便取，或者uuid生成，https://1024tools.com/uuid
let BotToken =''; //可以为空，或者@BotFather中输入/start，/newbot，并关注机器人
let ChatID =''; //可以为空，或者@userinfobot中获取，/start
let TG = 0; //小白勿动， 开发者专用，1 为推送所有的访问信息，0 为不推送订阅转换后端的访问信息与异常访问
let FileName = 'CF-Workers-SUB';
let SUBUpdateTime = 6; //自定义订阅更新时间，单位小时
let total = 99;//PB
let timestamp = 4102329600000;//2099-12-31

//节点链接 + 订阅链接
let MainData = `
vless://7b30aa33-bfce-47ee-ae94-fb296677e044@w.mycctv.xyz:8443?encryption=none&security=tls&type=tcp&headerType=none#w.mycctv.xyz
vless://353d84cc-e299-46c4-a027-9f648c93e316@t.mycctv.xyz:443?encryption=none&flow=xtls-rprx-vision&security=tls&sni=t.mycctv.xyz&fp=chrome&type=tcp&headerType=none&host=t.mycctv.xyz#353d84cc-VLESS_TCP%2FTLS_Vision
vless://353d84cc-e299-46c4-a027-9f648c93e316@t.mycctv.xyz:443?encryption=none&security=tls&sni=t.mycctv.xyz&fp=chrome&type=ws&host=t.mycctv.xyz&path=%2Fopfews#353d84cc-VLESS_WS
vless://353d84cc-e299-46c4-a027-9f648c93e316@t.mycctv.xyz:443?encryption=none&security=tls&sni=t.mycctv.xyz&alpn=h2&fp=chrome&type=grpc&authority=&serviceName=opfegrpc&mode=gun#353d84cc-vless_grpc
vmess://ew0KICAidiI6ICIyIiwNCiAgInBzIjogIjM1M2Q4NGNjLVZNZXNzX1dTIiwNCiAgImFkZCI6ICJ0Lm15Y2N0di54eXoiLA0KICAicG9ydCI6ICI0NDMiLA0KICAiaWQiOiAiMzUzZDg0Y2MtZTI5OS00NmM0LWEwMjctOWY2NDhjOTNlMzE2IiwNCiAgImFpZCI6ICIwIiwNCiAgInNjeSI6ICJhdXRvIiwNCiAgIm5ldCI6ICJ3cyIsDQogICJ0eXBlIjogIm5vbmUiLA0KICAiaG9zdCI6ICJ0Lm15Y2N0di54eXoiLA0KICAicGF0aCI6ICIvb3BmZXZ3cyIsDQogICJ0bHMiOiAidGxzIiwNCiAgInNuaSI6ICJ0Lm15Y2N0di54eXoiLA0KICAiYWxwbiI6ICIiLA0KICAiZnAiOiAiIg0KfQ==
trojan://353d84cc-e299-46c4-a027-9f648c93e316@t.mycctv.xyz:443?security=tls&sni=t.mycctv.xyz&alpn=http%2F1.1&fp=chrome&type=tcp&headerType=none#t.mycctv.xyz_Trojan
trojan://353d84cc-e299-46c4-a027-9f648c93e316@t.mycctv.xyz:443?security=tls&sni=t.mycctv.xyz&alpn=h2&fp=chrome&type=grpc&authority=&serviceName=opfetrojangrpc&mode=gun#353d84cc-Trojan_gRPC
vless://353d84cc-e299-46c4-a027-9f648c93e316@t.mycctv.xyz:443?encryption=none&flow=xtls-rprx-vision&security=reality&sni=t.mycctv.xyz&fp=chrome&pbk=91o5OKvfE0bEOIfCBmT4_Meg4DbRD3FK8--qF5YvJFA&sid=6ba85179e30d4fc2&type=tcp&headerType=none#353d84cc-vless_reality_vision
vless://353d84cc-e299-46c4-a027-9f648c93e316@t.mycctv.xyz:443?encryption=none&security=reality&sni=t.mycctv.xyz&fp=chrome&pbk=91o5OKvfE0bEOIfCBmT4_Meg4DbRD3FK8--qF5YvJFA&sid=6ba85179e30d4fc2&type=grpc&authority=&serviceName=grpc&mode=gun#353d84cc-vless_reality_grpc
vless://912b3add-8165-482e-be74-e767f026d9bb@a.16882099.xyz:443?encryption=none&flow=xtls-rprx-vision&security=tls&sni=a.16882099.xyz&fp=chrome&type=tcp&headerType=none&host=a.16882099.xyz#912b3add-VLESS_TCP%2FTLS_Vision
vless://912b3add-8165-482e-be74-e767f026d9bb@a.16882099.xyz:443?encryption=none&security=tls&sni=a.16882099.xyz&fp=chrome&type=ws&host=a.16882099.xyz&path=%2Fcbdpws#912b3add-VLESS_WS
vless://912b3add-8165-482e-be74-e767f026d9bb@a.16882099.xyz:443?encryption=none&security=tls&sni=a.16882099.xyz&alpn=h2&fp=chrome&type=grpc&authority=&serviceName=cbdpgrpc&mode=gun#912b3add-vless_grpc
vmess://ew0KICAidiI6ICIyIiwNCiAgInBzIjogIjkxMmIzYWRkLVZNZXNzX1dTIiwNCiAgImFkZCI6ICJhLjE2ODgyMDk5Lnh5eiIsDQogICJwb3J0IjogIjQ0MyIsDQogICJpZCI6ICI5MTJiM2FkZC04MTY1LTQ4MmUtYmU3NC1lNzY3ZjAyNmQ5YmIiLA0KICAiYWlkIjogIjAiLA0KICAic2N5IjogImF1dG8iLA0KICAibmV0IjogIndzIiwNCiAgInR5cGUiOiAibm9uZSIsDQogICJob3N0IjogImEuMTY4ODIwOTkueHl6IiwNCiAgInBhdGgiOiAiL2NiZHB2d3MiLA0KICAidGxzIjogInRscyIsDQogICJzbmkiOiAiYS4xNjg4MjA5OS54eXoiLA0KICAiYWxwbiI6ICIiLA0KICAiZnAiOiAiIg0KfQ==
trojan://912b3add-8165-482e-be74-e767f026d9bb@a.16882099.xyz:443?security=tls&sni=a.16882099.xyz&alpn=http%2F1.1&fp=chrome&type=tcp&headerType=none#a.16882099.xyz_Trojan
trojan://912b3add-8165-482e-be74-e767f026d9bb@a.16882099.xyz:443?security=tls&sni=a.16882099.xyz&alpn=h2&fp=chrome&type=grpc&authority=&serviceName=cbdptrojangrpc&mode=gun#912b3add-Trojan_gRPC
vless://912b3add-8165-482e-be74-e767f026d9bb@193.123.249.3:443?encryption=none&flow=xtls-rprx-vision&security=reality&sni=www.swift.com&fp=chrome&pbk=_i8iWMmAVGHP4ejUjxn84TIo4r5UY1YZruoPBBjGhBI&sid=6ba85179e30d4fc2&type=tcp&headerType=none#912b3add-vless_reality_vision
vless://912b3add-8165-482e-be74-e767f026d9bb@193.123.249.3:443?encryption=none&security=reality&sni=www.swift.com&fp=chrome&pbk=_i8iWMmAVGHP4ejUjxn84TIo4r5UY1YZruoPBBjGhBI&sid=6ba85179e30d4fc2&type=grpc&authority=&serviceName=grpc&mode=gun#912b3add-vless_reality_grpc
`

let urls = [];
let subconverter = "apiurl.v1.mk"; //在线订阅转换后端，目前使用肥羊的订阅转换功能。支持自建psub 可自行搭建https://github.com/bulianglin/psub
let subconfig = "https://raw.githubusercontent.com/cmliu/ACL4SSR/main/Clash/config/ACL4SSR_Online_MultiCountry.ini"; //订阅配置文件

export default {
	async fetch (request,env) {
		const userAgentHeader = request.headers.get('User-Agent');
		const userAgent = userAgentHeader ? userAgentHeader.toLowerCase() : "null";
		const url = new URL(request.url);
		const token = url.searchParams.get('token');
		mytoken = env.TOKEN || mytoken;
		BotToken = env.TGTOKEN || BotToken;
		ChatID = env.TGID || ChatID; 
		TG =  env.TG || TG; 
		subconverter = env.SUBAPI || subconverter;
		subconfig = env.SUBCONFIG || subconfig;
		FileName = env.SUBNAME || FileName;
		MainData = env.LINK || MainData;
		if(env.LINKSUB) urls = await ADD(env.LINKSUB);

		const currentDate = new Date();
		currentDate.setHours(0, 0, 0, 0); 
		const timeTemp = Math.ceil(currentDate.getTime() / 1000);
		const fakeToken = await MD5MD5(`${mytoken}${timeTemp}`);
		//console.log(`${fakeUserID}\n${fakeHostName}`); // 打印fakeID

		let UD = Math.floor(((timestamp - Date.now())/timestamp * 99 * 1099511627776 * 1024)/2);
		total = total * 1099511627776 * 1024;
		let expire= Math.floor(timestamp / 1000) ;
		SUBUpdateTime = env.SUBUPTIME || SUBUpdateTime;

		let 重新汇总所有链接 = await ADD(MainData + '\n' + urls.join('\n'));
		let 自建节点 ="";
		let 订阅链接 ="";
		for (let x of 重新汇总所有链接) {
			if (x.toLowerCase().startsWith('http')) {
				订阅链接 += x + '\n';
			} else {
				自建节点 += x + '\n';
			}
		}
		MainData = 自建节点;
		urls = await ADD(订阅链接);

		if ( !(token == mytoken || token == fakeToken || url.pathname == ("/"+ mytoken) || url.pathname.includes("/"+ mytoken + "?")) ) {
			if ( TG == 1 && url.pathname !== "/" && url.pathname !== "/favicon.ico" ) await sendMessage(`#异常访问 ${FileName}`, request.headers.get('CF-Connecting-IP'), `UA: ${userAgent}</tg-spoiler>\n域名: ${url.hostname}\n<tg-spoiler>入口: ${url.pathname + url.search}</tg-spoiler>`);
			const envKey = env.URL302 ? 'URL302' : (env.URL ? 'URL' : null);
			if (envKey) {
				const URLs = await ADD(env[envKey]);
				const URL = URLs[Math.floor(Math.random() * URLs.length)];
				return envKey === 'URL302' ? Response.redirect(URL, 302) : fetch(new Request(URL, request));
			}
			return new Response(await nginx(), { 
				status: 200 ,
				headers: {
					'Content-Type': 'text/html; charset=UTF-8',
				},
			});
		} else {
			await sendMessage(`#获取订阅 ${FileName}`, request.headers.get('CF-Connecting-IP'), `UA: ${userAgentHeader}</tg-spoiler>\n域名: ${url.hostname}\n<tg-spoiler>入口: ${url.pathname + url.search}</tg-spoiler>`);
			let 订阅格式 = 'base64';
			if (userAgent.includes('null') || userAgent.includes('subconverter') || userAgent.includes('nekobox') || userAgent.includes(('CF-Workers-SUB').toLowerCase())){
				订阅格式 = 'base64';
			} else if (userAgent.includes('clash') || ( url.searchParams.has('clash') && !userAgent.includes('subconverter'))){
				订阅格式 = 'clash';
			} else if (userAgent.includes('sing-box') || userAgent.includes('singbox') || ( (url.searchParams.has('sb') || url.searchParams.has('singbox')) && !userAgent.includes('subconverter'))){
				订阅格式 = 'singbox';
			}

			let subconverterUrl ;
			let 订阅转换URL = `${url.origin}/${await MD5MD5(fakeToken)}?token=${fakeToken}`;
			//console.log(订阅转换URL);
			let req_data = MainData;
			// 创建一个AbortController对象，用于控制fetch请求的取消
			const controller = new AbortController();
	
			const timeout = setTimeout(() => {
				controller.abort(); // 取消所有请求
			}, 2000); // 2秒后触发
	

			let 追加UA = 'v2rayn';
			if (url.searchParams.has('clash')){
				追加UA = 'clash';
			} else if(url.searchParams.has('singbox')){
				追加UA = 'singbox';
			}
			
			try {
				const responses = await Promise.allSettled(urls.map(url =>
					fetch(url, {
						method: 'get',
						headers: {
							'Accept': 'text/html,application/xhtml+xml,application/xml;',
							'User-Agent': `${追加UA} cmliu/CF-Workers-SUB ${userAgentHeader}`
						},
						signal: controller.signal // 将AbortController的信号量添加到fetch请求中，以便于需要时可以取消请求
					}).then(response => {
						if (response.ok) {
							return response.text().then(content => {
								// 这里可以顺便做内容检查
								if (content.includes('dns') && content.includes('proxies') && content.includes('proxy-groups')) {
									//console.log("clashsub: " + url);
									订阅转换URL += "|" + url;
								} else if  (content.includes('dns') && content.includes('outbounds') && content.includes('inbounds')){
									//console.log("singboxsub: " + url);
									订阅转换URL += "|" + url;
								} else {
									//console.log("未识别" + url);
									return content; // 保证链式调用中的下一个then可以接收到文本内容
								}
								//console.log(content);
							});
						} else {
							return ""; // 如果response.ok为false，返回空字符串
						}
					})
				));	
				//console.log(responses);
				for (const response of responses) {
					if (response.status === 'fulfilled') {
						const content = await response.value;
						req_data += base64Decode(content) + '\n';
					}
				}

			} catch (error) {
				//console.error(error);
			} finally {
				// 无论成功或失败，最后都清除设置的超时定时器
				clearTimeout(timeout);
			}

			//修复中文错误
			const utf8Encoder = new TextEncoder();
			const encodedData = utf8Encoder.encode(req_data);
			const text = String.fromCharCode.apply(null, encodedData);
			
			//去重
			const uniqueLines = new Set(text.split('\n'));
			const result = [...uniqueLines].join('\n');
			console.log(result);
			
			const base64Data = btoa(result);

			if (订阅格式 == 'base64'){
				return new Response(base64Data ,{
					headers: { 
						"content-type": "text/plain; charset=utf-8",
						"Profile-Update-Interval": `${SUBUpdateTime}`,
						"Subscription-Userinfo": `upload=${UD}; download=${UD}; total=${total}; expire=${expire}`,
					}
				});
			} else if (订阅格式 == 'clash'){
				subconverterUrl = `https://${subconverter}/sub?target=clash&url=${encodeURIComponent(订阅转换URL)}&insert=false&config=${encodeURIComponent(subconfig)}&emoji=true&list=false&tfo=false&scv=true&fdn=false&sort=false&new_name=true`;
			} else if (订阅格式 == 'singbox'){
				subconverterUrl = `https://${subconverter}/sub?target=singbox&url=${encodeURIComponent(订阅转换URL)}&insert=false&config=${encodeURIComponent(subconfig)}&emoji=true&list=false&tfo=false&scv=true&fdn=false&sort=false&new_name=true`;
			}
			console.log(订阅转换URL);
			try {
				const subconverterResponse = await fetch(subconverterUrl);
				
				if (!subconverterResponse.ok) {
					return new Response(base64Data ,{
						headers: { 
							"content-type": "text/plain; charset=utf-8",
							"Profile-Update-Interval": `${SUBUpdateTime}`,
							"Subscription-Userinfo": `upload=${UD}; download=${UD}; total=${total}; expire=${expire}`,
						}
					});
					//throw new Error(`Error fetching subconverterUrl: ${subconverterResponse.status} ${subconverterResponse.statusText}`);
				}
				let subconverterContent = await subconverterResponse.text();
				if (订阅格式 == 'clash') subconverterContent =await clashFix(subconverterContent);
				return new Response(subconverterContent, {
					headers: { 
						"Content-Disposition": `attachment; filename*=utf-8''${encodeURIComponent(FileName)}; filename=${FileName}`,
						"content-type": "text/plain; charset=utf-8",
						"Profile-Update-Interval": `${SUBUpdateTime}`,
						"Subscription-Userinfo": `upload=${UD}; download=${UD}; total=${total}; expire=${expire}`,

					},
				});
			} catch (error) {
				return new Response(base64Data ,{
					headers: { 
						"content-type": "text/plain; charset=utf-8",
						"Profile-Update-Interval": `${SUBUpdateTime}`,
						"Subscription-Userinfo": `upload=${UD}; download=${UD}; total=${total}; expire=${expire}`,
					}
				});
			}
		}
	}
};

async function ADD(envadd) {
	var addtext = envadd.replace(/[	"'|\r\n]+/g, ',').replace(/,+/g, ',');  // 将空格、双引号、单引号和换行符替换为逗号
	//console.log(addtext);
	if (addtext.charAt(0) == ',') addtext = addtext.slice(1);
	if (addtext.charAt(addtext.length -1) == ',') addtext = addtext.slice(0, addtext.length - 1);
	const add = addtext.split(',');
	//console.log(add);
	return add ;
}

async function nginx() {
	const text = `
	<!DOCTYPE html>
	<html>
	<head>
	<title>Welcome to nginx!</title>
	<style>
		body {
			width: 35em;
			margin: 0 auto;
			font-family: Tahoma, Verdana, Arial, sans-serif;
		}
	</style>
	</head>
	<body>
	<h1>Welcome to nginx!</h1>
	<p>If you see this page, the nginx web server is successfully installed and
	working. Further configuration is required.</p>
	
	<p>For online documentation and support please refer to
	<a href="http://nginx.org/">nginx.org</a>.<br/>
	Commercial support is available at
	<a href="http://nginx.com/">nginx.com</a>.</p>
	
	<p><em>Thank you for using nginx.</em></p>
	</body>
	</html>
	`
	return text ;
}

async function sendMessage(type, ip, add_data = "") {
	if ( BotToken !== '' && ChatID !== ''){
		let msg = "";
		const response = await fetch(`http://ip-api.com/json/${ip}?lang=zh-CN`);
		if (response.status == 200) {
			const ipInfo = await response.json();
			msg = `${type}\nIP: ${ip}\n国家: ${ipInfo.country}\n<tg-spoiler>城市: ${ipInfo.city}\n组织: ${ipInfo.org}\nASN: ${ipInfo.as}\n${add_data}`;
		} else {
			msg = `${type}\nIP: ${ip}\n<tg-spoiler>${add_data}`;
		}
	
		let url = "https://api.telegram.org/bot"+ BotToken +"/sendMessage?chat_id=" + ChatID + "&parse_mode=HTML&text=" + encodeURIComponent(msg);
		return fetch(url, {
			method: 'get',
			headers: {
				'Accept': 'text/html,application/xhtml+xml,application/xml;',
				'Accept-Encoding': 'gzip, deflate, br',
				'User-Agent': 'Mozilla/5.0 Chrome/90.0.4430.72'
			}
		});
	}
}

function base64Decode(str) {
	const bytes = new Uint8Array(atob(str).split('').map(c => c.charCodeAt(0)));
	const decoder = new TextDecoder('utf-8');
	return decoder.decode(bytes);
}

async function MD5MD5(text) {
	const encoder = new TextEncoder();
  
	const firstPass = await crypto.subtle.digest('MD5', encoder.encode(text));
	const firstPassArray = Array.from(new Uint8Array(firstPass));
	const firstHex = firstPassArray.map(b => b.toString(16).padStart(2, '0')).join('');

	const secondPass = await crypto.subtle.digest('MD5', encoder.encode(firstHex.slice(7, 27)));
	const secondPassArray = Array.from(new Uint8Array(secondPass));
	const secondHex = secondPassArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
	return secondHex.toLowerCase();
}

function clashFix(content) {
	if(content.includes('wireguard') && !content.includes('remote-dns-resolve')){
		let lines;
		if (content.includes('\r\n')){
			lines = content.split('\r\n');
		} else {
			lines = content.split('\n');
		}
	
		let result = "";
		for (let line of lines) {
			if (line.includes('type: wireguard')) {
				const 备改内容 = `, mtu: 1280, udp: true`;
				const 正确内容 = `, mtu: 1280, remote-dns-resolve: true, udp: true`;
				result += line.replace(new RegExp(备改内容, 'g'), 正确内容) + '\n';
			} else {
				result += line + '\n';
			}
		}

		content = result;
	}
	return content;
}

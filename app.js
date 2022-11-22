var http = require("http"); //http 웹서버를 생성하기 위한 모듈
var fs = require("fs"); // 파일관련 처리를 하기 위한 모듈
var socketIo = require("socket.io"); //소켓서버를 생성 및 실행하기위한 모듈
 
const finding = 1;
const notFinding = 2;
const chating = 3;
 
var clients = []; //사용자를 저장/관리 하는 배열. 이 배열의 길이가 사용자(채팅 접속자)의 수.
 
var server = http.createServer(function(request,response){
 
    //해당파일의 데이터를 읽고, 읽은 데이터를 클라이언트로 응답해줌.
    fs.readFile("htmlPage.html","utf-8",function(error,data){
        response.writeHead(200,{
            "Content-Type":"text/html"
        });
        response.end(data);
    })
}).listen(52273,function(){
    console.log("server running");
}); //HTTP 웹서버를 생성
 
var io = socketIo.listen(server); //소켓서버를 생성 및 실행
 
//connection이벤트는 클라이언트가 소켓서버에 접속할때 발생하는 이벤트
//콜백함수에 있는 socket이라는 변수는 접속한 클라이언트와 소켓서버가 실시간 양방향 통신을 할 수 있도록 하는 소켓객체
io.sockets.on("connection",function(socket){
    socket.on("nickNameCheck",function(data){
        if(!data.name){
            socket.emit("nullError","닉네임을 입력해주세요");
            return ;
        }
 
        for(var a = 0; a<clients.length;a++){
            if(clients[a].name == data.name){
                socket.emit("sameNameError","동일한 닉네임이 존재합니다");
                return ;
            }
        }
 
        clients.push({
            name:data.name, //사용자의 닉네임
            client:socket, //사용자의 소켓
            roomName:"", //사용자가 들어가 있는 방 이름
            status:notFinding //사용자의 상태. notFinding(대화상대를 찾고있지 않는)상태로 초기화 시킴.
        });
        socket.name = data.name;
        socket.emit("nickNameCheckComplete");
    })
 
    socket.on("randomChatFindClick",function(data){
        for(var a = 0; a<clients.length; a++){
            if(clients[a].name == data.name){
                //해당사용자의 상태를 변경. 대화상대를 찾고있는(finding)상태로 변경
                clients[a].status = finding;
                socket.emit("randomChatFindClickComplete");
                return ;
            }
        }
    });
 
    socket.on("randomChatFining", function(data){ //대화방을 찾고 있는 상대와 같은 방으로 이동시킨다.
        for(var a =0; a<clients.length; a++){
            if(clients[a].status == finding){
                if(clients[a].name == data.name){
                    continue;
                }else{
                    var roomName = new Date().getTime()+"";
                    clients[a].status = chating; //상대의 상태가 chating이 됨.
                    clients[a].roomName = roomName; //상대가 들어가있는 방 이름이 roomName
                    clients[a].client.join(roomName); //방으로 이동시킴
 
                    for(var a = 0; a<clients.length; a++){
                        if(clients[a].name == data.name){
                            clients[a].status = chating;
                            clients[a].roomName = roomName;
                            clients[a].client.join(roomName); //방으로 이동시킴
                            io.sockets.to(roomName).emit("randomChatFiningComplete",roomName);
                            return ;
                        }
                    }
                }
            }
        }
    });
});

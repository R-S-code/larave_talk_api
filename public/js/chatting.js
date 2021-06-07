// 文字列検索用
const chattingField__searchInput = document.getElementById("chatting-field__search-input");
const chattingField__serachResultNum = document.getElementById("chatting-field__serach-result-num");
const chattingField__searchBtnUp = document.getElementById("chatting-field__search-btn-up");
const chattingField__searchBtnDown = document.getElementById("chatting-field__search-btn-down");
let searching_target = null;
let before_searching_target = null;
let searched_all_targets = null;
var result_targets = [];
let result_object_target = {};
var searched_chatting_counter  = 0;
let searched_chatting_id = 0;
var serached_chatting_now_positon = 0


// 送信ボタンの処理
const chattingField = document.getElementById('chatting-field');
const chattingField__chattingPlace = document.getElementById('chatting-field__chatting-place');
const chattingField__robotChatContent = document.getElementById("chatting-field__robot-chat-content");
const sendingField__sendBtn = document.getElementById("sending-field__send-btn");
const sendingField__inputChat = document.getElementById("sending-field__input-chat");

// マイク用
const sendingField__microPhone = document.getElementById("sending-field__microphone");
const speech = new webkitSpeechRecognition();

// postリクエスト用のパラメーター
let form_data = null;
let sending_content = null;
let robot_flg = null;
// dom追加用
let add_text = null

// リセットボタン処理
const chattingField__resetBtn = document.getElementById("chatting-field__reset-btn");

// ページ読み込み時にチャットの一番下にスクロールが来るようにする。
window.onload = ()=> {
    chattingField.scrollTop = chattingField.scrollHeight;
};

// 文字検索処理
window.addEventListener("keydown", ()=> {
    if(chattingField__searchInput.value !== "") {
        // 検索ボタンを2回押した時に検索結果の配列が２重に入るのをふせぐ
        if(result_targets.length !== 0) {
            result_targets = [];
        }
        searched_chatting_counter = 0;
        searched_chatting_now_positon = 0;
        // 検索欄に入力された文字を取得
        searching_target = chattingField__searchInput.value;
        before_searching_target = chattingField__searchInput.value;
        console.log(searching_target);

        // チャットを全取得
        searched_all_targets = document.getElementsByClassName("chatting-field__chat-content");
        console.log(searched_all_targets.length);

        // 検索された文字が含まれるチャットだけを取得
        for(let i = 0; i < searched_all_targets.length; i++) {
            // 全取得したチャットから、検索された文字があるかどうか一つずつ確認
            if(searched_all_targets[i].innerText.includes(searching_target))  {
                // 含まれていた場合、result_object_targetに対象チャットのIDと内容を代入
                result_object_target[searched_all_targets[i]['id']] = searched_all_targets[i].innerText;
                // result_targetsにresult_object_target(オブジェクト)を追加
                result_targets.push(result_object_target);
                // result_object_target(オブジェクト)を空にする
                result_object_target = {};
            }
        }

        if(result_targets.length != 0) {
            chattingField__serachResultNum.innerText = (searched_chatting_now_positon + 1)  + "/" + result_targets.length;
        } else {
            chattingField__serachResultNum.innerText = 0 + "/" + 0;
        }

        console.log(result_targets);
        searched_chatting_id = Object.keys((result_targets[searched_chatting_counter]));
        console.log(searched_chatting_id);
        chattingField.scrollTop = 0;
        let rect = document.getElementById(searched_chatting_id).getBoundingClientRect();
        console.log(rect.top);
        chattingField.scrollTop = rect.top - 200;
        console.log(searched_chatting_id - 1);
        console.log(searched_chatting_id);
        let elements = document.getElementsByClassName("chatting-field__chat-content");
        for(i = 0; i < elements.length; i++){
            elements[i].style.color = "black";
        }
        document.getElementById(searched_chatting_id).style.color = "#FFA336";
    }
})

chattingField__searchBtnUp.addEventListener("click", ()=> {
    if(searched_chatting_counter != 0) {
        searched_chatting_counter -= 1;
        searched_chatting_id = Object.keys(result_targets[searched_chatting_counter]);
        console.log(searched_chatting_id);
        chattingField.scrollTop = 0;
        let rect = document.getElementById(searched_chatting_id).getBoundingClientRect();
        console.log(rect.top);
        chattingField.scrollTop = rect.top - 200;
        console.log(Object.keys(result_targets[searched_chatting_counter + 1]));
        document.getElementById(Object.keys((result_targets[searched_chatting_counter + 1]))).style.color = "black";
        document.getElementById(searched_chatting_id).style.color = "#FFA336";

        // 検索結果表示用
        searched_chatting_now_positon -= 1;
        chattingField__serachResultNum.innerText = (searched_chatting_now_positon + 1)  + "/" + result_targets.length;
    }
})

chattingField__searchBtnDown.addEventListener("click", ()=> {
    if(searched_chatting_counter != result_targets.length - 1) {
        searched_chatting_counter += 1;
        searched_chatting_id = Object.keys(result_targets[searched_chatting_counter]);
        console.log(searched_chatting_id);
        chattingField.scrollTop = 0;
        let rect = document.getElementById(searched_chatting_id).getBoundingClientRect();
        console.log(rect.top);
        chattingField.scrollTop = rect.top - 200;
        document.getElementById(Object.keys((result_targets[searched_chatting_counter - 1]))).style.color = "black";
        document.getElementById(searched_chatting_id).style.color = "#FFA336";

        // 検索結果表示用
        searched_chatting_now_positon += 1;
        chattingField__serachResultNum.innerText = (searched_chatting_now_positon + 1)  + "/" + result_targets.length;
    }
})

// マイクボタンを押した時の処理
sendingField__microPhone.addEventListener("click", ()=> {
    speech.start();
    sendingField__microPhone.style.backgroundColor = "#ffa336";
    speech.onresult = (e)=> {
        speech.stop();
        sendingField__microPhone.style.backgroundColor = "#3ad2b7";
        if (e.results[0].isFinal) {
            console.log(e.results[0][0].transcript);
            sendingField__inputChat.value = e.results[0][0].transcript;
        }
    }
})

// 送信ボタンを押した時の処理
sendingField__sendBtn.addEventListener("click", ()=> {
    // 入力された文字がある時だけ処理を実行
    if(sendingField__inputChat.value !== "") {
        // postリクエスト用のパラメーターに追加
        form_data = new FormData();
        sending_content = sendingField__inputChat.value;
        form_data.append("apikey", "DZZNc6Z8GYDIkMLrMqlqOEzdLSCtI36M");
        form_data.append("query", `${sending_content}`);

        robot_flg = 0;
        // ユーザーチャットをDBに保存
        $.ajax({
            type: "post",
            url: "/insertChatting",
            data: {
                sending_content: sending_content,
                robot_flg: robot_flg
            },
            headers:{
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
        })
        .then((res) => {
            sendingField__inputChat.value = "";
            console.log(res);
            add_text = `<div class="chatting-field__user-chat"><p class="chatting-field__user-chat-content" id="{{ $chatting->id}}">${res.chattings.chatting_content}</p><p class="chatting-field__user-chat-icon"><img src="/img/user_icon.svg" alt="user icon"></p></div>`;
            chattingField__chattingPlace.insertAdjacentHTML('beforeend', add_text);
            // スクロールの一番下まで移動
            chattingField.scrollTop = chattingField.scrollHeight;
        })
        .fail((error) => {
            console.log(error.statusText);
        });

        // talkAPIにpostリクエスト
        fetch('https://api.a3rt.recruit-tech.co.jp/talk/v1/smalltalk',
            {
                method: 'POST',
                body: form_data,
            }
        )
        .then(response => {
            return response.json();
        })
        .then(data => {
            // データベースにロボットの会話を保存
            sending_content = data["results"][0]["reply"];
            robot_flg = 1;

            $.ajax({
                type: "post",
                url: "/insertChatting",
                data: {
                    sending_content: sending_content,
                    robot_flg: robot_flg
                },
                headers:{
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
            })
            .then((res) => {
                console.log(res);
                add_text = `<div class="chatting-field__robot-chat"><p class="chatting-field__robot-chat-icon"><img src="/img/robot_icon.svg" alt="robot icon"></p><p class="chatting-field__robot-chat-content" id="{{ $chatting->id}}">${res.chattings.chatting_content}</p></div>`;
                chattingField__chattingPlace.insertAdjacentHTML('beforeend', add_text);

                // スクロールの一番下まで移動
                chattingField.scrollTop = chattingField.scrollHeight;
            })
            .fail((error) => {
                console.log(error.statusText);
            });
        })
        .catch(error => {
            console.log(error);
            console.log("postリクエスト失敗");
        });
    }
})

chattingField__resetBtn.addEventListener("click", ()=> {
    $.ajax({
        type: "post",
        url: "/resetChatting",
        headers:{
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
    })
    .then((res) => {
        console.log("delete");
        while(chattingField__chattingPlace.firstChild) {
            chattingField__chattingPlace.removeChild(chattingField__chattingPlace.firstChild);
        }
    })
    .fail((error) => {
        console.log(error.statusText);
    });
})
